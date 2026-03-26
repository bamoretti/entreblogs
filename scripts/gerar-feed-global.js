import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import yaml from 'js-yaml';
import { parseStringPromise } from 'xml2js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- CONFIGURAÇÕES ---
const POSTS_POR_BLOG = 30;
const SITE_URL = 'https://entreblogs.com.br';
const FEED_TITLE = 'Entreblogs';
const FEED_DESCRIPTION = 'Todas as postagens dos blogs participantes do Entreblogs';
const TIMEOUT_MS = 20000;
const USER_AGENT = 'Mozilla/5.0 (compatible; Entreblogs/1.0; +https://entreblogs.com.br)';

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      },
      timeout: TIMEOUT_MS,
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        return resolve(fetchUrl(res.headers.location, redirects + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
  });
}

function getText(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) return getText(val[0]);
  if (typeof val === 'object') return val._ || val.$t || '';
  return String(val);
}

function getLink(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    const alt = val.find(l => l?.$ && l.$.rel === 'alternate');
    if (alt) return alt.$.href || '';
    const first = val[0];
    if (first?.$) return first.$.href || '';
    return getText(first);
  }
  if (val?.$?.href) return val.$.href;
  return getText(val);
}

async function buscarFeed(url) {
  try {
    const xml = await fetchUrl(url);
    // Remove DOCTYPE e entidades externas que causam o entity expansion error
    const xmlLimpo = xml
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<!ENTITY[^>]*>/gi, '');
    const data = await parseStringPromise(xmlLimpo, { explicitArray: true, mergeAttrs: false });

    // RSS
    if (data?.rss?.channel) {
      const items = data.rss.channel[0]?.item || [];
      return items.slice(0, POSTS_POR_BLOG).map((item) => ({
        title: getText(item.title),
        link: getText(item.link) || getText(item.guid),
        date: item.pubDate ? new Date(getText(item.pubDate)) : new Date(0),
        description: getText(item['content:encoded']) || getText(item.description),
        blog: '',
      }));
    }

    // Atom
    if (data?.feed?.entry) {
      const entries = data.feed.entry || [];
      return entries.slice(0, POSTS_POR_BLOG).map((entry) => ({
        title: getText(entry.title),
        link: getLink(entry.link),
        date: entry.updated ? new Date(getText(entry.updated)) : new Date(0),
        description: getText(entry.content) || getText(entry.summary),
        blog: '',
      }));
    }

    console.warn(`  ✗ Formato não reconhecido: ${url}`);
    return [];
  } catch (err) {
    console.warn(`  ✗ Falhou: ${url} — ${err.message}`);
    return [];
  }
}

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function main() {
  const ymlPath = path.join(__dirname, '..', '_data', 'participantes.yml');
  const participantes = yaml.load(fs.readFileSync(ymlPath, 'utf8'));

  const comFeed = participantes.filter((p) => p.feed && p.feed.trim() !== '');
  console.log(`Buscando feeds de ${comFeed.length} blogs...`);

  const resultados = await Promise.all(
    comFeed.map(async (p) => {
      console.log(`  → ${p.blog}`);
      const posts = await buscarFeed(p.feed);
      return posts.map((post) => ({ ...post, blog: p.blog }));
    })
  );

  const todos = resultados
    .flat()
    .filter((p) => p.link)
    .sort((a, b) => b.date - a.date);

  console.log(`Total de posts coletados: ${todos.length}`);

  const agora = new Date().toUTCString();
  const itens = todos
    .map((post) => `
  <item>
    <title>${xmlEscape(post.blog)} — ${xmlEscape(post.title)}</title>
    <link>${xmlEscape(post.link)}</link>
    <guid isPermaLink="true">${xmlEscape(post.link)}</guid>
    <pubDate>${post.date.toUTCString()}</pubDate>
    <description><![CDATA[${post.description}]]></description>
  </item>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${FEED_TITLE}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed-entreblogs.xml" rel="self" type="application/rss+xml"/>
    <description>${FEED_DESCRIPTION}</description>
    <language>pt-br</language>
    <lastBuildDate>${agora}</lastBuildDate>
${itens}
  </channel>
</rss>`;

  const outputPath = path.join(__dirname, '..', 'feed-entreblogs.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Feed global gerado em: ${outputPath}`);
}

main();
