---
layout: default
title: Participantes
description: Listagem dos blogs participantes da comunidade.
---



<div id="entreblogs-lista">
  <div class="entreblogs-loading">
    Carregando lista de participantes...
  </div>
</div>

<style>
/* =======================
   CSS (inalterado)
======================= */

html {
  scroll-behavior: smooth;
}
  
.entreblogs-tema {
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.entreblogs-header {
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 600;
  list-style: none;
  display: flex;
  gap: 10px;
  align-items: center;
}

.entreblogs-header::-webkit-details-marker {
  display: none;
}

.entreblogs-codigo {
  font-size: .9rem;
  color: color-mix(in srgb, var(--cor-moldura), #000000 10%);
}

.entreblogs-titulo {
  font-size: 1rem;
}

.entreblogs-total {
  opacity: .5;
  font-size: .85rem;
}

.entreblogs-descricao {
  padding: 20px;
  font-size: .80rem;
  line-height: 1.5;
  font-style: italic;
  border-bottom: 1px solid #ddd;
}

.entreblogs-lista {
  margin: 0;
  padding: 0 20px 15px 40px;
  font-weight: none;
  text-transform: uppercase;
  
}

.entreblogs-item {
  margin: 8px 0;
  font-weight: none !important;
}

.entreblogs-item:before {
 content: "- ";
}

.entreblogs-link {
  text-decoration: none;
}

.entreblogs-link:hover {
  text-decoration: underline;
}

.entreblogs-tema[open] .entreblogs-header {
  border-bottom: 1px solid #eee;
}

.entreblogs-loading {
  padding: 12px 16px;
  opacity: 0.7;
  font-style: italic;
}
  
  .entreblogs-indice{
  text-align: center;
    margin: 0 auto;
	padding: 20px;
  }
  
  .entreblogs-indice-link{
  text-decoration: none;
  }

#contador-participantes {
  text-align: center;
  font-size: 1.2rem;
  margin: 20px 0;
}

#contador-participantes strong {
  font-size: 2rem;
  display: block;
}
</style>

<script>
const URL_PARTICIPACOES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

const URL_TEMAS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?gid=1757944473&single=true&output=csv";

let DADOS = [];
let DESCRICOES = {};

const CACHE_TIME = 1000 * 60 * 30;

function getCache(url) {
  try {
    const cache = localStorage.getItem(url);
    return cache ? JSON.parse(cache) : null;
  } catch {
    return null;
  }
}

function setCache(url, data) {
  localStorage.setItem(
    url,
    JSON.stringify({
      time: Date.now(),
      data
    })
  );
}

async function fetchFresh(url) {

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Erro ao carregar " + url);
  }

  const data = await resp.text();

  setCache(url, data);

  return data;
}

async function iniciar() {

  const container =
    document.getElementById("entreblogs-lista");

  const cachePart =
    getCache(URL_PARTICIPACOES);

  const cacheTemas =
    getCache(URL_TEMAS);

  const possuiCache =
    cachePart?.data &&
    cacheTemas?.data;

  /* =======================
     PRIMEIRA VISITA
  ======================= */

  if (!possuiCache) {

    const [csvPart, csvTemas] =
      await Promise.all([
        fetchFresh(URL_PARTICIPACOES),
        fetchFresh(URL_TEMAS)
      ]);

    carregarParticipacoes(csvPart);
    carregarTemas(csvTemas);

    renderizar();

    return;
  }

  /* =======================
     MOSTRA CACHE IMEDIATAMENTE
  ======================= */

  carregarParticipacoes(cachePart.data);
  carregarTemas(cacheTemas.data);

  renderizar();

  /* =======================
     BACKGROUND UPDATE
  ======================= */

  Promise.all([
    fetchFresh(URL_PARTICIPACOES),
    fetchFresh(URL_TEMAS)
  ])
  .then(([novoPart, novoTemas]) => {

    const mudou =
      novoPart !== cachePart.data ||
      novoTemas !== cacheTemas.data;

    if (!mudou) {
      return;
    }

    DADOS = [];
    DESCRICOES = {};

    carregarParticipacoes(novoPart);
    carregarTemas(novoTemas);

    renderizar();

    console.log(
      "EntreBlogs atualizado em background."
    );

  })
  .catch(err => {

    console.warn(
      "Falha na atualização em background:",
      err
    );

  });

}

iniciar().catch(() => {

  document.getElementById(
    "entreblogs-lista"
  ).innerHTML = `
    <div class="entreblogs-loading">
      Erro ao carregar os dados.
    </div>
  `;

});

function carregarParticipacoes(csv) {

  const linhas =
    csv.trim().split("\n").slice(1);

  DADOS = linhas
    .map(linha => {

      const cols =
        parseCSVLine(linha);

      const participacao =
        cols[2]?.trim();

      if (
        participacao !==
        "Participantes"
      ) {
        return null;
      }

      const codigoOriginal =
        cols[7]?.trim() || "";

      const temaOriginal =
        cols[3]?.trim() ||
        "Sem tema";

      const tema =
        temaOriginal.length > 6
          ? temaOriginal
              .substring(6)
              .trim()
          : temaOriginal;

      return {
        blog: cols[1]?.trim(),
        temaPrincipal: tema,
        link: cols[6]?.trim(),
        codigo: codigoOriginal
      };

    })
    .filter(Boolean);

}

function carregarTemas(csv) {

  DESCRICOES = {};

  const linhas =
    csv.trim().split("\n").slice(1);

  linhas.forEach(linha => {

    const cols =
      parseCSVLine(linha);

    const codigo =
      cols[0]?.trim();

    const descricao =
      cols[1]?.trim();

    if (codigo) {
      DESCRICOES[codigo] =
        descricao;
    }

  });

}


function renderizar() {

  const container =
    document.getElementById(
      "entreblogs-lista"
    );

  container.innerHTML = "";

  /* =======================
     AGRUPA POR LETRA
  ======================= */

  const grupos = {};

  DADOS.forEach(item => {

    const letra =
      (item.blog || "")
        .trim()
        .charAt(0)
        .toUpperCase();

    const chave =
      /^[A-ZÀ-Ú]$/i.test(letra)
        ? letra
        : "#";

    if (!grupos[chave]) {
      grupos[chave] = [];
    }

    grupos[chave].push(item);

  });

  const letras =
    Object.keys(grupos)
      .sort((a, b) =>
        a.localeCompare(
          b,
          "pt-BR"
        )
      );

  /* =======================
     ÍNDICE DE LETRAS
  ======================= */

  const indice =
    document.createElement("div");

  indice.className =
    "entreblogs-indice";

  indice.innerHTML =
    letras.map(letra => `
      <a
        href="#letra-${letra}"
        class="entreblogs-indice-link">
        ${letra}
      </a>
    `).join("");

  container.appendChild(indice);

  /* =======================
     LISTA POR LETRA
  ======================= */

  letras.forEach(letra => {

    grupos[letra].sort((a, b) =>
      a.blog.localeCompare(
        b.blog,
        "pt-BR",
        {
          sensitivity: "base"
        }
      )
    );

    const bloco =
      document.createElement("div");

    bloco.className =
      "entreblogs-grupo";

    bloco.id =
      `letra-${letra}`;

    let html = `
      <div class="blog-letra">
        ${letra}
      </div>

      <ul class="entreblogs-lista">
    `;

    grupos[letra].forEach(blog => {

      html += `
        <li class="entreblogs-item">
          <a
            class="entreblogs-link"
            href="${blog.link}"
            target="_blank"
            rel="noopener">
            ${blog.blog}
          </a>
        </li>
      `;

    });

    html += `
      </ul>
    `;

    bloco.innerHTML = html;

    container.appendChild(bloco);

  });

}

/* =======================
   ANCORAGEM VIA URL
======================= */

const hash = window.location.hash
  .replace(/^#/, "")
  .trim();

if (hash) {

  const alvo = document.getElementById(hash);

  if (alvo) {

    alvo.open = true;

    requestAnimationFrame(() => {

      alvo.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }

}

function parseCSVLine(line) {

  const result = [];

  let current = "";

  let inQuotes = false;

  for (
    let i = 0;
    i < line.length;
    i++
  ) {

    const char = line[i];

    if (
      char === '"' &&
      line[i + 1] === '"'
    ) {

      current += '"';

      i++;

    }
    else if (
      char === '"'
    ) {

      inQuotes =
        !inQuotes;

    }
    else if (
      char === "," &&
      !inQuotes
    ) {

      result.push(current);

      current = "";

    }
    else {

      current += char;

    }

  }

  result.push(current);

  return result;

}
</script>



-

<div id="contador-participantes">
  Carregando participantes...
</div>

<script>
const URL_PARTICIPACOES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

async function carregarContador() {

  const container =
    document.getElementById(
      "contador-participantes"
    );

  try {

    const resp =
      await fetch(
        URL_PARTICIPACOES
      );

    const csv =
      await resp.text();

    const linhas =
      csv.trim()
         .split("\n")
         .slice(1);

    const blogs =
      new Set();

    linhas.forEach(linha => {

      const cols =
        parseCSVLine(linha);

      const participacao =
        cols[2]?.trim();

      if (
        participacao ===
        "Participantes"
      ) {

        const blog =
          cols[1]?.trim();

        if (blog) {
          blogs.add(blog);
        }

      }

    });

    container.innerHTML = `
      <strong>${blogs.size}</strong>
      blogs participantes
    `;

  }
  catch {

    container.innerHTML =
      "Erro ao carregar.";

  }

}

function parseCSVLine(line) {

  const result = [];

  let current = "";

  let inQuotes = false;

  for (
    let i = 0;
    i < line.length;
    i++
  ) {

    const char = line[i];

    if (
      char === '"' &&
      line[i + 1] === '"'
    ) {

      current += '"';

      i++;

    }
    else if (
      char === '"'
    ) {

      inQuotes =
        !inQuotes;

    }
    else if (
      char === "," &&
      !inQuotes
    ) {

      result.push(current);

      current = "";

    }
    else {

      current += char;

    }

  }

  result.push(current);

  return result;

}

carregarContador();
</script>