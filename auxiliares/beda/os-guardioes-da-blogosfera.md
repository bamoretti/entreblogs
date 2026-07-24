---
layout: beda
title: D&B - Os Guardiões da Blogosfera
permalink: /beda/2026/
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
	
	<div class="descricao-beda">
A cada semana, um novo senhor das trevas surgirá das sombras, trazendo consigo ameaças e desafios jamais vistos. Para enfrentá-lo, heróis corajosos receberão missões épicas, atravessando florestas encantadas, ruínas esquecidas e terras amaldiçoadas. Somente ao cumprir cada prova e derrotar o vilão da semana será possível restaurar a paz ao reino... </div>
	
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

        <h2>Últimos Ataques ao Vilão</h2>

        <p>
            Os Guardiões registram aqui todas as investidas contra o vilão
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
     GRIMÓRIO DA BLOGOSFERA
========================================================== -->

<button title="Grimório - Lista de Ideias" id="grimorioButton" aria-label="Grimório da Blogosfera">

    

</button>

<div id="grimorioOverlay">

    <div id="grimorioModal">

        <button id="grimorioClose">✕</button>

        <h1>Grimório de Feitiços</h1>

        <p>

            Bem-vindo ao Grimório de Feitiços, use-o com sabedoria. 

        </p>

        <hr>

        <h2>📝 Memórias & Nostalgia</h2>

		<p>
			• Escreva sobre algo que você tem medo de esquecer no futuro.<br>
			• Conte a história de uma pessoa que marcou a sua vida.<br>
			• Escreva sobre uma lembrança que ainda não apareceu no seu blog.<br>
			• Escolha uma foto aleatória da sua galeria e conte a história por trás dela.<br>
			• Escreva uma carta para o seu eu do passado ou do futuro.<br>
			• Escolha uma foto antiga e recrie a mesma cena hoje.<br>
			• Um lugar que faz parte da sua história.<br>
			• Conte uma lembrança engraçada.<br>
			• Uma conversa que você nunca esqueceu.<br>
			• Um sonho que já realizou.<br>
			• Uma fase da vida que sente saudade.<br>
			• Algo que você faria diferente hoje.<br>
			• Uma comida que traz lembranças.<br>
			• Uma fotografia que sempre faz você sorrir.<br>
			• Objetos que contam sua história.<br>
			• Conte a história por trás do seu nome ou apelido.<br>
			• Compartilhe uma receita que faz parte da sua história.
		</p>
	
		<hr>
	
		<h2>📖 Cotidiano</h2>
		
		<p>
			• Escreva sobre algo que aconteceu nas últimas 24 horas.<br>
			• Conte como foi o seu dia pelo ponto de vista de um objeto, do seu pet ou de uma criança.<br>
			• Conte como foi o seu dia.<br>
			• Mostre um dia comum em fotos.<br>
			• Apresente sua mesa de trabalho, estudos ou criação.<br>
			• Conte como você organiza a sua semana.<br>
			• Mostre o que costuma carregar na bolsa, mochila ou carteira.<br>
			• Como está seu mês até agora?<br>
			• Três pequenas alegrias da semana.<br>
			• O melhor momento do seu dia.<br>
			• O que fez você rir recentemente?<br>
			• Algo simples que melhorou sua rotina.<br>
			• Como você costuma descansar.<br>
			• O que nunca falta no seu café da manhã.<br>
			• Como é seu cantinho favorito da casa.<br>
			• O que você sempre deixa para depois.<br>
			• Uma mania que você tem.<br>
			• O primeiro pensamento quando acorda.<br>
			• Como você costuma terminar o dia.<br>
			• Seu ritual de fim de semana.
		</p>

		<hr>
		
		<h2>📸 Fotografia</h2>
		
		<p>
			• Mostre um dia comum em fotos.<br>
			• Publique cinco fotos sem contexto.<br>
			• Registre detalhes que normalmente passam despercebidos.<br>
			• Mostre o céu de hoje.<br>
			• O céu em diferentes momentos do dia.<br>
			• Um passeio em fotos.<br>
			• Conte uma história usando cinco imagens.
		</p>
		
		<hr>
		
		<h2>🌱 Reflexões</h2>
		
		<p>
			• Conte o que mudou na sua vida este ano.<br>
			• Liste algumas das suas sensações favoritas.<br>
			• Algo que você aprendeu recentemente.<br>
			• O que significa "lar" para você?<br>
			• O que tem ocupado seus pensamentos?<br>
			• Uma opinião que mudou com o tempo.<br>
			• Uma pequena vitória que merece ser comemorada.<br>
			• O que você faria se tivesse um dia inteiro livre?<br>
			• Um momento em que saiu da sua zona de conforto.<br>
			• Algo que você gostaria de lembrar daqui a dez anos.<br>
			• O que faz um dia valer a pena.<br>
			• O que significa sucesso para você.<br>
			• Como você define felicidade hoje.<br>
			• Uma mudança pela qual é grato.<br>
			• O que você desaprendeu.<br>
			• Um conselho que realmente funcionou.
		</p>
		
		<hr>
		
		<h2>⭐ Favoritos & Recomendações</h2>
		
		<p>
			• Indique algo que você gosta e acha que mais gente deveria conhecer.<br>
			• Compartilhe pequenos hábitos que você ama.<br>
			• Indique blogs que inspiram você.<br>
			• Faça uma lista com cinco coisas que você quer fazer este mês.<br>
			• Compartilhe seus favoritos do momento.<br>
			• Compartilhe seus posts favoritos.<br>
			• Cinco pequenas alegrias do dia a dia.<br>
			• Objetos dos quais você não abre mão.<br>
			• Músicas que marcaram sua vida.<br>
			• Aplicativos que mais usa.<br>
			• Livros que gostaria de reler.<br>
			• O último livro que terminou.<br>
			• Um livro que mudou sua forma de pensar.<br>
			• Uma série que maratonou.<br>
			• Um filme que sempre reassiste.<br>
			• Um personagem com quem você se identifica.<br>
			• Lugares que ainda quer conhecer.<br>
			• Pessoas que inspiram você.
		</p>
		
		<hr>
		
		<h2>🎯 Listas & Coleções</h2>
		
		<p>
			• Faça uma lista de ideias que ainda quer colocar em prática.<br>
			• Três coisas que estão na sua mesa agora.<br>
			• Um cheiro que traz boas lembranças.<br>
			• Uma música que descreve seu momento atual.<br>
			• Coisas que você coleciona.<br>
			• Pequenas conquistas deste ano.<br>
			• Coisas pelas quais é grato hoje.<br>
			• Coisas que aprendeu este mês.<br>
			• Cinco curiosidades sobre você.<br>
			• Mostre cinco objetos que representam quem você é.
		</p>
		
		<hr>
		
		<h2>✨ Criatividade</h2>
		
		<p>
			• Um dia que parecia comum, mas acabou sendo especial.<br>
			• Uma amizade inesperada.<br>
			• Uma coincidência curiosa.<br>
			• Faça um post inspirado na previsão do tempo de hoje.<br>
			• Monte uma playlist para um dia específico.<br>
			• Escreva sobre uma tradição que você criou ou mantém.<br>
			• Escolha uma palavra e escreva tudo o que ela faz você lembrar.<br>
			• Abra um livro aleatório e escreva inspirado na primeira frase que encontrar.<br>
			• Conte uma história começando pelo final.<br>
			• Como lida com bloqueios criativos.<br>
			• Uma habilidade que gostaria de desenvolver.
		</p> 

    </div>

</div>

<!-- ==========================================================
     MANUAL DO AVENTUREIRO
========================================================== -->

<button id="manualButton"  title="Manual de Aventureiro" aria-label="Manual do Aventureiro">

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

        <h2>1. Escolha sua jornada</h2>

        <p>

            Antes de tudo, preencha o <strong><a href="/beda/recrutamento">Formulário de Cadastro</a></strong>.
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

        <h2>2. Registre cada publicação</h2>

        <p>

            Sempre que publicar um texto,
            clique em <strong>Faça um Ataque</strong>
            e registre sua postagem.

        </p>

        <hr>

        <h2>3. Acompanhe sua evolução</h2>

        <p>

            Seus registros geram ataques,
            pontos,
            medalhas,
            conquistas
            e evolução do personagem.

        </p>

        <hr>

        <h2>4. Explore a campanha</h2>

        <p>

            Novos vilões,
            missões
            e desafios surgirão durante agosto.

            Volte sempre para acompanhar a campanha!

        </p>

    </div>

</div>


<a
    id="playlistButton"
    href="https://open.spotify.com/playlist/39Ajx3HKVtVZmwKygaMeMI?go=1&sp_cid=4e9cf311e91d46d0b9de38f5a5503586&utm_source=embed_player_p&utm_medium=desktop&si=9a0c3a3df4a24d64&nd=1&dlsi=0af08b2579524c83"
    target="_blank"
    rel="noopener noreferrer"
    title="Trilha Sonora da Campanha">

    

</a>


<script src="..\scripts\beda2026-viloes.js"></script>
<script src="..\scripts\beda2026-missoes.js"></script>
<script src="..\scripts\beda2026-ataques.js"></script>
<script src="..\scripts\beda2026-jogadores.js"></script>


</body>
</html>
