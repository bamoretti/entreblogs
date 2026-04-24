---
layout: projeto
type: extras
title: Conheça o blogueiro
description: Quem é o blog e o blogueiro?
permalink: /extras/conheca-o-blogueiro/
---
Conte um pouco do porquê você fez seu blog, o que te motiva e alimenta sua vontade de blogar!

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.extras | where: "extras", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
