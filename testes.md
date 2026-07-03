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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url("../assets/beda/background.png");
    background-size: 100%;
    color: white;
    text-align: center;
}

.card {
    padding: 50px;
}

#bossImage{

    width:100%;
    height:auto;

    object-fit:cover;

    border-radius:20px;

    display:block;

    margin:auto;

    margin-bottom:25px;

}

h1{

    font-size:40px;

    margin-bottom:10px;

}

.period{

    color:#d6b25e;
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

</style>

</head>

<body>

<div class="card">

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

</body>
</html>

s