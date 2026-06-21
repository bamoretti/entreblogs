---
layout: default
title: Testes
description: Deixe sua mensagem para a comunidade.
permalink: /testes/
---

<div id="entreblogs-lista"></div>

<style>
/* ===== PERSONALIZE AQUI ===== */

.entreblogs-tema {
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.entreblogs-header {
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 600;
  list-style: none;
}

.entreblogs-header::-webkit-details-marker {
  display: none;
}

.entreblogs-codigo {
  opacity: .7;
  margin-right: 8px;
}

.entreblogs-titulo {
  font-size: 1rem;
}

.entreblogs-total {
  opacity: .6;
  margin-left: 6px;
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
}

.entreblogs-link:hover {
  text-decoration: underline;
}

/* Tema aberto */

.entreblogs-tema[open] .entreblogs-header {
  border-bottom: 1px solid #ddd;
}

/* =========================== */
</style>

<script>
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

fetch(CSV_URL)
  .then(response => response.text())
  .then(text => {

    const linhas = text.trim().split("\n").slice(1);

    const dados = linhas.map(linha => {

      const cols = parseCSVLine(linha);

      return {
        timestamp: cols[0]?.trim(),
        blog: cols[1]?.trim(),
        participacao: cols[2]?.trim(),
        temaPrincipal: cols[3]?.trim(),
        temaExtra: cols[4]?.trim(),
        livro: cols[5]?.trim(),
        link: cols[6]?.trim(),
        codigo: cols[7]?.trim()
      };

    }).filter(item =>
      item.blog &&
      item.link &&
      item.temaPrincipal
    );

    renderizar(dados);

  });

function renderizar(dados) {

  const grupos = {};

  dados.forEach(item => {

    const codigo = item.codigo || "";
    const tema = item.temaPrincipal || "Sem tema";

    const chave = codigo + "||" + tema;

    if (!grupos[chave]) {

      grupos[chave] = {
        codigo,
        tema,
        posts: []
      };

    }

    grupos[chave].posts.push(item);

  });

  const listaGrupos = Object.values(grupos);

  listaGrupos.sort((a, b) => {

    const numA =
      parseInt((a.codigo || "").replace(/\D/g, "")) || 0;

    const numB =
      parseInt((b.codigo || "").replace(/\D/g, "")) || 0;

    return numB - numA;

  });

  let html = "";

  listaGrupos.forEach((grupo, index) => {

    html += `
      <details
        class="entreblogs-tema"
        ${index === 0 ? "open" : ""}
      >

        <summary class="entreblogs-header">

          <span class="entreblogs-codigo">
            ${grupo.codigo}
          </span>

          <span class="entreblogs-titulo">
            ${grupo.tema}
          </span>

          <span class="entreblogs-total">
            (${grupo.posts.length})
          </span>

        </summary>

        <ul class="entreblogs-lista">
    `;

    grupo.posts.forEach(post => {

      html += `
        <li class="entreblogs-item">

          <a
            href="${post.link}"
            target="_blank"
            rel="noopener"
            class="entreblogs-link"
          >
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

  document.getElementById(
    "entreblogs-lista"
  ).innerHTML = html;

  // Accordion:
  // abre um e fecha os outros

  document
    .querySelectorAll(".entreblogs-tema")
    .forEach(details => {

      details.addEventListener("toggle", () => {

        if (!details.open) return;

        document
          .querySelectorAll(".entreblogs-tema")
          .forEach(outro => {

            if (outro !== details) {
              outro.removeAttribute("open");
            }

          });

      });

    });

}

function parseCSVLine(line) {

  const result = [];

  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {

    const char = line[i];

    if (
      char === '"' &&
      line[i + 1] === '"'
    ) {

      current += '"';
      i++;

    }
    else if (char === '"') {

      inQuotes = !inQuotes;

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