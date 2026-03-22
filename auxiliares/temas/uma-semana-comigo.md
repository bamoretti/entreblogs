---
layout: projeto
type: temas
title: Uma semana comigo 
description: Tema de março/2026.
permalink: /temas/uma-semana-comigo/
---
<time>01 de março 2026</time>  
O tema do mês é escrever sobre alguma semana de março. 

O Importante é ser criativo, por que não escrever sobre todas as refeições que teve durante a semana? Ou registrar tudo em fotos e fazer um álbum? Quais foram as músicas da semana?
Como já sabem, não há limites!

Veja os temas de [meses anteriores](/entreblogs/temas).  

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>
