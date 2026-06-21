---
layout: default
title: Temas
description: Temas que já passaram pela blogagem.
---
<h4>Temas principais</h4>

<div id="entreblogs-lista"></div>

<h4>Temas extras</h4>
Podem ser postadas a qualquer momento, sinta-se a vontade:

+ 💻 [Meu fluxo de trabalho no blog]({{ site.baseurl }}/extras/meu-fluxo-de-trabalho-no-blog/)
+ 🪴 [Por trás do blog (tag Entreblogs)]({{ site.baseurl }}/extras/por-tras-do-blog/)
+ 🧃 [Conheça o blogueiro (tag)]({{ site.baseurl }}/extras/conheca-o-blogueiro/)



<style>
/* =======================
   CSS (PERSONALIZÁVEL)
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
  opacity: .6;
  font-size: .9rem;
}

.entreblogs-titulo {
  font-size: 1rem;
}

.entreblogs-total {
  opacity: .5;
  font-size: .85rem;
}

.entreblogs-descricao {
  padding: 18px;
  font-style: italic;
  font-size: .95rem;
  line-height: 1.5;
  opacity: .8;
}

.entreblogs-lista {
  margin: 0;
  padding: 0 20px 15px 40px;
}

.entreblogs-item {
  margin: 8px 0;
}

.entreblogs-link {
  text-decoration: none;
  font-weight: none !important;
}

.entreblogs-link:hover {
  text-decoration: underline;
}

/* aberto */
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
  
document.getElementById("entreblogs-lista").innerHTML =
  "<p class='entreblogs-loading'>Carregando...</p>";
  
/* =======================
   CONFIG
======================= */

const URL_PARTICIPACOES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

const URL_TEMAS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?gid=1757944473&single=true&output=csv";

let DADOS = [];
let DESCRICOES = {};

/* =======================
   INÍCIO
======================= */

Promise.all([
  fetch(URL_PARTICIPACOES).then(r => r.text()),
  fetch(URL_TEMAS).then(r => r.text())
]).then(([csvPart, csvTemas]) => {

  carregarParticipacoes(csvPart);
  carregarTemas(csvTemas);

  renderizar();

});

/* =======================
   PARTICIPAÇÕES
======================= */

function carregarParticipacoes(csv) {

  const linhas = csv.trim().split("\n").slice(1);

  DADOS = linhas.map(linha => {

  const cols = parseCSVLine(linha);

  const participacao = cols[2]?.trim();

  // FILTRO PRINCIPAL
  if (participacao !== "Tema principal") return null;

  const codigoOriginal = cols[7]?.trim() || "";
  const temaOriginal = cols[3]?.trim() || "Sem tema";

  const tema = temaOriginal.length > 6
    ? temaOriginal.substring(6).trim()
    : temaOriginal;

  return {
    timestamp: cols[0]?.trim(),
    blog: cols[1]?.trim(),
    participacao,
    temaPrincipal: tema,
    temaExtra: cols[4]?.trim(),
    livro: cols[5]?.trim(),
    link: cols[6]?.trim(),
    codigo: codigoOriginal
  };

}).filter(Boolean);

}

/* =======================
   TEMAS (DESCRIÇÕES)
======================= */

function carregarTemas(csv) {

  const linhas = csv.trim().split("\n").slice(1);

  linhas.forEach(linha => {

    const cols = parseCSVLine(linha);

    const codigo = cols[0]?.trim();
    const descricao = cols[1]?.trim();

    if (codigo) {
      DESCRICOES[codigo] = descricao;
    }

  });

}

/* =======================
   RENDER
======================= */

function renderizar() {

  const grupos = {};

  DADOS.forEach(item => {

    const chave = item.codigo + "||" + item.temaPrincipal;

    if (!grupos[chave]) {
      grupos[chave] = {
        codigo: item.codigo,
        tema: item.temaPrincipal,
        posts: []
      };
    }

    grupos[chave].posts.push(item);

  });

  const lista = Object.values(grupos);

  // ordena por código desc
  lista.sort((a, b) => {
    const na = parseInt((a.codigo || "").replace(/\D/g, "")) || 0;
    const nb = parseInt((b.codigo || "").replace(/\D/g, "")) || 0;
    return nb - na;
  });

  let html = "";

  lista.forEach((grupo, index) => {

    const descricao = DESCRICOES[grupo.codigo] || "";

    html += `
      <details class="entreblogs-tema" ${index === 0 ? "open" : ""}>

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

    grupo.posts.forEach(post => {

      html += `
        <li class="entreblogs-item">
          <a class="entreblogs-link" href="${post.link}" target="_blank" rel="noopener">
            ${post.blog}
          </a>
        </li>
      `;

    });

    html += `
        </ul>
      </details>
    `;

  });

  const container = document.getElementById("entreblogs-lista");
container.innerHTML = html;
}

/* =======================
   CSV PARSER
======================= */

function parseCSVLine(line) {

  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {

    const char = line[i];

    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);

  return result;
}
</script>