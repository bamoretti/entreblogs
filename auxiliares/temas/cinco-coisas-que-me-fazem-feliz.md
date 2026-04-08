---
layout: projeto
type: temas
title: Cinco coisas que me fazem feliz
description: Tema de Abril/2026.
permalink: /temas/cinco-coisas-que-me-fazem-feliz/
---

Agora é a vez de escrever sobre cinco coisas (que não são necessariamente coisas) que te fazem feliz. Pode ser qualquer assunto. 
 
<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>


Veja os temas de [meses anteriores](/temas). 