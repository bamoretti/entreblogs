---
layout: default
title: Testes
description: Deixe sua mensagem para a comunidade.
---


<div id="lista"></div>

<script>
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vToO88a-ebH_dZ38wiwtGo-tAh14FS4q3fGnHiPJhiA4lLfFRU-O1eMTP3qKwCyGYwgMLd1UXDc_In4/pub?output=csv")
  .then(res => res.text())
  .then(text => {
    const linhas = text.split("\n").slice(1);
    let html = "<ul>";

    linhas.forEach(linha => {
      const [post, blog, data, link] = linha.split(",");

      if (post && link) {
        html += `<li>
          <a href="${link}" target="_blank">${post}</a>
          - ${blog} (${data})
        </li>`;
      }
    });

    html += "</ul>";
    document.getElementById("lista").innerHTML = html;
  });
</script>

