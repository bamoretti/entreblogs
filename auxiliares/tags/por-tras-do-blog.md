---
layout: projeto
type: tags
title: Por trás do blog
description: Quem é você?.
permalink: /tag/por-tras-do-blog/
---
Essa é a primeira tag do projeto, se você acabou de chegar, sinta-se a vontade para responder.

Quem é você fora do blog? 

Qual é a história por trás do seu blog? 

Como funciona seu processo criativo e escrita? Você tem algum ambiente criativo? (rotina com o blog, por exemplo) 

Um fato aleatório que você considera intrigante. (literalmente, qualquer coisa) 

Indique um ou mais blogs e compartilhe o que mais gosta neles. 

Se você pudesse recomendar apenas uma coisa, o que recomendaria? (fazer um hobby, viagem favorita, livro que te marcou muito) 


<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.tags | where: "tags", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
