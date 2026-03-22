---
layout: default
title: Update dos Docs
description: Atualização de participação.
permalink: /como-atualizar/
---

Nosso site é estático e, para organizar as participações da comunidade, utilizamos documentos compartilhados no Google Docs como um banco de dados colaborativo.

Cada participante alimentará esses documentos com seus links, seguindo um modelo simples, e a partir disso atualizaremos o repositório do site semanalmente (geralmente aos finais de semana).  

**É novo integrante da comunidade ou já participou de algum tema?**

<blockquote class="fleabag"><a href="https://tinyurl.com/docsentreblogs">Acesse nosso Drive</a> e atualize o documento que deseja para que sua participação apareça na próxima atualização conforme orientações abaixo.</blockquote>

---

Como atualizar os documentos

Utilizamos documentos compartilhados como uma base de dados colaborativa para atualizar o site.
Você não precisa saber programação nem conhecer YAML para participar. Basta copiar um modelo pronto, colar no lugar certo e trocar apenas algumas informações.

Temos tipos diferentes de listas. Abaixo está o passo a passo para cada uma.

1. Lista de participantes

Essa lista reúne os blogs participantes da comunidade.

Cada item contém:

blog → nome do blog
url → link principal do blog
feed → link do feed do blog
Modelo
- blog: "Nome do blog"
  url: "https://seudominio.com/"
  feed: "https://seudominio.com/feed/"
Onde adicionar

Na lista de participantes, adicione sempre no começo do documento, logo abaixo do aviso inicial.

Isso é pedido apenas para facilitar a organização do arquivo.
Na página do site, a ordem final continua sendo alfabética.

Passo a passo
1. Abra o documento de participantes

Localize a lista onde estão os blogs já cadastrados.

2. Vá até o começo da lista

Adicione seu blog no início, antes dos demais itens.

3. Copie este modelo
- blog: "Nome do blog"
  url: "https://seudominio.com/"
  feed: "https://seudominio.com/feed/"
4. Preencha com seus dados

Exemplo:

- blog: "Meu Blog"
  url: "https://meublog.com/"
  feed: "https://meublog.com/feed/"
5. Confira a formatação

Mantenha:

o hífen - no começo
as aspas
os espaços antes de url e feed
Exemplo visual
Antes
# --- ADICIONE SEMPRE NO COMEÇO PARA FACILITAR, NÃO FAZ DIFERENÇA JÁ QUE A PÁGINA É EM ORDEM ALFABÉTICA – 

- blog: "BMRTT"
  url: "https://bamoretti.com"
  feed: "https://feeds.feedburner.com/bamoretti"

- blog: "IGOR MEDEIROZ"
  url: "http://igormedeiroz.blogspot.com"
  feed: "https://feeds.feedburner.com/igormedeiroz"
Depois
# --- ADICIONE SEMPRE NO COMEÇO PARA FACILITAR, NÃO FAZ DIFERENÇA JÁ QUE A PÁGINA É EM ORDEM ALFABÉTICA – 

- blog: "Meu Blog"
  url: "https://meublog.com/"
  feed: "https://meublog.com/feed/"

- blog: "BMRTT"
  url: "https://bamoretti.com"
  feed: "https://feeds.feedburner.com/bamoretti"

- blog: "IGOR MEDEIROZ"
  url: "http://igormedeiroz.blogspot.com"
  feed: "https://feeds.feedburner.com/igormedeiroz"
2. Lista de temas

Essa lista reúne os links publicados em cada tema da comunidade.

Cada item contém:

tema → nome do tema
nome → nome do blog participante
url → link da postagem
Estrutura do documento

Cada tema possui um bloco próprio, marcado por início e final.

Exemplo:

# --- INÍCIO TEMA Uma semana comigo ---
- tema: "Uma semana comigo"
  nome: "Caderninho"
  url: "https://jhoteotonio.blogspot.com/2026/03/uma-semana-comigo.html"

# --- FINAL TEMA Uma semana comigo ---

Sua participação deve ser adicionada dentro do bloco do tema correspondente.

Modelo
- tema: "Nome do tema"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
Passo a passo
1. Abra o documento de temas

Procure o tema em que você participou.

2. Localize o bloco correto

Você deve encontrar algo assim:

# --- INÍCIO TEMA Nome do tema ---

e mais abaixo:

# --- FINAL TEMA Nome do tema ---
3. Copie este modelo
- tema: "Nome do tema"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
4. Preencha com seus dados

Exemplo:

- tema: "Uma semana comigo"
  nome: "Meu Blog"
  url: "https://meublog.com/uma-semana-comigo"
5. Cole dentro do bloco do tema

Adicione sua participação entre o início e o final do tema.

Exemplo visual
Antes
# --- INÍCIO TEMA Uma semana comigo ---
- tema: "Uma semana comigo"
  nome: "Caderninho"
  url: "https://jhoteotonio.blogspot.com/2026/03/uma-semana-comigo.html"

# --- FINAL TEMA Uma semana comigo ---
Depois
# --- INÍCIO TEMA Uma semana comigo ---
- tema: "Uma semana comigo"
  nome: "Caderninho"
  url: "https://jhoteotonio.blogspot.com/2026/03/uma-semana-comigo.html"

- tema: "Uma semana comigo"
  nome: "Meu Blog"
  url: "https://meublog.com/uma-semana-comigo"

# --- FINAL TEMA Uma semana comigo ---

Regras importantes para qualquer documento
copie sempre um modelo já pronto
troque apenas as informações entre aspas
não apague participações já existentes
não altere títulos de blocos ou avisos do arquivo
mantenha os espaços e quebras de linha
use o link completo, começando com https://
