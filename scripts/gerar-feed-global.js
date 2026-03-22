import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import yaml from 'js-yaml';
import { XMLParser } from 'fast-xml-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- CONFIGURAÇÕES ---
const POSTS_POR_BLOG = 30; // Altere aqui para mudar o limite por blog
const SITE_URL = 'https://entreblogs.com.br';
const FEED_TITLE = 'Feed - Entreblogs';
const FEED_DESCRIPTION = 'Todas as postagens dos blogs participantes do Entreblogs';
const TIMEOUT_MS = 10000; // 10 segundos por feed

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => ['item', 'entry'].includes(name),
});

// Busca e parseia um feed RSS ou Atom
async function buscarFeed(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return [];
    const text = await res.text();
    const data = parser.parse(text);

    // RSS
    if (data?.rss?.channel) {
      const items = data.rss.channel.item || [];
      return items.slice(0, POSTS_POR_BLOG).map((item) => ({
        title: item.title || '',
        link: item.link || '',
        date: item.pubDate ? new Date(item.pubDate) : new Date(0),
        description: item.description || '',
        blog: '', // preenchido depois
      }));
    }

    // Atom
    if (data?.feed?.entry) {
      const entries = data.feed.entry || [];
      return entries.slice(0, POSTS_POR_BLOG).map((entry) => {
        const link = Array.isArray(entry.link)
          ? entry.link.find((l) => l['@_rel'] === 'alternate')?.['@_href'] || entry.link[0]?.['@_href'] || ''
          : entry.link?.['@_href'] || entry.link || '';
        return {
          title: entry.title?.['#text'] || entry.title || '',
          link,
          date: entry.updated ? new Date(entry.updated) : new Date(0),
          description: entry.summary?.['#text'] || entry.summary || entry.content?.['#text'] || '',
          blog: '',
        };
      });
    }

    return [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

// Escapa caracteres especiais para XML
function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function main() {
  // Lê o participantes.yml
  const ymlPath = path.join(__dirname, '..', '_data', 'participantes.yml');
  const participantes = yaml.load(fs.readFileSync(ymlPath, 'utf8'));

  const comFeed = participantes.filter((p) => p.feed && p.feed.trim() !== '');
  console.log(`Buscando feeds de ${comFeed.length} blogs...`);

  // Busca todos os feeds em paralelo
  const resultados = await Promise.all(
    comFeed.map(async (p) => {
      console.log(`  → ${p.blog}`);
      const posts = await buscarFeed(p.feed);
      return posts.map((post) => ({ ...post, blog: p.blog }));
    })
  );

  // Junta e ordena tudo por data (mais recente primeiro)
  const todos = resultados
    .flat()
    .filter((p) => p.link)
    .sort((a, b) => b.date - a.date);

  console.log(`Total de posts coletados: ${todos.length}`);

  // Gera o XML
  const agora = new Date().toUTCString();
  const itens = todos
    .map(
      (post) => `
  <item>
    <title>${xmlEscape(post.blog)} — ${xmlEscape(post.title)}</title>
    <link>${xmlEscape(post.link)}</link>
    <guid isPermaLink="true">${xmlEscape(post.link)}</guid>
    <pubDate>${post.date.toUTCString()}</pubDate>
    <description><![CDATA[${post.description}]]></description>
  </item>`
    )
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
