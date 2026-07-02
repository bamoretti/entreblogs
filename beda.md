---
layout: vazio
title: BEDA 2026
permalink: /beda/
---

<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contagem Regressiva</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:url("../assets/beda/background.png");
    color:white;
    text-align:center;
}

.container{
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(12px);
    padding:40px;
    border-radius:20px;
    box-shadow:0 0 30px rgba(0,0,0,.4);
    max-width:800px;
    width:90%;
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
    gap:20px;
    flex-wrap:wrap;
}

.caixa{
    background:#1e293b;
    padding:20px;
    border-radius:15px;
    min-width:120px;
}

.numero{
    font-size:3rem;
    font-weight:bold;
    color:#38bdf8;
}

.texto{
    margin-top:10px;
    font-size:1rem;
    color:#cbd5e1;
}
</style>

</head>
<body>

<div class="container">

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

<script>
// Define o próximo dia 27 de julho às 00:00
const hoje = new Date();
let ano = hoje.getFullYear();

let destino = new Date(ano, 6, 27, 0, 0, 0); // Mês 6 = julho

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

</script>

</body>
</html>