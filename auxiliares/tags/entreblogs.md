---
layout: projeto
type: tags
title: ENTREBLOGS
description: Quem é você?.
permalink: /tag/entreblogs/
---
Quem é você fora do blog? 

Qual é a história por trás do seu blog? 

Como funciona seu processo criativo e escrita? Você tem algum ambiente criativo? (rotina com o blog, por exemplo) 

Um fato aleatório que você considera intrigante. (literalmente, qualquer coisa) 

Indique um ou mais blogs e compartilhe o que mais gosta neles. 

Se você pudesse recomendar apenas uma coisa, o que recomendaria? (fazer um hobby, viagem favorita, livro que te marcou muito) 

Veja [outras TAGS](/entreblogs/tag). 

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.tags | where: "tags", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
