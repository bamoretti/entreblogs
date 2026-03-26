import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import Parser from 'rss-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- CONFIGURAÇÕES ---
const POSTS_POR_BLOG = 30;
const SITE_URL = 'https://entreblogs.com.br';
const FEED_TITLE = 'Entreblogs';
const FEED_DESCRIPTION = 'Todas as postagens dos blogs participantes do Entreblogs';
const TIMEOUT_MS = 20000;

const parser = new Parser({
  timeout: TIMEOUT_MS,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; Entreblogs Feed Aggregator; +https://entreblogs.com.br)',
    'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
  },
  maxRedirects: 5,
});

async function buscarFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).slice(0, POSTS_POR_BLOG).map((item) => ({
      title: item.title || '',
      link: item.link || item.guid || '',
      date: item.pubDate || item.isoDate ? new Date(item.pubDate || item.isoDate) : new Date(0),
      description: item.content || item.contentSnippet || item.summary || '',
      blog: '',
    }));
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
