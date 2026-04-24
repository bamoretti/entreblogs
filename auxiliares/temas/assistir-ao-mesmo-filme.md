---
layout: projeto
type: temas
title: Assistir ao mesmo filme
description: Tema de Maio/2026.
permalink: /temas/assistir-o-mesmo-filme/
---

Vamos assistir ao prestigiado Interstellar (tema principal) e ao cômico Reflexões de um Liquidificador (tema extra).
 
<section>
<ul>
   <li>
    <figure>
         <img src="{{ site.baseurl }}/assets/imagens/interstellar.jpg">
      <figcaption>Interstellar (2014)</figcaption>
    </figure>
  </li>
    <li>
    <figure>
         <img src="{{ site.baseurl }}/assets/imagens/reflexoes-liquidificador.jpg">
      <figcaption>Reflexões de um Liquidificador (2010)</figcaption>
    </figure>
  </li>
  
</ul>
</section>

 
<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>

