---
layout: default
title: Participantes
description: Listagem dos blogs participantes da comunidade.
---

<ul style="list-style:none;">
  {% for blog in site.data.participantes %}
    <li>
      <a href="{{ blog.url }}">{{ blog.nome }}</a>
      {% if blog.feed != "" %}
        <a href="{{ blog.feed }}" title="Feed RSS"> (RSS)</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>



Se você quiser acompanhar todos os blogs de uma vez disponibilizamos abaixo um arquivo OPML onde você pode adicionar todos os blogs no seu leitor de RSS.  

Divirta-se!

<div class="rss-box">
  <p></p>
  <a href="{{ 'assets/feeds.opml' | relative_url }}" download class="btn-terminal">
    DOWNLOAD OPML FEED
  </a>
  <p><small>Importe no seu leitor de RSS favorito.</small></p>
</div>