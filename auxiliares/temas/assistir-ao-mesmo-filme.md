---
layout: projeto
type: temas
title: Assistir ao mesmo filme
description: Tema de Maio/2026.
permalink: /temas/assistir-ao-mesmo-filme/
---

Vamos assistir ao prestigiado Interstellar (tema principal) e ao cômico Reflexões de um Liquidificador (tema extra).
 
<section>
<ul>
   <li>
    <figure>
         <img src="{{ site.baseurl }}/assets/imagens/interstellar.jpg">
      <figcaption>Interstellar (2014)</figcaption>
    </figure>
  </li>
    <li>
    <figure>
         <img src="{{ site.baseurl }}/assets/imagens/reflexoes-liquidificador.jpg">
      <figcaption>Reflexões de um Liquidificador (2010)</figcaption>
    </figure>
  </li>
  
</ul>
</section>

 
<h4>Blogs participantes:</h4>

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
    renderizarPorTema("#013");

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
      <li class="link-temas">
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

Veja os temas de [meses anteriores](/temas). 
