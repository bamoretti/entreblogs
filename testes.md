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
	
<div class="descricao-beda">
Antes que agosto despontasse no horizonte, a blogosfera ameaçava mergulhar em tempos de silêncio. Mas existe uma antiga tradição, conhecida entre aldeões pelo nome de BEDA. Quando chega a Estação da Escrita, aventureiros atendem ao chamado para registrar histórias, reacender blogs e impedir que a chama da criatividade apague e o esquecimento roube memórias. Assim começa a jornada dos Guardiões da Blogosfera.
</div>
<img id="bossImage">

<div class="hpHeader">

	<span>HP</span>

	<span id="bossHPText"></span>

	</div>

	<div class="hp">

	<div id="bossBar"></div>

</div>
<div class="period" id="bossPeriod"></div>

<div class="description" id="bossDescription"></div>


<div class="missoes">

    <h3>Missões da Semana Contra o Vilão</h3>

    <div id="listaMissoes">

        <div class="loading">
            Carregando missões...
        </div>

    </div>

</div>



<section class="battle-log">

    <div class="battle-header">

        <h2>⚔Últimos Ataques ao Vilão</h2>

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

        Faça um Ataque

    </a>
</div>



    <img
        src="../assets/beda/pena.png"
        alt="separar página"
        class="separador"
    >
	
	
<!-- ==========================================
     GUARDIÕES DA BLOGOSFERA
========================================== -->

<section class="players-section">

    <div class="players-header">

        <h3>Guardiões da Blogosfera</h3>

        <p>
            Cada guardião fortalece o Os Manuscritos Antigos com seus pergaminhos.
        </p>

    </div>

    <div id="playersGrid" class="players-grid">

        <div class="player-loading">

            Carregando guardiões...

        </div>

    </div>

</section>
	
<div id="tooltip"></div>	
</div>


<script src="..\scripts\beda2026-viloes.js"></script>
<script src="..\scripts\beda2026-missoes.js"></script>
<script src="..\scripts\beda2026-ataques.js"></script>
<script src="..\scripts\beda2026-jogadores.js"></script>


</body>
</html>