---
layout: default
title: Tutoriais
description: Dicas dos blogueiros.
---

{% assign tutoriais_ordenados = site.data.tutoriais | sort: "tutorial" %}

<ul>
  {% assign grupo_atual = "" %}

  {% for blog in tutoriais_ordenados %}
    {% assign char = blog.tutorial | slice: 0 | upcase %}
    {% assign alfabeto_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" %}
    
    {% if alfabeto_string contains char %}
      {% assign grupo_item = char %}
    {% else %}
      {% assign grupo_item = "#" %}
    {% endif %}

    {% if grupo_item != grupo_atual %}
<li id="letra-{{ grupo_item }}" class="blog-letra">
        {{ grupo_item }}
  <a href="#topo" class="seta-topo" title="Voltar ao topo">&#x2191;</a>
</li>
      {% assign grupo_atual = grupo_item %}
    {% endif %}

  <li class="blog-nome">
  <a href="{{ blog.url }}">{{ blog.tutorial }}</a>
      {% if blog.criador and blog.criador != "" %}
  <span class="blog-rss"> {{ blog.criador }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>