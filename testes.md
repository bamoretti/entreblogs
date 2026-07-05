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

    <img
        src="../assets/beda/pergaminho.png"
        alt="separar página"
        class="separador-maior"
    >

<div class="viloes">	

	<h3>Vilão da Semana</h3>

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
</div>

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


<!-- ==========================================================
     MANUAL DO AVENTUREIRO
========================================================== -->

<button id="manualButton" aria-label="Manual do Aventureiro">

    📖

</button>

<div id="manualOverlay">

    <div id="manualModal">

        <button id="manualClose">✕</button>

        <h1>Manual do Aventureiro</h1>

        <h2>O que é o BEDA?</h2>

        <p>

            O <strong>BEDA (Blog Every Day in August)</strong> é uma jornada
            criativa em que aventureiros dos blogs se reúnem durante o mês de
            agosto para cumprir um desafio: publicar algo todos os dias.

        </p>

        <p>

            Pense nele como uma campanha de aventura.

        </p>

        <p>

            Cada participante é um viajante com seu próprio mapa,
            sua própria história e seus próprios recursos.
            Alguns chegam com uma mochila cheia de ideias;
            outros encontram tesouros pelo caminho.

        </p>

        <p>

            Nem todo aventureiro precisa completar a jornada inteira para
            fazer parte da lenda. O importante é compartilhar histórias,
            fortalecer a comunidade e descobrir até onde sua criatividade pode levar.

        </p>

        <hr>

        <h2>⚔️ 1. Escolha sua jornada</h2>

        <p>

            Antes de tudo, preencha o <strong><a href="/recrutamento">Formulário de Cadastro</a> </strong>,
            disponível no final da página.

        </p>

        <ul>

            <li><strong>🛡️ Jornada do Herói (BEDA)</strong><br>
            Publique todos os dias de agosto.<br></li>

            <li><strong>🏹 Jornada do Patrulheiro (BEWA)</strong><br>
            Publique pelo menos uma vez por semana.<br></li>

            <li><strong>🎒 Jornada do Andarilho</strong><br>
            Publique quando desejar.<br></li>

        </ul>

        <hr>

        <h2>📝 2. Registre cada publicação</h2>

        <p>

            Sempre que publicar um texto,
            clique em <strong>Faça um Ataque</strong>
            e registre sua postagem.

        </p>

        <hr>

        <h2>🏅 3. Acompanhe sua evolução</h2>

        <p>

            Seus registros geram ataques,
            pontos,
            medalhas,
            conquistas
            e evolução do personagem.

        </p>

        <hr>

        <h2>🗺️ 4. Explore a campanha</h2>

        <p>

            Novos vilões,
            missões
            e desafios surgirão durante agosto.

            Volte sempre para acompanhar a campanha!

        </p>

    </div>

</div>


<footer class="footer">

    <div class="footer-container">

        <div class="footer-logo">


        </div>

        <div class="footer-links">

           

        </div>

    </div>

    <div class="footer-bottom">

        <p>

           D&B: Os Guardiões da Blogosfera © 2026 

        </p>

        <p>

            Criado por <strong>EntreBlogs</strong> para a comunidade de blogueiros.

        </p>

    </div>

</footer>
	



<script src="..\scripts\beda2026-viloes.js"></script>
<script src="..\scripts\beda2026-missoes.js"></script>
<script src="..\scripts\beda2026-ataques.js"></script>
<script src="..\scripts\beda2026-jogadores.js"></script>


</body>
</html>