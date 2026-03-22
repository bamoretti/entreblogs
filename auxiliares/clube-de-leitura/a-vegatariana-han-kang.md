---
layout: projeto
type: clube de leitura
title: A Vegetariana • Han Kang
description: Livro de março.
permalink: /clube-de-leitura/a-vegetariana-han-kang/
---
<figure><img src="{{ site.baseurl }}/assets/livros/a-vegetariana-han-kang.jpg"><figcaption>A Vegetariana • Han Kang (livro de março)
</figcaption></figure>

A vegetariana conta a história dessa mulher comum que, pela simples decisão de não comer mais carne, transforma uma vida aparentemente sem maiores atrativos em um pesadelo perturbador e transgressivo. Narrado a três vozes, o romance apresenta o distanciamento progressivo da condição humana de uma mulher que decidiu deixar de ser aquilo que marido e família a pressionaram a ser a vida inteira.

Veja os [livros anteriores](/entreblogs/clube-de-leitura). 

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.leitura | where: "livro", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
