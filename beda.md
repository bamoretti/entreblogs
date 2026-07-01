---
title: BEDA 2026
permalink: /beda/
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Contagem Regressiva para o BEDA</title>

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:
        radial-gradient(circle at top,#24344d,#0b1017 70%);
    color:#fff;
    font-family:Inter,sans-serif;
    overflow:hidden;
}

/* estrelas */

body::before{
    content:"";
    position:absolute;
    inset:0;
    background-image:
        radial-gradient(#ffffff88 1px, transparent 1px);
    background-size:40px 40px;
    opacity:.25;
}

.container{
    position:relative;
    z-index:2;
    text-align:center;
    width:min(1100px,90%);
}

h1{
    font-family:Cinzel;
    font-size:3rem;
    color:#f4d06f;
    margin-bottom:15px;
}

.subtitle{
    color:#c6d2de;
    margin-bottom:50px;
    font-size:1.1rem;
}

.timer{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
    gap:25px;
}

.box{
    background:rgba(18,26,38,.9);
    border:1px solid rgba(244,208,111,.25);
    border-radius:18px;
    padding:30px;
    backdrop-filter:blur(8px);
    box-shadow:0 15px 30px rgba(0,0,0,.35);
}

.number{
    font-size:4rem;
    font-weight:700;
    color:#f4d06f;
}

.label{
    margin-top:10px;
    text-transform:uppercase;
    letter-spacing:2px;
    color:#93a5b6;
}

.message{
    margin-top:45px;
    font-size:1.2rem;
    color:#d8e3ee;
}

.magic{
    position:absolute;
    font-size:22px;
    animation:fall linear infinite;
    opacity:.8;
}

@keyframes fall{

    from{
        transform:translateY(-100px);
    }

    to{
        transform:translateY(110vh);
    }

}

footer{

    position:fixed;
    bottom:20px;
    width:100%;
    text-align:center;
    color:#6f8195;
    font-size:.9rem;

}

</style>
</head>

<body>

<div class="container">

<h1>⚔️ A Guerra Contra a Entropia Começa em...</h1>

<p class="subtitle">
Prepare seus pergaminhos. O BEDA inicia em 1º de agosto.
</p>

<div class="timer">

<div class="box">
<div class="number" id="days">00</div>
<div class="label">Dias</div>
</div>

<div class="box">
<div class="number" id="hours">00</div>
<div class="label">Horas</div>
</div>

<div class="box">
<div class="number" id="minutes">00</div>
<div class="label">Minutos</div>
</div>

<div class="box">
<div class="number" id="seconds">00</div>
<div class="label">Segundos</div>
</div>

</div>

<div class="message" id="message">
📜 Os escribas estão reunindo forças...
</div>

</div>

<footer>
Crônicas do Reino dos Escribas • BEDA 2026
</footer>

<script>

//======================
// Data alvo
//======================

const targetDate = new Date("2026-08-01T00:00:00");

//======================
// Atualiza contador
//======================

function updateCountdown(){

    const now = new Date();

    const diff = targetDate - now;

    if(diff <= 0){

        document.getElementById("days").textContent="00";
        document.getElementById("hours").textContent="00";
        document.getElementById("minutes").textContent="00";
        document.getElementById("seconds").textContent="00";

        document.getElementById("message").innerHTML=
        "🎉 A batalha começou! Publique seu primeiro pergaminho!";

        return;
    }

    const days=Math.floor(diff/(1000*60*60*24));

    const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((diff%(1000*60*60))/(1000*60));

    const seconds=Math.floor((diff%(1000*60))/1000);

    document.getElementById("days").textContent=
        String(days).padStart(2,"0");

    document.getElementById("hours").textContent=
        String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent=
        String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent=
        String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

//======================
// Partículas mágicas
//======================

const symbols=["✨","📜","⭐","🪶","⚔️"];

function createParticle(){

    const p=document.createElement("div");

    p.className="magic";

    p.textContent=symbols[Math.floor(Math.random()*symbols.length)];

    p.style.left=Math.random()*100+"vw";

    p.style.animationDuration=(6+Math.random()*8)+"s";

    p.style.fontSize=(18+Math.random()*20)+"px";

    document.body.appendChild(p);

    setTimeout(()=>{
        p.remove();
    },14000);

}

setInterval(createParticle,500);

</script>

</body>
</html>