---
layout: projeto
type: posts
title: Amigo Segreto (2026)
description: Junho de 2026
permalink: /posts/amigo-secreto-2026/
---

Essa é a primeira vez que vamos realizar o nosso primeiro amigo secreto.

<h3>Primeira parte</h3>: 
Escolher o post que o seu amigo secreto vai postar. 
Pode ser sobre qualquer tema, assunto, interesse. Não tem regras, desde que seja respeitoso. 
Também nesse post deve ter quem foi o escolhido dessa pessoa, para assim conseguirmos fazer a corrente pulando de blog em blog.

Exemplo: 

Pessoa A, tirou a pessoa B, a pessoa B tem que postar o que a A escolheu e no final do seu post indicar que tirou a pessoa C.


<h3>Segunda parte</h3>: 
Fazer um presentinho para o seu amigo oculto. 
A ideia é criar um arquivo digital .zip, uma página web, um moodboard, um texto, uma fotografia, uma playlist, video, filme, 
qualquer coisa que você ache que essa pessoa gostaria de ganhar. 

Importante que o arquivo .zip esteja com senha para ninguém abrir antes.
Os arquivos vão ser adicionados no drive do projeto, assim todo mundo conseguiria acessar e ver quem ganhou o que.

- O sorteio vai ser feito através do site Amigo Secreto, <a href="https://amigosecreto.com.br/grupo/entreblogs-2026</a> clique aqui para participar do grupo.
<h4>Blogs participantes:</h4>

<ul class="link-temas">
  {% assign posts_do_tema = site.data.temas | where: "tema", page.title %}
  {% for item in posts_do_tema %}
    <li><a href="{{ item.url }}">{{ item.nome }}</a></li>
  {% endfor %}
</ul>
