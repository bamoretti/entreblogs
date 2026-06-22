---
layout: projeto
type: clube de leitura
title: A Vegetariana • Han Kang
description: Livro de março.
permalink: /clube-de-leitura/a-vegetariana-han-kang/
---
<figure><img src="{{ site.baseurl }}/assets/livros/a-vegetariana-han-kang.jpg"><figcaption>A Vegetariana • Han Kang (livro de abril)
</figcaption></figure>

A vegetariana conta a história dessa mulher comum que, pela simples decisão de não comer mais carne, transforma uma vida aparentemente sem maiores atrativos em um pesadelo perturbador e transgressivo. Narrado a três vozes, o romance apresenta o distanciamento progressivo da condição humana de uma mulher que decidiu deixar de ser aquilo que marido e família a pressionaram a ser a vida inteira.


<h4>Blogs participantes:</h4>

<div id="lista"></div>

<script>
const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

let dados = [];

fetch(url)
  .then(res => res.text())
  .then(text => {

    const linhas = text.trim().split("\n").slice(1);

    dados = linhas.map(linha => {

      // 🔥 FIX: respeita aspas do CSV
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

    }).filter(d => d.blog && d.link);

    // 🔥 TESTE CORRETO:
    renderizarPorTema("04.2026");

  });


function renderizarPorTema(tema) {

  let filtrados = dados;

  if (tema && tema !== "TODOS") {
    filtrados = dados.filter(d =>
      (d.codigo || "").trim() === tema.trim()
    );
  }

  let html = "<ul>";

  filtrados.forEach(item => {
    html += `
      <li>
        <a href="${item.link}" target="_blank">
          ${item.blog}
        </a>
      </li>
    `;
  });

  html += "</ul>";

  document.getElementById("lista").innerHTML = html;
}


// 🔥 CSV parser correto (lida com aspas e vírgulas)
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
