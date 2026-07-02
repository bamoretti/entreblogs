---
layout: vazio
title: BEDA 2026
permalink: /beda/
---

<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>D&B: Os Guardiões da Blogosfera</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jim+Nightshade&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/selo_1_marrom.png">
<link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon/selo_1_marrom.png">
<link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon/selo_1_marrom.png">


<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: "Jim Nightshade", cursive;
	font-weight: 400;
	font-style: normal;
}

body{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:url("../assets/beda/background.png");
    color:white;
    text-align:center;
	background-size: 100%;
}

.logo-beda{
    display:block;
    margin:0 auto 20px;
    max-width:700px;
    width:60%;
    height:auto;
}

.container{
    padding:40px;
}

h1{
    font-size:3rem;
    margin-bottom:15px;
}

p{
    color:#cbd5e1;
    margin-bottom:35px;
}

.contador{
    display:flex;
    justify-content:center;
    gap:0px;
    flex-wrap:wrap;
}

.caixa{
    padding:0px;
    border-radius:15px;
    min-width:120px;
}

.numero{
    font-size:3rem;
    font-weight:bold;
    color:#523a13;
}

.texto{
    margin-top:0px;
    font-size:1.5rem;
    color:#523a13;
}

/* Botão flutuante */
.botao-ajuda{
    position:fixed;
    right:25px;
    bottom:25px;
    width:60px;
    height:60px;
    border:none;
    border-radius:50%;
    background:#523a13;
    color:#fff;
    font-size:2rem;
    cursor:pointer;
    box-shadow:0 8px 20px rgba(0,0,0,.35);
    transition:.2s;
    z-index:999;
}

.botao-ajuda:hover{
    transform:scale(1.08);
}

/* Fundo escuro */
.modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:0;
    visibility:hidden;
    transition:.25s;
    z-index:1000;
}

.modal.ativo{
    opacity:1;
    visibility:visible;
}

/* Caixa do popup */
.modal-conteudo{
    background:#f7f0df;
    color:#523a13;
    max-width:600px;
    width:90%;
    padding:35px;
    border-radius:18px;
    position:relative;
    text-align:left;
    box-shadow:0 15px 40px rgba(0,0,0,.4);
}

.modal-conteudo h2{
    margin-bottom:15px;
    font-size:2.2rem;
}

.modal-conteudo p{
    color:#523a13;
    font-size:1.4rem;
    line-height:1.5;
    margin-bottom:18px;
}

.fechar{
    position:absolute;
    top:10px;
    right:15px;
    border:none;
    background:none;
    font-size:2rem;
    cursor:pointer;
    color:#523a13;
}
</style>

</head>
<body>

<div class="container">

    <img
        src="../assets/beda/titulo.png"
        alt="BEDA 2026"
        class="logo-beda"
    >
	
<div class="contador">

<div class="caixa">
<div id="dias" class="numero">00</div>
<div class="texto">Dias</div>
</div>

<div class="caixa">
<div id="horas" class="numero">00</div>
<div class="texto">Horas</div>
</div>

<div class="caixa">
<div id="minutos" class="numero">00</div>
<div class="texto">Minutos</div>
</div>

<div class="caixa">
<div id="segundos" class="numero">00</div>
<div class="texto">Segundos</div>
</div>

</div>

</div>


<!-- Botão flutuante -->
<button class="botao-ajuda" onclick="abrirModal()">?</button>

<!-- Modal -->
<div id="modalBeda" class="modal" onclick="fecharModal(event)">
    <div class="modal-conteudo">
        <button class="fechar" onclick="fecharModal()">&times;</button>

        <h2>O que é o BEDA?</h2>

        <p>
            O <strong>BEDA</strong> (Blog Every Day in August) é um desafio em que
            blogueiros publicam um novo conteúdo todos os dias durante o mês de agosto.
        </p>

        <p>
            O objetivo é incentivar a escrita, fortalecer a comunidade de blogs,
            conhecer novos autores e manter o hábito de produzir conteúdo diariamente.
        </p>

        <p>
            Participe publicando diariamente e compartilhe seus textos com a comunidade.
        </p>

    </div>
</div>


<script>
// Define o próximo dia 27 de julho às 00:00
const hoje = new Date();
let ano = hoje.getFullYear();

let destino = new Date(ano, 6, 27, 0, 0, 0);

// Se já passou de 27 de julho deste ano,
// usa o ano seguinte.
if (hoje > destino) {
    destino = new Date(ano + 1, 6, 27, 0, 0, 0);
}

function atualizarContador(){

    const agora = new Date();

    const diferenca = destino - agora;

    if(diferenca <= 0){
        document.querySelector(".container").innerHTML = `
            <h1>🎉 Chegou o grande dia!</h1>
        `;
        return;
    }

    const dias = Math.floor(diferenca / (1000*60*60*24));
    const horas = Math.floor((diferenca % (1000*60*60*24)) / (1000*60*60));
    const minutos = Math.floor((diferenca % (1000*60*60)) / (1000*60));
    const segundos = Math.floor((diferenca % (1000*60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas.toString().padStart(2,"0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2,"0");
    document.getElementById("segundos").textContent = segundos.toString().padStart(2,"0");
}

atualizarContador();
setInterval(atualizarContador,1000);

// =======================
// Modal
// =======================

function abrirModal(){
    document.getElementById("modalBeda").classList.add("ativo");
}

function fecharModal(event){
    if(!event || event.target.id === "modalBeda"){
        document.getElementById("modalBeda").classList.remove("ativo");
    }
}

// Fecha com a tecla ESC
document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
        document.getElementById("modalBeda").classList.remove("ativo");
    }
});
</script>

</body>
</html>