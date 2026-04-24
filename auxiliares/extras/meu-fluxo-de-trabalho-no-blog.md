---
layout: projeto
type: extras
title: Meu fluxo de trabalho no blog
description: Como a gente faz os textos aparecerem.
permalink: /extras/meu-fluxo-de-trabalho-no-blog/
---

Como a _magia_ acontece nos nossos blogs?  
Qual é o processo criativo, de escrita de cada um?  

Hoje, no ENTREBLOGS.

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.extras | where: "extras", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
