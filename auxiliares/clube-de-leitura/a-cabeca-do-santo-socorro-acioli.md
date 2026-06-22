---
layout: projeto
type: clube de leitura
title: A Cabeça do Santo • Socorro Acioli
description: Livro de fevereiro.
permalink: /clube-de-leitura/a-cabeca-do-santo-socorro-acioli/
---
<figure><img src="{{ site.baseurl }}/assets/livros/a-cabeca-do-santo-socorro-acioli.jpg"><figcaption>A Cabeça do Santo • Socorro Acioli
</figcaption></figure>

Pouco antes de morrer, a mãe de Samuel lhe faz um último pedido: que ele vá encontrar a avó e o pai que nunca conheceu. Mesmo contrariado, o rapaz cumpre a promessa e faz a pé o caminho de Juazeiro do Norte até a pequena cidade de Candeia, sofrendo todas as agruras do sol impiedoso do sertão do Ceará.  

Ao chegar àquela cidade quase fantasma, ele encontra abrigo num lugar curioso: a cabeça oca e gigantesca de uma estátua inacabada de santo Antônio, que jazia separada do resto do corpo. Mas as estranhezas não param aí: Samuel começa a escutar uma confusão de vozes femininas apenas quando está dentro da cabeça. Assustado, se dá conta de que aquilo são as preces que as mulheres fazem ao santo falando de amor.  

Seu primeiro contato na cidade será com Francisco, um rapaz de quem logo fica amigo e que resolve ajudá-lo a explorar comercialmente o seu dom da escuta, promovendo casamentos e outras artimanhas amorosas. Antes parada no tempo, a cidade aos poucos volta à vida, à medida que vai sendo tomada por fiéis de todos os cantos, atraídos pelo poder inaudito de Samuel. Em meio a esse tumulto, ele ainda irá se apaixonar por uma voz misteriosa que se destaca entre as tantas outras que ecoam na cabeça do santo.


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
