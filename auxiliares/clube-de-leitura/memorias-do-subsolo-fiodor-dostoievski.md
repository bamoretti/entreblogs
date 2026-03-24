---
layout: projeto
type: clube de leitura
title: Memórias do Subsolo • Fiódor Dostoiévski
description: Livro de Maio de 2026.
permalink: /clube-de-leitura/memorias-do-subsolo-fiodor-dostoievski/
---
<figure><img src="{{ site.baseurl }}/assets/livros/memorias-do-subsolo-fiodor-dostoievski.jpg"></figure>

Lançado originalmente em 1864, enquanto Dostoiévski morava em Moscou e sua esposa estava nas últimas semanas de vida, Memórias do subsolo é considerado por muitos o ponto inicial da segunda fase do autor -- na qual publicaria suas mais aclamadas obras.

Alienado da sociedade e paralisado pelo peso da própria insignificância, o narrador deste livro conta a história de sua conturbada vida. Com fina ironia, ele relata sua recusa em se tornar mais um trabalhador e seu gradual exílio da sociedade que o cerca.

Escrita em poucas semanas, esta novela arrebatadora explora, com a maestria única de Dostoiévski, as profundezas do desespero humano. 

Tradução do russo, apresentação e notas de Rubens Figueiredo.

Veja os [livros anteriores]({{ site.baseurl }}/clube-de-leitura). 

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.leitura | where: "livro", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
