---
layout: default
title: Temas
description: Temas que já passaram pela blogagem.
---
<div id="entreblogs-lista">
  <div class="entreblogs-loading">
    Carregando temas...
  </div>
</div>

<style>
/* =======================
   CSS (inalterado)
======================= */

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
  color: var(--cor-moldura);
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
  
}

.entreblogs-item {
  margin: 8px 0;
}

.entreblogs-item:before {
 content: "▸ ";
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
        "Tema principal"
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

  const grupos = {};

  DADOS.forEach(item => {

    const chave =
      item.codigo +
      "||" +
      item.temaPrincipal;

    if (!grupos[chave]) {

      grupos[chave] = {
        codigo: item.codigo,
        tema: item.temaPrincipal,
        posts: []
      };

    }

    grupos[chave]
      .posts
      .push(item);

  });

  const lista =
    Object.values(grupos);

  lista.sort((a, b) => {

    const na =
      parseInt(
        (a.codigo || "")
          .replace(/\D/g, "")
      ) || 0;

    const nb =
      parseInt(
        (b.codigo || "")
          .replace(/\D/g, "")
      ) || 0;

    return nb - na;

  });

  lista.forEach(
    (grupo, index) => {

      const descricao =
        DESCRICOES[
          grupo.codigo
        ] || "";

      const el =
        document.createElement(
          "details"
        );

      el.className =
        "entreblogs-tema";

      if (index === 0) {
        el.open = true;
      }

      let html = `
        <summary class="entreblogs-header">
          <span class="entreblogs-codigo">${grupo.codigo}</span>
          <span class="entreblogs-titulo">${grupo.tema}</span>
          <span class="entreblogs-total">(${grupo.posts.length})</span>
        </summary>

        ${descricao ? `
          <div class="entreblogs-descricao">
            ${descricao}
          </div>
        ` : ""}

        <ul class="entreblogs-lista">
      `;

      grupo.posts.forEach(
        post => {

          html += `
            <li class="entreblogs-item">
              <a
                class="entreblogs-link"
                href="${post.link}"
                target="_blank"
                rel="noopener">
                ${post.blog}
              </a>
            </li>
          `;

        }
      );

      html += "</ul>";

      el.innerHTML = html;

      container.appendChild(el);

    }
  );

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
