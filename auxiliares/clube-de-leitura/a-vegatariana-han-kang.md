---
layout: projeto
type: clube de leitura
title: A Vegetariana • Han Kang
description: Livro de março.
permalink: /clube-de-leitura/a-vegetariana-han-kang
---
<figure><img src="/assets/livros/a-vegetariana-han-kang.jpg"><figcaption>Três • Valérie Perrin (em leitura)
</figcaption></figure>


Veja os [livros anteriores](/clube-de-leitura). 

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.leitura | where: "livro", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
