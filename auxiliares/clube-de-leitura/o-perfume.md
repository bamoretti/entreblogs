---
layout: projeto
type: clube de leitura
title: O Perfume • Patrick Suskind
permalink: /clube-de-leitura/o-perfume/
---
<figure><img src="{{ site.baseurl }}/assets/livros/o-perfume/.jpg"><figcaption>O Perfume • Patrick Suskind
</figcaption></figure>


Esta estranha história passa-se no século XVIII e é fruto de um extraordinário trabalho de reconstituição histórica que consegue captar plenamente os ambientes da época tal como as mentalidades. O protagonista é um artesão especializado no ofício de perfumista, e essa arte constitui para ele - nascido no meio dos nauseabundos odores de um mercado de rua - uma alquímica busca do Absoluto. O perfume supremo será para ele uma forma de alcançar o Belo e, nessa demanda nada o detém, nem mesmo os crimes mais hediondos, que fazem dele um ser monstruoso aos nossos olhos. Jean-Baptiste Grenouille possui no entanto uma incorrupta pureza que exerce um forte fascínio sobre o leitor. O Perfume, publicado em 1985, de um autor então quase desconhecido, foi considerado um dos mais importantes romances da década e nunca mais deixou de ser reeditado desde então, totalizando os 4 milhões de exemplares vendi dos, só na Alemanha, e 15 milhões em países estrangeiros. Foi traduzido em 42 línguas. Este fenómeno transformou-o num dos mais importantes livros de culto de sempre. 

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
    renderizarPorTema("02.2026");

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
