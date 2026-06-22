---
layout: projeto
type: clube de leitura
title: Com amor, Felicia Gilbert • Luly Lage
description: Livro de Junho de 2026.
permalink: /clube-de-leitura/com-amor-felicia-gilbert-luly-lage/
---
<figure><img src="{{ site.baseurl }}/assets/livros/com-amor-felicia-gilbert-luly-lage.jpg"></figure>

Felícia Gilbert tem 16 anos e cresceu entre livros antigos, bichos de pelúcia e muito amor vindo de suas duas mães e da irmã, Eleanor. Criativa e sonhadora, Felícia encontra nos cadernos e, agora, em seu novo blog “Com amor, Felicia”, um espaço seguro para desabafar tudo o que sente — porque nem sempre é fácil viver num mundo que insiste em julgar aquilo que não entende.
Enfrentando o bullying silencioso de colegas da escola, em meio às tarde que passa no museu onde trabalha o avô de seu amigo Theo, Felícia é selecionada para participar de um programa de verão em outra cidade. Lá, entre insetos exóticos, amizades novas e a descoberta de uma paixão inesperada, ela começa a construir uma nova narrativa sobre si mesma — mais forte, livre e verdadeira.

<blockquote class="fleabag"> Livro escrito pela Entrebloggger, Luly Lage. </blockquote>

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
    renderizarPorTema("06.2026");

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
