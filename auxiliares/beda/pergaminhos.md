---
layout: beda
title: D&B - Pergaminhos
permalink: /beda/2026/pergaminhos
---

<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jim+Nightshade&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="180x180" href="https://entreblogs.com.br/assets/favicon/selo_1_marron.png">
<link rel="icon" type="image/png" sizes="32x32" href="https://entreblogs.com.br/assets/favicon/selo_1_marron.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://entreblogs.com.br/assets/favicon/selo_1_marron.png">

<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="..\..\style\beda2026-pergaminhos.css">

</head>

<body>

<div class="container">


    <img
        src="../../assets/beda/pena-pergaminho.png"
        alt="BEDA 2026"
        class="logo-beda-pergaminho"
    >
	
    <img
        src="../../assets/beda/titulo.png"
        alt="BEDA 2026"
        class="logo-beda"
    >
	

<!-- =========================================================
     D&B 2026 - PERGAMINHOS (Biblioteca Eterna)
     Bloco unico para colar numa pagina do Blogger (vista HTML).
     Contem CSS + HTML + JS. Nao precisa de ficheiros externos.

     Para personalizar, mexa apenas no bloco :root do CSS
     e nas constantes do bloco CONFIG do JavaScript.
     ========================================================= -->

<style>
/* =========================================================
   1. VARIAVEIS
   Herda as variaveis globais do blog quando existem
   (--marrom-claro, --marrom-escuro, --amarelo, etc.) e
   define um valor de reserva para o caso de faltarem.
   ========================================================= */
.beda-perg{
  /* -- Cores -- */
  --perg-tinta:       var(--marrom-escuro, #332018);
  --perg-tinta-fraca: var(--marrom-medio, rgb(161,125,89));
  --perg-linha:       var(--marrom-claro, rgb(207,180,139));
  --perg-realce:      var(--marrom-escuro, #332018);
  --perg-ouro:        var(--amarelo, #d6b25e);

  /* Fundos: pergaminho claro para os blocos, um tom acima
     para os cabecalhos e para a linha sob o cursor. */
  --perg-fundo:       #f5ecdc;
  --perg-fundo-alt:   #ece0cb;

  /* -- Tipografia -- */
  --perg-fonte:     var(--fonte-corpo, "Special Elite", monospace);
  --perg-fonte-tit: var(--fonte-titulo, "Jim Nightshade", cursive);

  /* -- Forma -- */
  --perg-raio:   3px;
  --perg-espaco: var(--espacamento-padrao, 16px);

  color: var(--perg-tinta);
  font-family: var(--perg-fonte);
  line-height: 1.6;
}

.beda-perg *{ box-sizing:border-box; }

/* =========================================================
   2. CABECALHO
   ========================================================= */
.beda-perg .perg-titulo{
  margin:0 0 6px;
  font-family:var(--perg-fonte-tit);
  font-size:clamp(30px, 6vw, 46px);
  font-weight:400;
  line-height:1.2;
  text-align:center;
  color:var(--perg-tinta);
}
.beda-perg .perg-subtitulo{
  margin:0 0 var(--perg-espaco);
  text-align:center;
  font-size:13px;
  color:var(--perg-tinta-fraca);
}

/* =========================================================
   3. NAVEGACAO POR DIAS
   A fila inteira assenta num painel; cada numero tem o seu
   proprio fundo por cima dele.
   ========================================================= */
.beda-perg .perg-dias{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:6px;
  margin:0 0 12px;
  padding:var(--perg-espaco);
  background:var(--perg-fundo);
  border:1px solid var(--perg-linha);
  border-radius:var(--perg-raio);
}

.beda-perg .perg-dia{
  position:relative;
  min-width:46px;
  margin:0;
  padding:11px 8px;
  background:var(--perg-fundo-alt);
  border:1px solid var(--perg-linha);
  border-radius:var(--perg-raio);
  font-family:var(--perg-fonte);
  font-size:15px;
  line-height:1;
  color:var(--perg-tinta);
  cursor:pointer;
  transition:background .18s ease, color .18s ease,
             border-color .18s ease, transform .18s ease;
}
.beda-perg .perg-dia:hover:not(:disabled){
  background:var(--perg-linha);
  transform:translateY(-1px);
}
.beda-perg .perg-dia:focus-visible{
  outline:2px solid var(--perg-realce);
  outline-offset:2px;
}
.beda-perg .perg-dia.ativo{
  background:var(--perg-realce);
  border-color:var(--perg-realce);
  color:var(--perg-ouro);
}
.beda-perg .perg-dia.vazio{
  background:transparent;
  border-style:dashed;
  opacity:.45;
  cursor:default;
}
.beda-perg .perg-dia .perg-qtd{
  position:absolute;
  top:3px; right:5px;
  font-size:9px;
  opacity:.75;
}
.beda-perg .perg-dia.ativo .perg-qtd{ color:var(--perg-ouro); }

.beda-perg .perg-dia-todos{
  min-width:auto;
  padding-left:16px; padding-right:16px;
  font-size:11px;
  letter-spacing:.1em;
  text-transform:uppercase;
}

.beda-perg .perg-resumo{
  margin:0 0 12px;
  text-align:center;
  font-size:11px;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--perg-tinta-fraca);
}

/* =========================================================
   4. TABELA
   ========================================================= */
.beda-perg .perg-wrap{
  width:100%;
  overflow-x:auto;
  background:var(--perg-fundo);
  border:1px solid var(--perg-linha);
  border-radius:var(--perg-raio);
}

.beda-perg table{
  width:100%;
  border-collapse:collapse;
  background:transparent;
  font-size:14px;
}
.beda-perg thead th{
  padding:12px 14px;
  background:var(--perg-fundo-alt);
  border-bottom:2px solid var(--perg-linha);
  text-align:left;
  font-size:11px;
  font-weight:400;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--perg-tinta-fraca);
  white-space:nowrap;
}
.beda-perg tbody td{
  padding:14px;
  border-bottom:1px solid var(--perg-linha);
  vertical-align:top;
}
.beda-perg tbody tr:last-child td{ border-bottom:0; }
.beda-perg tbody tr:hover td{ background:var(--perg-fundo-alt); }

.beda-perg .perg-data{
  white-space:nowrap;
  font-size:12px;
  color:var(--perg-tinta-fraca);
}
.beda-perg .perg-blog{ white-space:nowrap; }
.beda-perg .perg-link{
  color:var(--perg-tinta);
  text-decoration:none;
  border-bottom:1px solid var(--perg-linha);
  transition:border-color .18s ease;
}
.beda-perg .perg-link:hover{ border-bottom-color:var(--perg-realce); }

.beda-perg .perg-aviso{
  padding:44px 14px;
  text-align:center;
  color:var(--perg-tinta-fraca);
}

/* ---------------------------------------------------------
   4b. MARCA DE LEITURA
   O estado fica guardado no localStorage do proprio leitor,
   por isso e privado e nao e partilhado entre dispositivos.
   --------------------------------------------------------- */
.beda-perg .perg-marca{
  flex:0 0 auto;
  width:18px; height:18px;
  margin:2px 10px 0 0;
  padding:0;
  background:transparent;
  border:1px solid var(--perg-linha);
  border-radius:50%;
  font-size:10px;
  line-height:1;
  color:transparent;
  cursor:pointer;
  transition:background .18s ease, border-color .18s ease, color .18s ease;
}
.beda-perg .perg-marca:hover{ border-color:var(--perg-realce); color:var(--perg-linha); }
.beda-perg .perg-marca:focus-visible{ outline:2px solid var(--perg-realce); outline-offset:2px; }

.beda-perg .perg-celula-post{ display:flex; align-items:flex-start; }

.beda-perg tr.lido .perg-marca{
  background:var(--perg-realce);
  border-color:var(--perg-realce);
  color:var(--perg-ouro);
}
.beda-perg tr.lido .perg-link{
  color:var(--perg-tinta-fraca);
  border-bottom-color:transparent;
}
.beda-perg tr.lido .perg-data,
.beda-perg tr.lido .perg-blog{ opacity:.6; }

/* Fallback nativo: links abertos noutra altura ficam esbatidos.
   So valem cores em :visited (restricao de privacidade dos
   navegadores) e, no Chrome recente, so conta se o clique tiver
   partido desta mesma pagina. */
.beda-perg .perg-link:visited{ color:var(--perg-tinta-fraca); }

.beda-perg .perg-limpar{
  margin-left:10px;
  padding:0;
  background:none;
  border:0;
  font-family:var(--perg-fonte);
  font-size:inherit;
  letter-spacing:inherit;
  text-transform:inherit;
  color:var(--perg-tinta-fraca);
  text-decoration:underline;
  cursor:pointer;
}
.beda-perg .perg-limpar:hover{ color:var(--perg-realce); }

/* =========================================================
   5. RESPONSIVO
   No telemovel a fila de dias rola na horizontal e a tabela
   passa a cartoes empilhados, cada um com o seu fundo.
   ========================================================= */
@media (max-width:620px){
  .beda-perg .perg-dias{
    flex-wrap:nowrap;
    justify-content:flex-start;
    overflow-x:auto;
    padding:12px;
    -webkit-overflow-scrolling:touch;
  }
  .beda-perg .perg-dia{ flex:0 0 auto; }

  .beda-perg .perg-wrap{
    background:transparent;
    border:0;
    border-radius:0;
  }
  .beda-perg thead{
    position:absolute;
    width:1px; height:1px;
    overflow:hidden;
    clip:rect(0 0 0 0);
  }
  .beda-perg tbody tr{
    display:block;
    margin-bottom:10px;
    padding:14px;
    background:var(--perg-fundo);
    border:1px solid var(--perg-linha);
    border-radius:var(--perg-raio);
  }
  .beda-perg tbody td{
    display:block;
    padding:2px 0;
    border:0;
  }
  .beda-perg tbody tr:hover td{ background:transparent; }
  .beda-perg .perg-blog{
    font-size:11px;
    letter-spacing:.08em;
    text-transform:uppercase;
    color:var(--perg-tinta-fraca);
  }
}
</style>


<section class="beda-perg">

  <h1 class="perg-titulo">Biblioteca Eterna</h1>
  <p class="perg-subtitulo">Todos os pergaminhos escritos durante a campanha.</p>

  <nav class="perg-dias" id="pergDias" aria-label="Dias do mes"></nav>
  <p class="perg-resumo" id="pergResumo"></p>

  <div class="perg-wrap">
    <table id="pergTabela">
      <thead>
        <tr>
          <th>Data</th>
          <th>Blog</th>
          <th>Postagem</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="perg-aviso" colspan="3">A abrir os pergaminhos...</td></tr>
      </tbody>
    </table>
  </div>

</section>


<script>
//<![CDATA[
(function () {
  "use strict";

  /* =======================================================
     CONFIG  <- ajuste aqui
     ======================================================= */
  var URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=925696643&single=true&output=csv";

  var MES = 8;      // 8 = agosto
  var ANO = 2026;

  var CACHE_MS = 1000 * 60 * 30;      // 30 minutos
  var CACHE_KEY = "beda_perg_" + ANO + "_" + MES;
  var LIDOS_KEY = "beda_perg_lidos_" + ANO + "_" + MES;

  // Nomes das colunas no CSV. Se mudar o formulario, mude aqui.
  var COL_DATA  = "Carimbo de data/hora";
  var COL_BLOG  = "Nome do Blog";
  var COL_POST  = "Postagem";
  var COL_LINK  = "\uD83D\uDD17 Pergaminho";   // "🔗 Pergaminho"

  // O Google Forms grava a data conforme o idioma da folha.
  // "DMA" = 31/12/2026 (portugues) | "MDA" = 12/31/2026 (ingles)
  var FORMATO_DATA = "DMA";

  /* =======================================================
     ESTADO
     ======================================================= */
  var REGISTOS = [];      // todas as linhas do CSV
  var POR_DIA  = {};      // { 1: [...], 2: [...] }
  var DIA_ATIVO = null;   // null = mostrar todos

  var elDias    = document.getElementById("pergDias");
  var elResumo  = document.getElementById("pergResumo");
  var elCorpo   = document.querySelector("#pergTabela tbody");

  var LIDOS = {};   // { url: true }

  /* =======================================================
     MARCAS DE LEITURA
     Guardadas no localStorage deste navegador. Sao privadas:
     ninguem alem do proprio leitor as ve.
     ======================================================= */
  function lerLidos() {
    try { LIDOS = JSON.parse(localStorage.getItem(LIDOS_KEY)) || {}; }
    catch (e) { LIDOS = {}; }
  }

  function gravarLidos() {
    try { localStorage.setItem(LIDOS_KEY, JSON.stringify(LIDOS)); }
    catch (e) { /* modo privado: a marca vale so nesta sessao */ }
  }

  function alternarLido(url, tr, botao) {
    if (LIDOS[url]) { delete LIDOS[url]; } else { LIDOS[url] = true; }
    gravarLidos();
    aplicarLido(url, tr, botao);
    renderDias();          // atualiza a contagem no resumo
  }

  function aplicarLido(url, tr, botao) {
    var lido = !!LIDOS[url];
    tr.classList.toggle("lido", lido);
    botao.textContent = lido ? "\u2713" : "";
    botao.setAttribute("aria-pressed", lido);
    botao.title = lido ? "Marcar como nao lido" : "Marcar como lido";
  }

  /* =======================================================
     CACHE
     ======================================================= */
  function lerCache() {
    try {
      var bruto = localStorage.getItem(CACHE_KEY);
      if (!bruto) return null;
      var o = JSON.parse(bruto);
      return (Date.now() - o.t < CACHE_MS) ? o.d : null;
    } catch (e) { return null; }
  }

  function gravarCache(csv) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: csv })); }
    catch (e) { /* modo privado ou sem espaco: segue sem cache */ }
  }

  /* =======================================================
     CSV
     Parser que respeita aspas, virgulas dentro de aspas
     e quebras de linha dentro de campos.
     ======================================================= */
  function parseCSV(texto) {
    var linhas = [], campo = "", linha = [], dentroAspas = false;
    texto = texto.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    for (var i = 0; i < texto.length; i++) {
      var c = texto[i];

      if (dentroAspas) {
        if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') { dentroAspas = false; }
        else { campo += c; }
      } else {
        if (c === '"') { dentroAspas = true; }
        else if (c === ",") { linha.push(campo); campo = ""; }
        else if (c === "\n") { linha.push(campo); linhas.push(linha); linha = []; campo = ""; }
        else { campo += c; }
      }
    }
    if (campo !== "" || linha.length) { linha.push(campo); linhas.push(linha); }
    return linhas;
  }

  function carregarCSV(csv) {
    var linhas = parseCSV(csv);
    if (!linhas.length) return;

    var cab = linhas.shift().map(function (c) { return c.trim(); });
    REGISTOS = [];

    linhas.forEach(function (cols) {
      if (!cols.length || cols.every(function (c) { return !c.trim(); })) return;
      var o = {};
      cab.forEach(function (nome, i) { o[nome] = (cols[i] || "").trim(); });
      REGISTOS.push(o);
    });
  }

  /* =======================================================
     DATAS
     ======================================================= */
  function converterData(txt) {
    if (!txt) return null;
    var p = txt.trim().split(/\s+/);
    var d = p[0].split(/[\/\-]/);
    var h = (p[1] || "0:0:0").split(":");
    if (d.length < 3) return null;

    var dia, mes;
    if (FORMATO_DATA === "MDA") { mes = +d[0]; dia = +d[1]; }
    else { dia = +d[0]; mes = +d[1]; }

    var ano = +d[2];
    if (ano < 100) ano += 2000;

    var data = new Date(ano, mes - 1, dia, +h[0] || 0, +h[1] || 0, +h[2] || 0);
    return isNaN(data.getTime()) ? null : data;
  }

  function formatarHora(data) {
    if (!data) return "";
    var dd = String(data.getDate()).padStart(2, "0");
    var mm = String(data.getMonth() + 1).padStart(2, "0");
    var hh = String(data.getHours()).padStart(2, "0");
    var mi = String(data.getMinutes()).padStart(2, "0");
    return dd + "/" + mm + " \u00b7 " + hh + ":" + mi;
  }

  function diasNoMes() { return new Date(ANO, MES, 0).getDate(); }

  /* =======================================================
     AGRUPAR
     ======================================================= */
  function agrupar() {
    POR_DIA = {};
    REGISTOS.forEach(function (item) {
      var d = converterData(item[COL_DATA]);
      if (!d || d.getMonth() + 1 !== MES || d.getFullYear() !== ANO) return;
      item._data = d;
      var dia = d.getDate();
      (POR_DIA[dia] = POR_DIA[dia] || []).push(item);
    });

    Object.keys(POR_DIA).forEach(function (k) {
      POR_DIA[k].sort(function (a, b) { return a._data - b._data; });
    });
  }

  /* =======================================================
     RENDER
     ======================================================= */
  function render() {
    renderDias();
    renderTabela();
  }

  function renderDias() {
    elDias.innerHTML = "";

    var total = 0;
    Object.keys(POR_DIA).forEach(function (k) { total += POR_DIA[k].length; });

    // Botao "Todos"
    var todos = document.createElement("button");
    todos.type = "button";
    todos.className = "perg-dia perg-dia-todos" + (DIA_ATIVO === null ? " ativo" : "");
    todos.textContent = "Todos";
    todos.setAttribute("aria-pressed", DIA_ATIVO === null);
    todos.addEventListener("click", function () { escolherDia(null); });
    elDias.appendChild(todos);

    var limite = diasNoMes();
    for (var dia = 1; dia <= limite; dia++) {
      var qtd = (POR_DIA[dia] || []).length;

      var b = document.createElement("button");
      b.type = "button";
      b.className = "perg-dia" + (qtd ? "" : " vazio") + (DIA_ATIVO === dia ? " ativo" : "");
      b.textContent = String(dia).padStart(2, "0");
      b.disabled = !qtd;
      b.setAttribute("aria-pressed", DIA_ATIVO === dia);
      b.title = qtd
        ? qtd + " pergaminho" + (qtd > 1 ? "s" : "")
        : "Nenhum pergaminho neste dia";

      if (qtd) {
        var badge = document.createElement("span");
        badge.className = "perg-qtd";
        badge.textContent = qtd;
        b.appendChild(badge);
      }

      (function (d) {
        b.addEventListener("click", function () { escolherDia(d); });
      })(dia);

      elDias.appendChild(b);
    }

    var visiveis = DIA_ATIVO === null ? total : (POR_DIA[DIA_ATIVO] || []).length;

    var texto = DIA_ATIVO === null
      ? total + " pergaminho" + (total === 1 ? "" : "s") + " no total"
      : "Dia " + String(DIA_ATIVO).padStart(2, "0") + " \u2014 " +
        visiveis + " pergaminho" + (visiveis === 1 ? "" : "s");

    var nLidos = Object.keys(LIDOS).length;
    if (nLidos) texto += " \u00b7 " + nLidos + " lido" + (nLidos === 1 ? "" : "s");

    elResumo.textContent = texto;

    if (nLidos) {
      var limpar = document.createElement("button");
      limpar.type = "button";
      limpar.className = "perg-limpar";
      limpar.textContent = "limpar";
      limpar.addEventListener("click", function () {
        LIDOS = {};
        gravarLidos();
        render();
      });
      elResumo.appendChild(limpar);
    }
  }

  function escolherDia(dia) {
    DIA_ATIVO = dia;
    // Guarda a escolha no endereco, para o link poder ser partilhado.
    if (history.replaceState) {
      history.replaceState(null, "", dia ? "#dia-" + dia : location.pathname);
    }
    render();
  }

  function linhaVazia(texto) {
    elCorpo.innerHTML = "";
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.className = "perg-aviso";
    td.colSpan = 3;
    td.textContent = texto;
    tr.appendChild(td);
    elCorpo.appendChild(tr);
  }

  function renderTabela() {
    var lista;

    if (DIA_ATIVO === null) {
      lista = [];
      Object.keys(POR_DIA)
        .sort(function (a, b) { return a - b; })
        .forEach(function (k) { lista = lista.concat(POR_DIA[k]); });
    } else {
      lista = POR_DIA[DIA_ATIVO] || [];
    }

    if (!lista.length) { linhaVazia("Nenhum pergaminho neste dia."); return; }

    elCorpo.innerHTML = "";

    lista.forEach(function (item) {
      var tr = document.createElement("tr");

      var tdData = document.createElement("td");
      tdData.className = "perg-data";
      tdData.textContent = formatarHora(item._data);

      var tdBlog = document.createElement("td");
      tdBlog.className = "perg-blog";
      tdBlog.textContent = item[COL_BLOG] || "";

      var tdPost = document.createElement("td");
      var link = item[COL_LINK] || "";
      // textContent em vez de innerHTML: o conteudo vem de um formulario
      // publico, por isso nao deve ser interpretado como HTML.
      if (/^https?:\/\//i.test(link)) {
        var celula = document.createElement("div");
        celula.className = "perg-celula-post";

        var marca = document.createElement("button");
        marca.type = "button";
        marca.className = "perg-marca";

        var a = document.createElement("a");
        a.className = "perg-link";
        a.href = link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = item[COL_POST] || link;

        // Abrir o pergaminho marca-o como lido.
        (function (url, linha, botao) {
          a.addEventListener("click", function () {
            if (!LIDOS[url]) {
              LIDOS[url] = true;
              gravarLidos();
              aplicarLido(url, linha, botao);
              renderDias();
            }
          });
          botao.addEventListener("click", function () {
            alternarLido(url, linha, botao);
          });
          aplicarLido(url, linha, botao);
        })(link, tr, marca);

        celula.appendChild(marca);
        celula.appendChild(a);
        tdPost.appendChild(celula);
      } else {
        tdPost.textContent = item[COL_POST] || "";
      }

      tr.appendChild(tdData);
      tr.appendChild(tdBlog);
      tr.appendChild(tdPost);
      elCorpo.appendChild(tr);
    });
  }

  /* =======================================================
     ARRANQUE
     ======================================================= */
  function processar(csv) {
    carregarCSV(csv);
    agrupar();
    render();
  }

  function iniciar() {
    var m = location.hash.match(/^#dia-(\d{1,2})$/);
    if (m) DIA_ATIVO = Number(m[1]);

    lerLidos();

    // 1. Mostra o cache de imediato, se existir.
    var cache = lerCache();
    if (cache) { try { processar(cache); } catch (e) {} }

    // 2. Vai buscar a versao mais recente e volta a desenhar.
    fetch(URL_CSV, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(function (csv) {
        gravarCache(csv);
        processar(csv);
      })
      .catch(function (err) {
        console.error("Pergaminhos:", err);
        if (!cache) linhaVazia("Nao foi possivel abrir os pergaminhos. Tente recarregar a pagina.");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
//]]>
</script>

</div>

</body>

</html>
