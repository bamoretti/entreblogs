---
layout: default
title: BEDA 2026
description: 
permalink: /beda/
---

<div id="lista"></div>

<script>

const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vToO88a-ebH_dZ38wiwtGo-tAh14FS4q3fGnHiPJhiA4lLfFRU-O1eMTP3qKwCyGYwgMLd1UXDc_In4/pub?output=csv")";

fetch(csvUrl)
  .then(response => response.text())
  .then(csv => {

    const linhas = csv.trim().split("\n").slice(1);

    const dias = {};

    linhas.forEach(linha => {

      const colunas = linha.split(",");

      const post = colunas[0];
      const blog = colunas[1];
      const dia = colunas[2];
      const link = colunas[3];

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

    Object.keys(dias).forEach(dia => {

      html += `<h2>${dia}</h2>`;
      html += "<ul>";

      dias[dia].forEach(item => {

        html += `
          <li>
            <a href="${item.link}" target="_blank">
              ${item.post}
            </a>
            <small> - ${item.blog}</small>
          </li>
        `;

      });

      html += "</ul>";

    });

    document.getElementById("lista").innerHTML = html;

  });

</script>
