---
layout: projeto
type: temas
title: 10 curiosidades sobre mim
description: Junho de 2026
permalink: /temas/10-curiosidades-sobre-mim/
---

Quais são as 10 coisas que fazem de você quem você é?
 
<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>


Veja os temas de [meses anteriores](/temas). 