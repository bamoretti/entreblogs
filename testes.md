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


<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: "Jim Nightshade", cursive;
	font-weight: 400;
	font-style: normal;
}

body {
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url("../assets/beda/background.png");
    background-size: 100%;
	  background-attachment: fixed;
    color: white;
    text-align: center;
}

.container{
	margin-top: 50px;
        max-width:900px;
    margin:auto;
}


.logo-beda{
    display:block;
    margin:0 auto 15px;
    max-width:700px;
    width:67%;
    height:auto;
}

.logo-beda-pergaminho{
    display: block;
    margin: 0 auto 5px;
    max-width: 100px;
    height: auto;

    /* Animação */
    animation: flutuar 2s ease-in-out infinite;
}

@keyframes flutuar {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

#bossImage{

    width:100%;
    height:auto;
    object-fit:cover;

    display:block;

    margin:auto;

    margin-bottom:25px;

}

h1{

    font-size:40px;

    margin-bottom:10px;

}

.period{

    color:#000;
	text-align: center;
    font-size:18px;
    margin-bottom:20px;

}

.description{
    line-height:1.6;
    color:#141313;
    margin-bottom:30px;
}

.hpHeader{

    display:flex;

    justify-content:space-between;

    margin-bottom:8px;

    font-weight:bold;

}

.hp{

    height:22px;
	color: #141313;
    background:#826343;
    border-radius:20px;

    overflow:hidden;

}
  
.bossHPText{

	color: #141313;

}

#bossBar{

    width:0;

    height:100%;

    background:#523a13;

    transition:.8s;

}

.attacks{
    margin-top:20px;
    font-size:20px;

}


.missoes{
    background: #694f3f;
    margin: 30px 0px 0px 20px;
    border-radius: 20px;
    padding: 20;
	text-align: left;
}

.missao{
    padding:20px;
}

.missao h2{
    font-size: 32px;
    color:#d6b25e;
    margin-bottom:50px;

}

.missao p{
	margin-left: 30px;
    color:#ddd;
	font-size: 27px;
}

.loading{
    text-align:center;
    opacity:.7;

}


 /* ==========================================================
   HISTÓRICO DE ATAQUES
========================================================== */

.battle-log{

    width:min(1200px,95%);

    margin:60px auto;

    background:#382518;

    border:1px solid rgba(255,255,255,.06);

    border-radius:18px;

    overflow:hidden;

    box-shadow:0 20px 45px rgba(0,0,0,.35);

}

.battle-header{

    padding:30px;

    text-align:center;

    border-bottom:1px solid rgba(255,255,255,.06);

}

.battle-header h2{

    font-family:Cinzel,serif;

    font-size:2rem;

    color:#d6b25e;

    margin-bottom:10px;

}

.battle-header p{

    color:#9aa8b6;

    font-size:.95rem;

}

/* ==========================================================
   TABELA
========================================================== */

.battle-table-wrapper{

    overflow-x:auto;

}

.battle-table{

    width:100%;

    border-collapse:collapse;

}

.battle-table thead{

    background:#1b2635;

}

.battle-table th{

    padding:16px;

    text-align:left;

    color:#d6b25e;

    font-size:.9rem;

    font-weight:600;

    white-space:nowrap;

}

.battle-table td{

    padding:15px 16px;

    border-top:1px solid rgba(255,255,255,.05);

    color:#e6eef7;

    vertical-align:middle;

}

.battle-table tbody tr{

    transition:.25s;

}

.battle-table tbody tr:hover{

    background:#1b2736;

}

/* ==========================================================
   COLUNAS
========================================================== */

.battle-date{

    color:#9aa8b6;

    font-size:.9rem;

    white-space:nowrap;

}

.battle-player{

    font-weight:600;

    color:#ffffff;

}

.battle-attack{

    color:#6bbcff;

    font-weight:600;

}

.battle-damage{

    text-align:center;

    font-weight:bold;

    color:#ff6b6b;

    font-size:1rem;

}

.battle-medal{

    font-size:1.3rem;

    text-align:center;

}

.battle-link{

    color:#6ee7a8;

    text-decoration:none;

    font-weight:600;

}

.battle-link:hover{

    text-decoration:underline;

}

/* ==========================================================
   BOTÃO
========================================================== */

.battle-footer{

    padding:25px;

    text-align:center;

    border-top:1px solid rgba(255,255,255,.06);

}

#toggleBattle{

    background:#d6b25e;

    color:#141c26;

    border:none;

    border-radius:10px;

    padding:12px 26px;

    font-size:.95rem;

    font-weight:700;

    cursor:pointer;

    transition:.25s;

}

#toggleBattle:hover{

    transform:translateY(-2px);

    box-shadow:0 10px 25px rgba(214,178,94,.35);

}

/* ==========================================================
   ESTADO VAZIO
========================================================== */

.battle-empty{

    text-align:center;

    color:#9aa8b6;

    padding:40px;

}

/* ==========================================================
   RESPONSIVO
========================================================== */

@media(max-width:900px){

    .battle-header h2{

        font-size:1.6rem;

    }

    .battle-table th,

    .battle-table td{

        padding:12px;

        font-size:.9rem;

    }

}

@media(max-width:600px){

    .battle-log{

        border-radius:12px;

    }

    .battle-header{

        padding:20px;

    }

    .battle-header h2{

        font-size:1.35rem;

    }

    .battle-header p{

        font-size:.85rem;

    }

    .battle-table th,

    .battle-table td{

        padding:10px;

        font-size:.82rem;

    }

    #toggleBattle{

        width:100%;

    }

}
  

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