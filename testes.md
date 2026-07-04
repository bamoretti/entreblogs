---
layout: vazio
title: BEDA 2026
permalink: /testes/
---

<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>D&B: Os Guardiões da Blogosfera</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jim+Nightshade&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="180x180" href="https://entreblogs.com.br/assets/favicon/selo_1_marron.png">
<link rel="icon" type="image/png" sizes="32x32" href="https://entreblogs.com.br/assets/favicon/selo_1_marron.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://entreblogs.com.br/assets/favicon/selo_1_marron.png">

<link rel="manifest" href="/site.webmanifest">

<link rel="stylesheet" href="..\style\beda2026.css">

<style>

</style>

</head>

<body>

<div class="container">


    <img
        src="../assets/beda/pena-pergaminho.png"
        alt="BEDA 2026"
        class="logo-beda-pergaminho"
    >
	
    <img
        src="../assets/beda/titulo.png"
        alt="BEDA 2026"
        class="logo-beda"
    >
	

<img id="bossImage">

<div class="period" id="bossPeriod"></div>

<div class="description" id="bossDescription"></div>

<div class="hpHeader">

<span>HP</span>

<span id="bossHPText"></span>

</div>

<div class="hp">

<div id="bossBar"></div>

</div>


<div class="missoes">

    <h1>📜 Missões Ativas</h1>

    <div id="listaMissoes">

        <div class="loading">
            Carregando missões...
        </div>

    </div>

</div>



<section class="battle-log">

    <div class="battle-header">

        <h2>⚔️ Últimos Ataques ao Vilão</h2>

        <p>
            Os Guardiões registram aqui todas as investidas contra as forças da Entropia.
        </p>

    </div>

    <div class="battle-table-wrapper">

        <table class="battle-table">

            <thead>

                <tr>

                    <th>Data</th>

                    <th>Personagem</th>

                    <th>Ataque</th>

                    <th>Dano</th>

                    <th>Medalha</th>

                    <th>Pergaminho</th>

                </tr>

            </thead>

            <tbody id="battleBody">

                <tr>

                    <td colspan="6">

                        Carregando ataques...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

    <div class="battle-footer">

        <button id="toggleBattle">

            Ver todos os ataques

        </button>

    </div>

</section>

<div class="attack-action">
    <a
        href="https://forms.gle/4WSDM3G162sUCh8AA"
        target="_blank"
        rel="noopener"
        class="attack-button">

        ⚔️ Faça um Ataque

    </a>
</div>

</div>

<script>

const URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=525986403&single=true&output=csv";

async function carregar(){

    const resposta = await fetch(URL);

    const csv = await resposta.text();

    const linhas = csv.trim().split(/\r?\n/);

    const cabecalho = parseCSV(linhas.shift());

    let boss = null;

    for(const linha of linhas){

        const valores = parseCSV(linha);

        const obj={};

        cabecalho.forEach((c,i)=>{

            obj[c.trim()] = (valores[i] || "").trim();

        });

        if(Number(obj["Ativo"])===1){

            boss=obj;

            break;

        }

    }

    if(!boss){

        document.querySelector(".card").innerHTML =
        "<h2>Nenhum vilão ativo.</h2>";

        return;

    }

    console.table(boss);


    document.getElementById("bossPeriod").textContent =
        `${boss["Data inicial"]} até ${boss["Data final"]}`;

    document.getElementById("bossDescription").textContent =
        boss["Descrição"] || "";


    const hpMax =
        Number(boss["HP"]);

    const hpAtual =
        Number(boss["HP - Ataque"]);

    document.getElementById("bossHPText").textContent =
        hpAtual + " / " + hpMax;

    document.getElementById("bossBar").style.width =
        ((hpAtual/hpMax)*100)+"%";

    if(boss["Imagem Vilão"]){

       document.getElementById("bossImage").src =
   	   boss["Imagem Vilão"];

    }

}


function parseCSV(text){

    let resultado=[];

    let atual="";

    let aspas=false;

    for(let i=0;i<text.length;i++){

        const c=text[i];

        if(c=='"' && text[i+1]=='"'){

            atual+='"';

            i++;

        }

        else if(c=='"'){

            aspas=!aspas;

        }

        else if(c=="," && !aspas){

            resultado.push(atual);

            atual="";

        }

        else{

            atual+=c;

        }

    }

    resultado.push(atual);

    return resultado;

}

carregar();

</script>
<script>

const URL_MISSOES =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=554145336&single=true&output=csv";

async function carregarMissoes(){

    try{

        const resp = await fetch(URL_MISSOES);

        const csv = await resp.text();

        const linhas = csv.trim().split(/\r?\n/);

        const cabecalho =
            parseCSVLine(linhas.shift());

        const container =
            document.getElementById("listaMissoes");

        container.innerHTML = "";

        let total = 0;

        linhas.forEach(linha=>{

            const cols =
                parseCSVLine(linha);

            const obj = {};

            cabecalho.forEach((c,i)=>{

                obj[c.trim()] =
                    (cols[i] || "").trim();

            });

            if(Number(obj["Ativo"]) !== 1)
                return;

            total++;

            const card =
                document.createElement("div");

            card.className =
                "missao";

            card.innerHTML = `
	
                <h2>
                    ${obj["Missão"]}
                </h2>

                <p>
                    ${obj["Descrição Missão"]}
                </p>

            `;

            container.appendChild(card);

        });

        if(total === 0){

            container.innerHTML = `
                <div class="loading">
                    Nenhuma missão ativa.
                </div>
            `;

        }

    }

    catch(error){

        console.error(error);

        document.getElementById(
            "listaMissoes"
        ).innerHTML = `
            <div class="loading">
                Erro ao carregar missões.
            </div>
        `;

    }

}

function parseCSVLine(line){

    const result = [];

    let current = "";

    let inQuotes = false;

    for(let i=0;i<line.length;i++){

        const char = line[i];

        if(
            char === '"' &&
            line[i+1] === '"'
        ){

            current += '"';

            i++;

        }

        else if(char === '"'){

            inQuotes = !inQuotes;

        }

        else if(
            char === "," &&
            !inQuotes
        ){

            result.push(current);

            current = "";

        }

        else{

            current += char;

        }

    }

    result.push(current);

    return result;

}

carregarMissoes();

</script>

<script src="..\scripts\beda2026-ataques.js"></script>

</body>
</html>