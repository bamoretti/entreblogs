---
layout: default
title: "Entreblogs-Webring"
description: Como adicionar o webring ao seu blog
permalink: /webring/
---

O **Webring do ENTREBLOGS** é uma iniciativa para conectar blogs independentes através de uma rede de navegação mútua. Ao instalar este widget, você cria uma ponte entre os seus leitores e outros produtores de conteúdo da nossa comunidade.

Este guia contém o passo a passo completo para implementação.

---

### 1. Entendendo o Funcionamento
O webring funciona de forma centralizada para a lógica e descentralizada para o visual:
* **A Inteligência:** Os scripts hospedados no repositório central cuidam da lista de membros e calculam quem são os sites vizinhos.
* **O Visual:** Você tem total liberdade para estilizar o widget usando o CSS do seu próprio blog, garantindo que ele não pareça um "corpo estranho" no seu design.

---

### 2. Copie o Código HTML
Escolha o local onde deseja que o widget apareça (recomendamos o arquivo de rodapé ou `footer.html`):

<details><summary>Blogs em Jekyll</summary>
<p>Em blogs ou sites em Jekyll você só precisa escolher e colocar o código que criará a barra de navegação e o <code>script</code> que chama os dados onde quiser que ela fique.</p>

<code><pre>

&lt;section id="entreblogs-webring">
  &lt;div class="entreblogs-title">Webring do ENTREBLOGS</div>

  &lt;nav class="pagination">
    &lt;a href="#" class="eb-prev nav-recente">« Anterior</a>
    &lt;a href="#" class="eb-random nav-topo">Aleatório</a>
    &lt;a href="#" class="eb-next nav-anterior">Próximo »</a>
  </nav>

&lt;div class="entreblogs-footer">
    &lt;a class="eb-info" href="https://pt.wikipedia.org/wiki/Webring">O que é isso?</a>
</div>

  &lt;script src="https://entreblogs.com.br/assets/webrings/onionring-variables.js"></script>
  &lt;script src="https://entreblogs.com.br//assets/webrings/onionring-widget.js"></script>
</section&gt;

</pre></code>
</details>

<details><summary>Blogs no Blogger</summary>
<p>Para blogs contruídos na plataforma do BLogger precisamos colocar parte do código na antes da tag <code></head></code> e colocar o código que criará a barra de navegação onde quiser que ela fique.</p>

<p>Código para colocar antes do <code></head></code>, que é o <code>script</code> que chama os dados:</p>
<code><pre>

  &lt;script src="https://entreblogs.com.br/assets/webrings/onionring-variables.js"></script&gt;
  &lt;script src="https://entreblogs.com.br/assets/webrings/onionring-widget.js"></script&gt;

</pre></code>

O código da barra de navegação que você coloca onde quiser que ela apareça:
<code><pre>

&lt;section id="entreblogs-webring">
  &lt;div class="entreblogs-title">Webring do ENTREBLOGS</div>

  &lt;nav class="pagination">
    &lt;a href="#" class="eb-prev nav-recente">« Anterior</a>
    &lt;a href="#" class="eb-random nav-topo">Aleatório</a>
    &lt;a href="#" class="eb-next nav-anterior">Próximo »</a>
  </nav>

&lt;div class="entreblogs-footer">
    &lt;a class="eb-info" href="https://pt.wikipedia.org/wiki/Webring">O que é isso?</a>
</div>
</section&gt;

</pre></code>
</details>

### 3. Personalize o Visual (CSS)
Para que o webring combine com o design do seu blog, adicione o código abaixo ao seu arquivo de estilos (`.css` ou `.scss`).  

Você deve alterar as variáveis de cores, distâncias, fontes e afins para as que o seu site utiliza.  

**Não altere o nome das classes, o <code>script</code> usa estas classes exatas para identificar onde injetar as URL.**

CSS  
```CSS  
/* Customização do Webring */  
#entreblogs-webring {  
  margin: 40px auto;  
  padding: 20px;  
  border: 1px solid var(--color-link); /* Exemplo usando sua variável de cor */  
  border-radius: 4px;  
  text-align: center;  
  font-family: var(--font-geral);  
}  

.entreblogs-title {  
  font-weight: bold;  
  margin-bottom: 15px;  
  text-transform: uppercase;  
  font-size: 0.8rem;  
  letter-spacing: 1px;  
  color: var(--color-text);  
}  

#entreblogs-webring .pagination {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  width: 100%;  
  margin: 10px 0;  
}  

/* Estilo dos Links do Webring */  
.eb-prev, .eb-next, .eb-random {  
  text-decoration: none;  
  font-weight: 600;  
  color: var(--color-link) !important;  
}  

.eb-prev:hover, .eb-next:hover, .eb-random:hover {  
  color: var(--color-link-hover) !important;  
  text-decoration: underline;  
}

.entreblogs-footer {  
  margin-top: 15px;  
  font-size: 0.7rem;  
  opacity: 0.6;  
}  
```
### 4. O que pode ou não ser editado?

Para garantir a integridade do webring e o funcionamento em todos os blogs, respeite as seguintes diretrizes:

| Elemento | Pode editar? | Observação |
| :--- | :--- | :--- |
| **Estilos (Cores, Fontes, Bordas)** | ✅ Sim | Sinta-se livre para adaptar totalmente ao seu layout usando CSS. |
| **Texto dos Links** | ✅ Sim | Pode mudar "Anterior" para "Voltar", "Aleatório" para "Sorteio", etc. |
| **Classes HTML** (`eb-prev`, etc) | ❌ **Não** | O script usa estas classes exatas para identificar onde injetar as URLs. |
| **Scripts JS** | ❌ **Não** | Devem carregar da página do _ENTREBLOGS_ para manter a lista de membros sempre atualizada. |

---

### 5. Como ser incluído na lista oficial?

O widget só funcionará plenamente (ativando os links de Anterior/Próximo) quando o seu domínio estiver cadastrado no banco de dados central do projeto.

1.  **Instale o código:** Certifique-se de que o HTML e os Scripts já estão inseridos no seu blog.
2.  **Solicite a inclusão:** Entre em contacto com o pessoal na Comunidade do WhatsApp, no grupo **C:\Users\Tech**, ou pelo [email do coletivo](mailto:coletivoentreblogs@gmail.com?subject=Também quero participar da comunidade).
3.  **Aguarde a atualização:** Assim que o seu site for aprovado e fundido ao repositório principal, o widget passará a reconhecer a sua URL e a navegação circular será ativada automaticamente no seu blog.

---

*Dúvidas ou problemas na integração? Chame no Grupo do WhatsApp **C:\Users\Tech***
