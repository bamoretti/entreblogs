---
layout: default
title: Livro de visitas
description: Deixe sua mensagem para a comunidade.
---

{% for visita in site.data.livro-de-visitas %}

<div style="margin-bottom: 2rem; border-left: 7px solid var(--cor-destaque); padding-left: 15px;">
  {% if visita.site %}
    <a href="{{ visita.site }}">
      <strong>{{ visita.nome }}</strong>
    </a>
  {% else %}
    <strong>{{ visita.nome }}</strong>
  {% endif %}

<small style="opacity: 0.7;">({{ visita.data }})</small>

  <div class="mensagem-conteudo">
    {{ visita.mensagem | newline_to_br }}
  </div>
</div>

{% endfor %}

{% include formulario.html %}
