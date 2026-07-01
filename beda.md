---
layout: vazio
title: BEDA 2026
permalink: /beda/
---

<div id="lista"></div>

<script>

const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vToO88a-ebH_dZ38wiwtGo-tAh14FS4q3fGnHiPJhiA4lLfFRU-O1eMTP3qKwCyGYwgMLd1UXDc_In4/pub?output=csv";

fetch(csvUrl)
  .then(response => response.text())
  .then(csv => {

    const linhas = csv.trim().split(/\r?\n/);

    // remove o cabeçalho
    linhas.shift();

    const dias = {};

    linhas.forEach(linha => {

      const colunas = linha.split(",");

      const dia = colunas[0].trim();
      const post = colunas[1].trim();
      const blog = colunas[2].trim();
      const link = colunas[3].trim();

      if (!dias[dia]) {
        dias[dia] = [];
      }

      dias[dia].push({
        post,
        blog,
        link
      });

    });

    let html = "";

    Object.keys(dias)
      .sort((a, b) => Number(a) - Number(b))
      .forEach(dia => {

        html += `<section class="dia">`;
        html += `<h2>Dia ${dia}</h2>`;
        html += `<ul>`;

        dias[dia].forEach(item => {

          html += `
            <li>
              <a href="${item.link}" target="_blank">
                ${item.post}
              </a>
              <span> - ${item.blog}</span>
            </li>
          `;

        });

        html += `</ul>`;
        html += `</section>`;

      });

    document.getElementById("lista").innerHTML = html;

  })
  .catch(error => {
    console.error(error);
  });

</script>
