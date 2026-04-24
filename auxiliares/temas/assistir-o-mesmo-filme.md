---
layout: projeto
type: temas
title: Cinco coisas que me fazem feliz
description: Tema de Maio/2026.
permalink: /temas/assistir-o-mesmo-filme/
---

Vamos assistir ao prestigiado Interstellar (2014) e ao cômico reflexões de um liquidificador (2010).
 
 <img src="{{ site.baseurl }}/assets/imagens/Interstellar.jpg">
 <img src="{{ site.baseurl }}/assets/imagens/reflexoes-liquidificador">
 
<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>

