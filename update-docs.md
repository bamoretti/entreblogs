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

<h4>Como atualizar os documentos</h4>

Os documentos do projeto funcionam como uma base de dados colaborativa.  
É neles que os participantes adicionam seus links para que o site seja atualizado depois.

Você **não precisa saber YAML nem programação**.  
Basta copiar um bloco pronto, colar no lugar certo e trocar as informações.

---

<h4>Antes de começar</h4>

Cada documento segue um modelo.

Você só precisa:

* encontrar o lugar certo
* copiar um bloco de exemplo
* trocar nome e link
* colar no documento

---

<h4>Bloco = modelo pronto</h4>

Um bloco é apenas um pequeno trecho já formatado, como este:

```- tema: "Nome do tema"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
```

Ou este:

```- blog: "Nome do blog"
  url: "https://seudominio.com/"
  feed: "https://seudominio.com/feed/"
```

Você não precisa montar isso do zero.
É só copiar e substituir o que está entre aspas.

<h4>1. Para adicionar seu blog na lista de participantes</h4>

Use este bloco:

```- blog: "Nome do blog"
  url: "https://seudominio.com/"
  feed: "https://seudominio.com/feed/"
```
<h4>Passo a passo</h4>

1. Abra o documento de participantes.

2. Vá até o começo da lista.

3. Cole seu bloco no início do documento.

4. Troque pelos seus dados:

nome do blog
link do blog
link do feed

<h4>Exemplo preenchido</h4>

```- blog: "Meu Blog"
  url: "https://meublog.com/"
  feed: "https://meublog.com/feed/"
```
<h4>2. Para adicionar sua postagem em um tema</h4>

Use este bloco:

```- tema: "Nome do tema"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
```
<h4>Passo a passo</h4>

1. Abra o documento de temas.

2. Procure o bloco do tema em que você participou.

Você verá algo assim:

```# --- INÍCIO TEMA Nome do tema ---
...
# --- FINAL TEMA Nome do tema ---
```

3. Cole sua participação entre o início e o final do tema.

4. Troque pelos seus dados:

nome do tema
nome do blog
link da postagem

<h4>Exemplo preenchido</h4>

```- tema: "Uma semana comigo"
  nome: "Meu Blog"
  url: "https://meublog.com/uma-semana-comigo"
```

<h4>Onde colar</h4>

Na lista de participantes: cole no começo da lista.

Na lista de temas: cole dentro do bloco do tema correspondente.

<h4>Cuidados importantes</h4>
não apagar participações já existentes
não alterar os títulos dos blocos
manter os espaços e as quebras de linha
manter as aspas
usar o link completo, começando com https://
<h4>Resumo rápido</h4>

Participantes

```- blog: "Nome do blog"
  url: "https://seudominio.com/"
  feed: "https://seudominio.com/feed/"
```

Temas

```- tema: "Nome do tema"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
```

Você só precisa copiar, colar no lugar certo e substituir as informações.
