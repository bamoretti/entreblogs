---
layout: default
title: Update dos Docs
description: Atualização de participação.
permalink: /como-atualizar/
---

Nosso site é estático e utilizamos o Google docs para reunir as informações alimentadas pelos próprios participantes e atualizar nosso repositório semanalmente (geralmente aos finais de semana).

- leitura
- participantes
- tags
- temas
- tutoriais

**É novo integrante da comunidade ou já participou de algum tema?**

<blockquote class="fleabag"><a href="https://tinyurl.com/docsentreblogs">Acesse nosso Drive</a> e atualize o documento em questão para que sua participação apareça na próxima atualização.</blockquote>
---

<h4>Como adicionar seu link de participação</h4>

Este arquivo é apenas uma lista organizada com:

* o **nome do livro**
* o **nome do blog participante**
* o **link da postagem**

O formato utilizado chama-se **YAML**, mas você **não precisa conhecer YAML** nem saber programar para editar.
Basta **copiar um modelo pronto** e substituir apenas algumas informações.

---

<h4>Estrutura do arquivo</h4>

Cada livro possui um bloco próprio:

```yaml
# --- INÍCIO Nome do Livro ---
...
# --- FINAL Nome do Livro ---
```

Sua participação deve ser adicionada **entre o INÍCIO e o FINAL do livro correspondente**.

---

<h4>Modelo de participação</h4>

Copie o modelo abaixo:

```yaml
- livro: "Nome do Livro • Nome da autora"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
```

Substitua apenas o que está entre aspas:

* **Nome do Livro • Nome da autora**
* **Nome do seu blog**
* **link da sua postagem**

---

<h4>Passo a passo</h4>

### 1. Localize o livro

Procure no arquivo o bloco com o nome do livro da sua leitura:

```yaml
# --- INÍCIO Nome do Livro ---
```

### 2. Copie o modelo de participação

Use este modelo:

```yaml
- livro: "Nome do Livro • Nome da autora"
  nome: "Nome do seu blog"
  url: "https://link-da-sua-postagem.com"
```

### 3. Preencha suas informações

Exemplo:

```yaml
- livro: "Nome do Livro • Nome da autora"
  nome: "Meu Blog"
  url: "https://meublog.com/minha-postagem"
```

### 4. Cole dentro do bloco do livro

Exemplo final:

```yaml
# --- INÍCIO Nome do Livro ---

- livro: "Nome do Livro • Nome da autora"
  nome: "Blog Exemplo"
  url: "https://exemplo.com/post"

- livro: "Nome do Livro • Nome da autora"
  nome: "Meu Blog"
  url: "https://meublog.com/minha-postagem"

# --- FINAL Nome do Livro ---
```

---

<h4>Regras importantes</h4>

* adicionar sua participação **somente dentro do bloco do livro**
* manter a formatação igual ao modelo
* não alterar participações já existentes
* não remover as aspas `" "`
* usar o link completo (começando com `https://`)
* manter os espaços antes de `nome` e `url`

---

<h4>Resumindo</h4>

Você só precisa:

1. encontrar o livro correto
2. copiar o modelo
3. trocar nome e link
4. colar dentro do bloco do livro

Não é necessário conhecimento em YAML ou programação.
