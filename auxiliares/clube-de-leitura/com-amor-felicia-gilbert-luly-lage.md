---
layout: projeto
type: clube de leitura
title: Com amor, Felicia Gilbert • Luly Lage
description: Livro de Junho de 2026.
permalink: /clube-de-leitura/com-amor-felicia-gilbert-luly-lage/
---
<figure><img src="{{ site.baseurl }}/assets/livros/com-amor-felicia-gilbert-luly-lage.jpg"></figure>

Felícia Gilbert tem 16 anos e cresceu entre livros antigos, bichos de pelúcia e muito amor vindo de suas duas mães e da irmã, Eleanor. Criativa e sonhadora, Felícia encontra nos cadernos e, agora, em seu novo blog “Com amor, Felicia”, um espaço seguro para desabafar tudo o que sente — porque nem sempre é fácil viver num mundo que insiste em julgar aquilo que não entende.
Enfrentando o bullying silencioso de colegas da escola, em meio às tarde que passa no museu onde trabalha o avô de seu amigo Theo, Felícia é selecionada para participar de um programa de verão em outra cidade. Lá, entre insetos exóticos, amizades novas e a descoberta de uma paixão inesperada, ela começa a construir uma nova narrativa sobre si mesma — mais forte, livre e verdadeira.

<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_filtrados = site.data.leitura | where: "livro", page.title %}
  
  {% for item in posts_filtrados %}
    <li>
      <a href="{{ item.url }}">{{ item.nome }}</a>
    </li>
  {% endfor %}
</ul>
