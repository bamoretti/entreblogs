---
layout: beda
title: D&B - Os Guardiões da Blogosfera
permalink: /testes/
---

<html lang="pt">
<head>


<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jim+Nightshade&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">

<link rel="icon" type="image/png" href="/assets/favicon/selo_1_marron.png">
<link rel="apple-touch-icon" href="/assets/favicon/selo_1_marron.png"> 

<link rel="manifest" href="/site.webmanifest">

<link rel="stylesheet" href="..\style\beda2026-painel.css">

<style>

</style>

</head>

<body>

<button id="abrir-participantes" class="btn-participantes">
    🧙 Ver todos os aventureiros
</button>

<!-- ==========================================================
     POPUP DOS PARTICIPANTES
========================================================== -->

<div id="popup-participantes" class="popup-participantes">

    <div class="popup-overlay"></div>

    <div class="popup-conteudo">

        <button
            id="fechar-participantes"
            class="popup-fechar"
            aria-label="Fechar"
        >
            ×
        </button>

        <div class="popup-cabecalho">

            <span class="popup-ornamento">✦</span>

            <h2>
                Aventureiros da Blogosfera
            </h2>

            <p>
                Aqueles que aceitaram o chamado e partiram
                em busca das histórias esquecidas.
            </p>

        </div>

        <div
            id="lista-participantes"
            class="lista-participantes"
        >

            <div class="participantes-carregando">
                Consultando os registros da Biblioteca Eterna...
            </div>

        </div>

    </div>

</div>

<style>
  /* ==========================================================
   BOTÃO PARTICIPANTES
========================================================== */

.btn-participantes{

    display:inline-block;

    padding:12px 22px;

    border:2px solid var(--marrom-medio);

    border-radius:30px;

    background:var(--marrom-escuro);

    color:var(--marrom-claro);

    font-family:var(--fonte-corpo);

    font-size:var(--fonte-corpo-size);

    cursor:pointer;

    transition:
        transform .2s ease,
        background .2s ease,
        box-shadow .2s ease;

}

.btn-participantes:hover{

    background:var(--marrom-medio);

    transform:translateY(-2px);

    box-shadow:
        0 8px 20px rgba(0,0,0,.20);

}


/* ==========================================================
   POPUP
========================================================== */

.popup-participantes{

    position:fixed;

    inset:0;

    z-index:99999;

    display:none;

}

.popup-participantes.aberto{

    display:flex;

    align-items:center;

    justify-content:center;

}


/* ==========================================================
   FUNDO ESCURO
========================================================== */

.popup-overlay{

    position:absolute;

    inset:0;

    background:rgba(30,18,12,.72);

    backdrop-filter:blur(4px);

}
  
.participante-classe {
    display: block;
    margin-top: 6px;
    margin-bottom: 10px;
    font-family: var(--fonte-corpo);
    font-size: .78rem;
    line-height: 1.3;
    color: var(--marrom-medio);
    font-style: italic;
}

.tooltip-jornada{
  margin-top: 10px;
  text-align:center;
}

/* ==========================================================
   CAIXA
========================================================== */

.popup-conteudo{

    position:relative;

    z-index:2;

    width:min(1000px,92vw);

    max-height:88vh;

    overflow-y:auto;

    padding:40px;

    background:

        linear-gradient(
            rgba(255,248,230,.96),
            rgba(239,222,190,.96)
        );

    border:2px solid var(--marrom-medio);

    border-radius:24px;

    box-shadow:
        0 25px 70px rgba(0,0,0,.45);

    animation:
        abrir-popup .25s ease;

}


/* ==========================================================
   ANIMAÇÃO
========================================================== */

@keyframes abrir-popup{

    from{

        opacity:0;

        transform:
            translateY(20px)
            scale(.97);

    }

    to{

        opacity:1;

        transform:
            translateY(0)
            scale(1);

    }

}


/* ==========================================================
   BOTÃO FECHAR
========================================================== */

.popup-fechar{

    position:absolute;

    top:15px;

    right:18px;

    width:38px;

    height:38px;

    border:1px solid var(--marrom-medio);

    border-radius:50%;

    background:transparent;

    color:var(--marrom-escuro);

    font-family:Arial,sans-serif;

    font-size:28px;

    line-height:30px;

    cursor:pointer;

    transition:.2s;

}

.popup-fechar:hover{

    background:var(--marrom-escuro);

    color:var(--marrom-claro);

    transform:rotate(90deg);

}


/* ==========================================================
   CABEÇALHO
========================================================== */

.popup-cabecalho{

    text-align:center;

    margin-bottom:30px;

    padding:0 30px;

}

.popup-cabecalho h2{

    margin:5px 0 10px;

    font-family:var(--fonte-titulo);

    font-size:3rem;

    font-weight:400;

    color:var(--marrom-escuro);

}

.popup-cabecalho p{

    max-width:600px;

    margin:0 auto;

    font-family:var(--fonte-corpo);

    font-size:.95rem;

    line-height:1.6;

    color:var(--marrom-escuro);

}

.popup-ornamento{

    display:block;

    color:var(--amarelo);

    font-size:1.7rem;

}


/* ==========================================================
   LISTA
========================================================== */

.lista-participantes{

    display:grid;

    grid-template-columns:
        repeat(auto-fill,minmax(130px,1fr));

    gap:30px 20px;

    justify-items:center;

}


/* ==========================================================
   PARTICIPANTE
========================================================== */

.participante{

    position:relative;

    width:130px;

    text-align:center;

    cursor:pointer;

}


/* ==========================================================
   AVATAR
========================================================== */

.participante-avatar{

    position:relative;

    width:105px;

    height:105px;

    margin:0 auto 12px;

    border-radius:50%;

    overflow:hidden;

    border:3px solid var(--marrom-medio);

    background:var(--marrom-claro);

    box-shadow:
        0 6px 15px rgba(0,0,0,.18);

    transition:
        transform .25s ease,
        border-color .25s ease,
        box-shadow .25s ease;

}

.participante:hover
.participante-avatar{

    transform:
        translateY(-5px)
        scale(1.05);

    border-color:var(--amarelo);

    box-shadow:
        0 10px 25px rgba(0,0,0,.25);

}

.participante-avatar img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}


/* ==========================================================
   NOME
========================================================== */

.participante-nome{

    display:block;

    font-family:var(--fonte-corpo);

    font-size:.9rem;

    line-height:1.3;

    color:var(--marrom-escuro);

    overflow-wrap:anywhere;

}


/* ==========================================================
   DESCRIÇÃO / TOOLTIP
========================================================== */

.participante-descricao{

    position:absolute;

    left:50%;

    bottom:calc(100% - 5px);

    width:230px;

    padding:13px 15px;

    transform:
        translateX(-50%)
        translateY(8px);

    background:var(--marrom-escuro);

    color:var(--marrom-claro);

    border:1px solid var(--amarelo);

    border-radius:12px;

    font-family:var(--fonte-corpo);

    font-size:.82rem;

    line-height:1.5;

    text-align:left;

    opacity:0;

    visibility:hidden;

    pointer-events:none;

    transition:
        opacity .2s ease,
        transform .2s ease;

    z-index:20;

    box-shadow:
        0 10px 30px rgba(0,0,0,.35);

}


/* pequeno triângulo */

.participante-descricao::after{

    content:"";

    position:absolute;

    left:50%;

    bottom:-8px;

    transform:translateX(-50%);

    border-left:8px solid transparent;

    border-right:8px solid transparent;

    border-top:8px solid var(--amarelo);

}


.participante:hover
.participante-descricao{

    opacity:1;

    visibility:visible;

    transform:
        translateX(-50%)
        translateY(0);

}


/* ==========================================================
   CARREGANDO
========================================================== */

.participantes-carregando{

    grid-column:1 / -1;

    padding:40px 20px;

    text-align:center;

    font-family:var(--fonte-corpo);

    color:var(--marrom-escuro);

}


/* ==========================================================
   ERRO
========================================================== */

.participantes-erro{

    grid-column:1 / -1;

    padding:30px;

    text-align:center;

    font-family:var(--fonte-corpo);

    color:var(--marrom-escuro);

}


/* ==========================================================
   MOBILE
========================================================== */

@media(max-width:600px){

    .popup-conteudo{

        width:94vw;

        max-height:90vh;

        padding:30px 18px;

    }

    .popup-cabecalho{

        padding:0 25px;

    }

    .popup-cabecalho h2{

        font-size:2.3rem;

    }

    .lista-participantes{

        grid-template-columns:
            repeat(3,1fr);

        gap:25px 8px;

    }

    .participante{

        width:100px;

    }

    .participante-avatar{

        width:82px;

        height:82px;

    }

    /*
       No celular não existe hover.
       A descrição aparece quando o participante
       recebe a classe "mostrar-descricao".
    */

    .participante.mostrar-descricao
    .participante-descricao{

        opacity:1;

        visibility:visible;

        transform:
            translateX(-50%)
            translateY(0);

    }

}
</style>
<script>
/* ==========================================================
   PARTICIPANTES DA BLOGOSFERA
========================================================== */


/* ==========================================================
   GOOGLE SHEETS
========================================================== */

const URL_PARTICIPANTES =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=2069176218&single=true&output=csv";


/* ==========================================================
   ELEMENTOS
========================================================== */

const popup =
    document.getElementById("popup-participantes");

const abrir =
    document.getElementById("abrir-participantes");

const fechar =
    document.getElementById("fechar-participantes");

const lista =
    document.getElementById("lista-participantes");

const overlay =
    popup
        ? popup.querySelector(".popup-overlay")
        : null;


/* ==========================================================
   ABRIR
========================================================== */

if(abrir){

    abrir.addEventListener(
        "click",
        abrirPopup
    );

}


function abrirPopup(){

    popup.classList.add("aberto");

    document.body.style.overflow =
        "hidden";

    carregarParticipantes();

}


/* ==========================================================
   FECHAR
========================================================== */

if(fechar){

    fechar.addEventListener(
        "click",
        fecharPopup
    );

}


if(overlay){

    overlay.addEventListener(
        "click",
        fecharPopup
    );

}


function fecharPopup(){

    popup.classList.remove(
        "aberto"
    );

    document.body.style.overflow =
        "";

}


/* ==========================================================
   ESC
========================================================== */

document.addEventListener(
    "keydown",
    function(evento){

        if(
            evento.key === "Escape" &&
            popup.classList.contains("aberto")
        ){

            fecharPopup();

        }

    }
);


/* ==========================================================
   CARREGAR PARTICIPANTES
========================================================== */

async function carregarParticipantes(){

    lista.innerHTML = `
        <div class="participantes-carregando">
            Consultando os registros da Biblioteca Eterna...
        </div>
    `;


    try{

        const resposta =
            await fetch(
                URL_PARTICIPANTES,
                {
                    cache: "no-store"
                }
            );


        if(!resposta.ok){

            throw new Error(
                `Erro HTTP: ${resposta.status}`
            );

        }


        const csv =
            await resposta.text();


        const dados =
            csvParaObjetos(csv);


        criarParticipantes(
            dados
        );

    }

    catch(erro){

        console.error(
            "Erro ao carregar participantes:",
            erro
        );


        lista.innerHTML = `
            <div class="participantes-erro">

                Não foi possível consultar os
                aventureiros da Blogosfera.

            </div>
        `;

    }

}


/* ==========================================================
   CSV → OBJETOS
========================================================== */

function csvParaObjetos(csv){

    const linhas =
        separarLinhasCSV(csv);


    if(!linhas.length){

        return [];

    }


    const cabecalhos =
        parseCSVLine(
            linhas[0]
        ).map(
            cabecalho =>
                normalizarTexto(
                    cabecalho
                )
        );


    const dados = [];


    for(
        let i = 1;
        i < linhas.length;
        i++
    ){

        if(
            !linhas[i] ||
            !linhas[i].trim()
        ){

            continue;

        }


        const valores =
            parseCSVLine(
                linhas[i]
            );


        const objeto = {};


        cabecalhos.forEach(
            (
                cabecalho,
                index
            )=>{

                objeto[cabecalho] =
                    valores[index] !== undefined
                        ? valores[index].trim()
                        : "";

            }
        );


        dados.push(
            objeto
        );

    }


    return dados;

}


/* ==========================================================
   SEPARAR LINHAS
========================================================== */

function separarLinhasCSV(csv){

    const linhas = [];

    let atual = "";

    let dentroAspas = false;


    for(
        let i = 0;
        i < csv.length;
        i++
    ){

        const caractere =
            csv[i];


        if(
            caractere === '"'
        ){

            if(
                dentroAspas &&
                csv[i + 1] === '"'
            ){

                atual += '""';

                i++;

                continue;

            }


            dentroAspas =
                !dentroAspas;


            atual +=
                caractere;


            continue;

        }


        if(
            (
                caractere === "\n" ||
                caractere === "\r"
            ) &&
            !dentroAspas
        ){

            if(
                caractere === "\r" &&
                csv[i + 1] === "\n"
            ){

                i++;

            }


            linhas.push(
                atual
            );


            atual = "";

            continue;

        }


        atual +=
            caractere;

    }


    if(atual){

        linhas.push(
            atual
        );

    }


    return linhas;

}


/* ==========================================================
   PARSER CSV
========================================================== */

function parseCSVLine(linha){

    const resultado = [];

    let atual = "";

    let dentroAspas = false;


    for(
        let i = 0;
        i < linha.length;
        i++
    ){

        const caractere =
            linha[i];


        if(
            caractere === '"'
        ){

            if(
                dentroAspas &&
                linha[i + 1] === '"'
            ){

                atual += '"';

                i++;

            }

            else{

                dentroAspas =
                    !dentroAspas;

            }


            continue;

        }


        if(
            caractere === "," &&
            !dentroAspas
        ){

            resultado.push(
                atual
            );

            atual = "";

            continue;

        }


        atual +=
            caractere;

    }


    resultado.push(
        atual
    );


    return resultado;

}


/* ==========================================================
   NORMALIZAR TEXTO
========================================================== */

function normalizarTexto(texto){

    return texto
        .replace(/^\uFEFF/, "")
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/* ==========================================================
   PROCURAR COLUNA
==========================================================

   Agora não dependemos do nome EXATO da coluna.

   Exemplo:

   "🗺️ Jornada"

   vira:

   "jornada"

   e será encontrado normalmente.
========================================================== */

function encontrarCampo(
    objeto,
    termo
){

    const termoNormalizado =
        normalizarTexto(
            termo
        );


    const chave =
        Object.keys(objeto)
            .find(
                chave => {

                    const chaveNormalizada =
                        normalizarTexto(
                            chave
                        );


                    return chaveNormalizada
                        .includes(
                            termoNormalizado
                        );

                }
            );


    if(!chave){

        return "";

    }


    return objeto[chave] || "";

}


/* ==========================================================
   CRIAR PARTICIPANTES
========================================================== */

function criarParticipantes(dados){

    lista.innerHTML = "";


    const participantes =
        dados.filter(
            participante => {

                const nome =
                    encontrarCampo(
                        participante,
                        "nome de aventureiro"
                    );


                return (
                    nome &&
                    nome.trim() !== ""
                );

            }
        );


    if(
        participantes.length === 0
    ){

        lista.innerHTML = `
            <div class="participantes-erro">
                Nenhum aventureiro foi encontrado.
            </div>
        `;

        return;

    }


    participantes.forEach(
        participante => {

            criarParticipante(
                participante
            );

        }
    );

}


/* ==========================================================
   CRIAR PARTICIPANTE
========================================================== */

function criarParticipante(dados){


    /* ======================================================
       DADOS
    ====================================================== */

    const nome =
        encontrarCampo(
            dados,
            "nome de aventureiro"
        ) ||
        "Aventureiro";


    const classe =
        encontrarCampo(
            dados,
            "classe"
        );


    const descricao =
        encontrarCampo(
            dados,
            "descreva sobre seu personagem"
        ) ||
        "Este aventureiro ainda não revelou sua história.";


    const jornada =
        encontrarCampo(
            dados,
            "jornada"
        );


    const avatar =
        encontrarCampo(
            dados,
            "seu avatar"
        );


    const portal =
        encontrarCampo(
            dados,
            "portal de origem"
        );


    /* ======================================================
       DEBUG
    ======================================================

       Se quiser verificar o que está vindo da planilha,
       abra F12 → Console.
    */

    console.log(
        "Aventureiro:",
        nome,
        "| Classe:",
        classe,
        "| Jornada:",
        jornada
    );


    /* ======================================================
       PARTICIPANTE
    ====================================================== */

    const participante =
        document.createElement("div");

    participante.className =
        "participante";


    /* ======================================================
       AVATAR
    ====================================================== */

    const avatarContainer =
        document.createElement("div");

    avatarContainer.className =
        "participante-avatar";


    if(avatar){

        const imagem =
            document.createElement("img");


        imagem.src =
            converterImagemDrive(
                avatar
            );


        imagem.alt =
            `Avatar de ${nome}`;


        imagem.loading =
            "lazy";


        imagem.onerror =
            function(){

                imagem.style.display =
                    "none";

            };


        avatarContainer.appendChild(
            imagem
        );

    }

    else{

        avatarContainer.textContent =
            "🧙";

    }


    /* ======================================================
       NOME
    ====================================================== */

    const nomeElemento =
        document.createElement("span");

    nomeElemento.className =
        "participante-nome";

    nomeElemento.textContent =
        nome;


    /* ======================================================
       CLASSE
    ====================================================== */

    const classeElemento =
        document.createElement("span");

    classeElemento.className =
        "participante-classe";


    if(classe){

        classeElemento.textContent =
            classe;

    }

    else{

        classeElemento.style.display =
            "none";

    }


    /* ======================================================
       DESCRIÇÃO
    ====================================================== */

    const descricaoElemento =
        document.createElement("div");

    descricaoElemento.className =
        "participante-descricao";


    const descricaoTexto =
        document.createElement("span");

    descricaoTexto.textContent =
        descricao;


    descricaoElemento.appendChild(
        descricaoTexto
    );


    /* ======================================================
       JORNADA
    ====================================================== */

    if(jornada){

        const separador =
            document.createElement("div");

        separador.className =
            "tooltip-jornada";


        const jornadaElemento =
            document.createElement("strong");


        jornadaElemento.textContent =
            `${jornada}`;


        separador.appendChild(
            jornadaElemento
        );


        descricaoElemento.appendChild(
            separador
        );

    }


    /* ======================================================
       MONTAR
    ====================================================== */

    participante.appendChild(
        avatarContainer
    );


    participante.appendChild(
        nomeElemento
    );


    participante.appendChild(
        classeElemento
    );


    participante.appendChild(
        descricaoElemento
    );


    /* ======================================================
       PORTAL
    ====================================================== */

    if(portal){

        participante.classList.add(
            "tem-portal"
        );


        participante.addEventListener(
            "click",
            function(){

                abrirPortal(
                    portal
                );

            }
        );

    }


    /* ======================================================
       MOBILE
    ====================================================== */

    participante.addEventListener(
        "click",
        function(evento){

            if(
                window.innerWidth <= 600
            ){

                if(
                    !participante.classList.contains(
                        "mostrar-descricao"
                    )
                ){

                    evento.preventDefault();

                    evento.stopImmediatePropagation();


                    document
                        .querySelectorAll(
                            ".participante.mostrar-descricao"
                        )
                        .forEach(
                            outro => {

                                outro.classList.remove(
                                    "mostrar-descricao"
                                );

                            }
                        );


                    participante.classList.add(
                        "mostrar-descricao"
                    );

                }

            }

        },
        true
    );


    /* ======================================================
       INSERIR
    ====================================================== */

    lista.appendChild(
        participante
    );

}


/* ==========================================================
   GOOGLE DRIVE
========================================================== */

function converterImagemDrive(url){

    if(!url){

        return "";

    }


    url =
        url.trim();


    let id = null;


    /* open?id= */

    const encontradoOpen =
        url.match(
            /[?&]id=([^&]+)/i
        );


    if(encontradoOpen){

        id =
            encontradoOpen[1];

    }


    /* file/d/ */

    if(!id){

        const encontradoArquivo =
            url.match(
                /\/file\/d\/([^/]+)/i
            );


        if(encontradoArquivo){

            id =
                encontradoArquivo[1];

        }

    }


    /* uc?id= */

    if(!id){

        const encontradoUC =
            url.match(
                /drive\.google\.com\/uc\?.*id=([^&]+)/i
            );


        if(encontradoUC){

            id =
                encontradoUC[1];

        }

    }


    if(!id){

        return url;

    }


    return (
        "https://drive.google.com/thumbnail" +
        "?id=" +
        encodeURIComponent(id) +
        "&sz=w500"
    );

}


/* ==========================================================
   ABRIR PORTAL
========================================================== */

function abrirPortal(url){

    let endereco =
        url.trim();


    if(
        !endereco.startsWith("http://") &&
        !endereco.startsWith("https://")
    ){

        endereco =
            "https://" +
            endereco;

    }


    window.open(
        endereco,
        "_blank",
        "noopener,noreferrer"
    );

}
</script>

</body>
</html>
