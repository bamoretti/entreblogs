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

<meta http-equiv="refresh" content="0; url=/beda/2026/recrutamento">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jim+Nightshade&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">

<link rel="icon" type="image/png" href="/assets/favicon/selo_1_marron.png">
<link rel="apple-touch-icon" href="/assets/favicon/selo_1_marron.png"> 

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


.logo-beda{
    display:block;
    margin:0 auto 15px;
    max-width:700px;
    width:67%;
    height:auto;
}

.logo-beda-pergaminho{
    display:block;
    margin:0 auto 5px;
    max-width:100px;
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
    margin-bottom:20px;
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

.modal-conteudo-descricao {
    color:#523a13;
    margin-bottom:18px;
	max-height:60vh;   /* altura máxima */
    overflow-y:auto;   /* scroll vertical */
}

.modal-conteudo-descricao p{
    color:#523a13;
	font-family: "Special Elite", system-ui;
    line-height:1.5;
    font-size:14px;
	padding-right: 10px;
	padding-left: 10px;

}

.modal-conteudo-descricao::-webkit-scrollbar{
    width:10px;
}

.modal-conteudo-descricao::-webkit-scrollbar-track{
    background:#e8dcc1;
    border-radius:10px;
}

.modal-conteudo-descricao::-webkit-scrollbar-thumb{
    background:#523a13;
    border-radius:10px;
}

.modal-conteudo-descricao{
    scrollbar-width:thin;          /* Firefox */
    scrollbar-color:#523a13 #e8dcc1;
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


@media (max-width: 768px) {
    body {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
	
	.logo-beda{
    display:block;
    margin:5px;
    width:100%;
    height:auto;
	}


	.container{
		padding:20px;
		margin-top: -20px;
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
	

</body>
</html>
