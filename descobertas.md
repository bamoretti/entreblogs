---
layout: default
title: Ideias para uma postagem
description: Uma postagem aleatória de outros participantes para te inspirar
---

<div id="discovery-container" style="margin: 2rem auto; max-width: 49rem; padding: 0 10px; font-family: var(--fonte-geral);">
  
  <div id="post-card" style="background-color: var(--cor-moldura); border: 2px solid var(--cor-texto); border-radius: 5px; padding: 25px; min-height: 280px; display: flex; flex-direction: column; position: relative; color: var(--cor-texto)">
    
<div style="display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.2); padding-bottom: 10px;">
        <span id="post-author" style="color: #000 !important; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">Aguardando sorteio...</span>
        <span style="color: var(--cor-texto); font-size: 0.8rem;">● ● ●</span>
</div>

<h4 id="post-title" style="color: var(--cor-texto); margin-top: 0; margin-bottom: 15px; text-align: left; font-weight: bold;">
        Clique no dado para buscar uma postagem
</h4>

<div id="post-excerpt" style="color: var(--cor-texto); font-size: 1rem; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
        O conteúdo aparecerá aqui.
</div>

<a id="post-link" href="#" target="_blank" class="btn-terminal" style="display: none; align-self: flex-start; background-color: var(--cor-destaque); color: var(--cor-texto); text-align: center; width: auto; padding: 10px 20px; border: 2px solid #000; text-decoration: none;">
        LER POSTAGEM COMPLETA
</a>
</div>

<div style="text-align: center; margin-top: 30px;">
    <button id="refresh-btn" onclick="fetchRandomPost()" class="btn-terminal" style="background-color: var(--cor-moldura); color: var(--cor-texto); border: 2px solid var(--cor-texto); cursor: pointer; width: auto; min-width: 250px; font-family: var(--fonte-geral);">
        🎲 VER OUTRA POSTAGEM
    </button>
</div>

</div>

<script>
const participantes = {{ site.data.participantes | jsonify }};

async function fetchRandomPost(tentativas = 0) {
    const btn = document.getElementById('refresh-btn');
    const titleEl = document.getElementById('post-title');
    const authorEl = document.getElementById('post-author');
    const excerptEl = document.getElementById('post-excerpt');
    const linkEl = document.getElementById('post-link');

    // Evita recursão infinita se todos os feeds falharem
    if (tentativas > 3) {
        titleEl.innerText = "OPS! ALGO DEU ERRADO";
        excerptEl.innerText = "Não conseguimos conectar aos blogs no momento. Tente atualizar a página.";
        btn.disabled = false;
        return;
    }

    btn.disabled = true;
    btn.innerText = "BUSCANDO...";
    
    const sorteado = participantes[Math.floor(Math.random() * participantes.length)];
    
    // Força HTTPS no feed para evitar bloqueios de segurança
    let feedUrl = sorteado.feed.replace("http://", "https://");
    const rssApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    try {
        const response = await fetch(rssApi);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const post = data.items[Math.floor(Math.random() * data.items.length)];

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.description || post.content;
            const textOnly = tempDiv.textContent || tempDiv.innerText || "";

            titleEl.innerText = post.title;
            authorEl.innerText = `BLOG: ${sorteado.blog}`;
            excerptEl.innerText = textOnly.substring(0, 200) + "...";
            linkEl.href = post.link;
            linkEl.style.display = "inline-block";
            
            btn.disabled = false;
            btn.innerText = "🎲 VER OUTRA POSTAGEM";
        } else {
            console.warn(`Falha no feed: ${sorteado.blog}. Tentando outro...`);
            fetchRandomPost(tentativas + 1);
        }
    } catch (e) {
        console.error("Erro na requisição:", e);
        fetchRandomPost(tentativas + 1);
    }
}

window.onload = () => fetchRandomPost();
</script>