---
layout: default
title: Participantes
description: Listagem dos blogs participantes da comunidade.
---

{% assign participantes_ordenados = site.data.participantes %}
{% assign participantes_ordenados = participantes_ordenados | sort_natural: "blog" %}

<div id="topo" class="indice-alfabetico">
  
  {% comment %} Captura as letras existentes de forma mais segura {% endcomment %}
  {% assign letras_existentes = "" %}
  {% for blog in participantes_ordenados %}
    {% assign primeira = blog.blog | slice: 0 | upcase %}
    {% assign alfabeto_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" %}
    
    {% if alfabeto_string contains primeira %}
      {% assign letras_existentes = letras_existentes | append: primeira | append: "," %}
    {% else %}
      {% assign letras_existentes = letras_existentes | append: "#" | append: "," %}
    {% endif %}
  {% endfor %}

  {% assign alfabeto = "#,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z" | split: "," %}

  {% for letra in alfabeto %}
    {% if letras_existentes contains letra %}
      <a href="#letra-{{ letra }}"  class="link-indice">{{ letra }}</a>
    {% else %}
      <span class="link-nao-indice">{{ letra }}</span>
    {% endif %}
  {% endfor %}
</div>

<p class="contador-participantes">
  Somos <strong>{{ participantes_ordenados | size }}</strong> participantes na comunidade!
</p>

{% include webring.html %}


<ul>
  {% assign grupo_atual = "" %}

  {% for blog in participantes_ordenados %}
    {% assign char = blog.blog | slice: 0 | upcase %}
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

  <li class="blog-blog">
  <a href="{{ blog.url }}">{{ blog.blog }}</a>
      {% if blog.feed and blog.feed != "" %}
  <a href="{{ blog.feed }}" title="Feed RSS" class="blog-rss"> (RSS)</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>

Se você quiser acompanhar todos os blogs de uma vez disponibilizamos o feed global do ENTREBLOGS onde você pode adicionar todos os blogs no seu leitor de RSS.  

Divirta-se!

<div class="rss-box">
  <p></p>
    <b>https://entreblogs.com.br/feed-entreblogs.xml</b>
  <small><p>Importe no seu leitor de RSS favorito.</p>
  <p>Não sabe o que é um feed? <a href="https://aboutfeeds-com.translate.goog/?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=wapp%20Traduzido%20para%20o%20portugu%C3%AAs">Descubra aqui.</a></p></small>
</div>