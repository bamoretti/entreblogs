---
layout: projeto
type: tags
title: Conheça o blogueiro
description: Quem é o blog e o blogueiro?
permalink: /tag/conheça-o-blogueiro
---
Conte um pouco do porquê você fez seu blog, o que te motiva e alimenta sua vontade de blogar!

Veja [outras TAGS](/tag). 

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.tags | where: "tags", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>