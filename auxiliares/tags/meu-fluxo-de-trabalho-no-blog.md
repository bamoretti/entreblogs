---
layout: projeto
type: tags
title: Meu fluxo de trabalho no blog
description: Como a gente faz os textos aparecerem.
permalink: /tag/meu-fluxo-de-trabalho-no-blog/
---

Como a _magia_ acontece nos nossos blogs?  
Qual é o processo criativo, de escrita de cada um?  

Hoje, no ENTREBLOGS.

Veja [outras TAGS]({{ site.baseurl }}/tag). 

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.tags | where: "tags", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
