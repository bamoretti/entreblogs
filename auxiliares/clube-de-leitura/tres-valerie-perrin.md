---
layout: projeto
type: clube de leitura
title: Três • Valérie Perrin
description: Livro de fevereiro.
permalink: /clube-de-leitura/tres-valerie-perrin/
---
<figure><img src="{{ site.baseurl }}/assets/livros/tres-valerie-perrin.jpg"><figcaption>Três • Valérie Perrin
</figcaption></figure>

Adrien, Étienne e Nina se conhecem na escola aos dez anos, em 1986, e rapidamente se tornam inseparáveis. Eles passam o dia juntos nadando na piscina, trocando confidências e prometendo que um dia sairão do interior da França e se mudarão para Paris, onde viverão de música. Os três não podiam ser mais diferentes: Étienne é o rebelde, Adrien, o ingênuo, e Nina, a emotiva. No entanto, a união entre eles é maior do que qualquer diferença. Um não se vê sem o outro. Mas, às vezes, nem mesmo o laço mais forte é capaz de resistir aos percalços da vida. Enquanto a infância vai ficando para trás, a forte conexão entre os três também começa a ceder aos obstáculos que surgem ao longo do caminho. Trinta anos depois de se conhecerem, Adrien, Étienne e Nina se tornaram estranhos uns para os outros. A amizade que eles juraram que seria eterna não existe mais. Porém, um acontecimento inesperado pode trazer à tona segredos enterrados há muito tempo. Um carro é encontrado no fundo de um lago, e Virginie, uma jornalista com um passado enigmático, começa a investigar o caso enquanto reflete sobre a relação entre os três amigos. À medida que ela se aproxima da verdade, uma sequência de eventos e mistérios que se estende por três décadas é revelada e o destino dos três se cruza novamente. 

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
    renderizarPorTema("03.2026");

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
