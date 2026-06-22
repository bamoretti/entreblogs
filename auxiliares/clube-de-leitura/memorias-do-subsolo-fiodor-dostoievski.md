---
layout: projeto
type: clube de leitura
title: Memórias do Subsolo • Fiódor Dostoiévski
description: Livro de Maio de 2026.
permalink: /clube-de-leitura/memorias-do-subsolo-fiodor-dostoievski/
---
<figure><img src="{{ site.baseurl }}/assets/livros/memorias-do-subsolo-fiodor-dostoievski.jpg"></figure>

Lançado originalmente em 1864, enquanto Dostoiévski morava em Moscou e sua esposa estava nas últimas semanas de vida, Memórias do subsolo é considerado por muitos o ponto inicial da segunda fase do autor -- na qual publicaria suas mais aclamadas obras.

Alienado da sociedade e paralisado pelo peso da própria insignificância, o narrador deste livro conta a história de sua conturbada vida. Com fina ironia, ele relata sua recusa em se tornar mais um trabalhador e seu gradual exílio da sociedade que o cerca.

Escrita em poucas semanas, esta novela arrebatadora explora, com a maestria única de Dostoiévski, as profundezas do desespero humano. 

Tradução do russo, apresentação e notas de Rubens Figueiredo.

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
    renderizarPorTema("05.2026");

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
