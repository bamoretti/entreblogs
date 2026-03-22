---
layout: projeto
type: temas
title: Recap 2025
description: Tema de janeiro/2026.
permalink: /temas/recap_2025/
---
<time>01 de janeiro 2026</time>  
O tema do mês de Janeiro é escrever sobre o último ano, 2025. 

As conquistas, as coisas que te atravessaram, as melhores leituras, as fotos que todo mundo merece ver... Não há limitações e nem formatos!  

Veja os temas de [meses anteriores](/entreblogs/temas).  

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>
