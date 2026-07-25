document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURAÇÃO
    ===================================================== */

    const URL_PARTICIPANTES =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=2069176218&single=true&output=csv";


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const popup = document.getElementById("popup-participantes");
    const botaoAbrir = document.getElementById("abrir-participantes");
    const botaoFechar = document.getElementById("fechar-participantes");
    const lista = document.getElementById("lista-participantes");
    const overlay = popup
        ? popup.querySelector(".popup-overlay")
        : null;


    /* =====================================================
       VERIFICAÇÃO
    ===================================================== */

    if (!popup || !botaoAbrir || !botaoFechar || !lista) {

        console.error(
            "Erro: os elementos do popup não foram encontrados."
        );

        return;
    }


    /* =====================================================
       ABRIR POPUP
    ===================================================== */

    botaoAbrir.addEventListener("click", () => {

        popup.classList.add("aberto");

        popup.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        carregarParticipantes();

    });


    /* =====================================================
       FECHAR POPUP
    ===================================================== */

    function fecharPopup() {

        popup.classList.remove("aberto");

        popup.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    botaoFechar.addEventListener(
        "click",
        fecharPopup
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            fecharPopup
        );

    }


    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape" &&
                popup.classList.contains("aberto")
            ) {

                fecharPopup();

            }

        }
    );


    /* =====================================================
       CARREGAR PARTICIPANTES
    ===================================================== */

    async function carregarParticipantes() {

        lista.innerHTML = `
            <div class="participantes-carregando">
                Consultando os registros da
                Biblioteca Eterna...
            </div>
        `;


        try {

            const resposta = await fetch(
                URL_PARTICIPANTES,
                {
                    cache: "no-store"
                }
            );


            if (!resposta.ok) {

                throw new Error(
                    "Erro HTTP: " + resposta.status
                );

            }


            const csv = await resposta.text();


            const participantes =
                csvParaObjetos(csv);


            criarParticipantes(participantes);

        }

        catch (erro) {

            console.error(
                "Erro ao carregar participantes:",
                erro
            );


            lista.innerHTML = `
                <div class="participantes-erro">
                    Não foi possível carregar
                    os aventureiros.
                </div>
            `;

        }

    }


    /* =====================================================
       CSV → OBJETOS
    ===================================================== */

    function csvParaObjetos(csv) {

        const linhas = separarLinhasCSV(csv);


        if (linhas.length === 0) {
            return [];
        }


        const cabecalhos =
            parseCSVLine(linhas[0]).map(
                normalizarTexto
            );


        const dados = [];


        for (let i = 1; i < linhas.length; i++) {

            if (!linhas[i].trim()) {
                continue;
            }


            const valores =
                parseCSVLine(linhas[i]);


            const objeto = {};


            cabecalhos.forEach(
                (cabecalho, index) => {

                    objeto[cabecalho] =
                        valores[index] !== undefined
                            ? valores[index].trim()
                            : "";

                }
            );


            dados.push(objeto);

        }


        return dados;

    }


    /* =====================================================
       SEPARAR LINHAS DO CSV

       Importante:
       não quebra uma linha quando estamos
       dentro de aspas.

       CORREÇÃO: as aspas que abrem/fecham um campo
       precisam ser mantidas no texto da linha — do
       contrário o parseCSVLine perde a informação de
       "isso está dentro de aspas" e vírgulas dentro da
       descrição acabam virando colunas extras.
    ===================================================== */

    function separarLinhasCSV(csv) {

        const linhas = [];

        let atual = "";

        let dentroDasAspas = false;


        for (
            let i = 0;
            i < csv.length;
            i++
        ) {

            const caractere = csv[i];


            if (caractere === '"') {

                if (
                    dentroDasAspas &&
                    csv[i + 1] === '"'
                ) {

                    atual += '""';

                    i++;

                }
                else {

                    dentroDasAspas =
                        !dentroDasAspas;

                    atual += caractere; // <- CORREÇÃO: mantém a aspa

                }


                continue;
            }


            if (
                (
                    caractere === "\n" ||
                    caractere === "\r"
                ) &&
                !dentroDasAspas
            ) {

                if (
                    caractere === "\r" &&
                    csv[i + 1] === "\n"
                ) {

                    i++;

                }


                linhas.push(atual);

                atual = "";

                continue;
            }


            atual += caractere;

        }


        if (atual.length > 0) {
            linhas.push(atual);
        }


        return linhas;

    }


    /* =====================================================
       PARSER CSV

       NÃO usar split(",")!

       Assim:

       "Sou aventureiro, escritor e viajante"

       continua sendo UMA coluna.
    ===================================================== */

    function parseCSVLine(linha) {

        const resultado = [];

        let atual = "";

        let dentroDasAspas = false;


        for (
            let i = 0;
            i < linha.length;
            i++
        ) {

            const caractere = linha[i];


            /* ---------------------------------------------
               ASPAS
            --------------------------------------------- */

            if (caractere === '"') {

                if (
                    dentroDasAspas &&
                    linha[i + 1] === '"'
                ) {

                    atual += '"';

                    i++;

                }
                else {

                    dentroDasAspas =
                        !dentroDasAspas;

                }


                continue;
            }


            /* ---------------------------------------------
               VÍRGULA FORA DAS ASPAS
            --------------------------------------------- */

            if (
                caractere === "," &&
                !dentroDasAspas
            ) {

                resultado.push(
                    atual.trim()
                );

                atual = "";

                continue;
            }


            atual += caractere;

        }


        resultado.push(
            atual.trim()
        );


        return resultado;

    }


    /* =====================================================
       NORMALIZAR CABEÇALHOS
    ===================================================== */

    function normalizarTexto(texto) {

        return String(texto || "")
            .replace(/^\uFEFF/, "")
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    }


    /* =====================================================
       ENCONTRAR CAMPO
    ===================================================== */

    function encontrarCampo(objeto, termo) {

        const procura =
            normalizarTexto(termo);


        const chave =
            Object.keys(objeto).find(
                (key) => {

                    return normalizarTexto(key)
                        .includes(procura);

                }
            );


        if (!chave) {
            return "";
        }


        return objeto[chave] || "";

    }


    /* =====================================================
       CRIAR PARTICIPANTES
    ===================================================== */

    function criarParticipantes(dados) {

        lista.innerHTML = "";


        const participantes =
            dados.filter((pessoa) => {

                const nome =
                    encontrarCampo(
                        pessoa,
                        "nome de aventureiro"
                    );


                return nome.trim() !== "";

            });


        if (participantes.length === 0) {

            lista.innerHTML = `
                <div class="participantes-erro">
                    Nenhum aventureiro foi encontrado.
                </div>
            `;

            return;
        }


        participantes.forEach(
            criarParticipante
        );

    }


    /* =====================================================
       CRIAR CARD
    ===================================================== */

    function criarParticipante(dados) {

        const nome =
            encontrarCampo(
                dados,
                "nome de aventureiro"
            ) || "Aventureiro";


        const classe =
            encontrarCampo(
                dados,
                "classe"
            );


        const jornada =
            encontrarCampo(
                dados,
                "jornada"
            );


        const descricao =
            encontrarCampo(
                dados,
                "descreva sobre seu personagem"
            ) ||
            "Este aventureiro ainda não revelou sua história.";


        const avatar =
            encontrarCampo(
                dados,
                "seu avatar"
            );


        const portal =
            encontrarCampo(
                dados,
                "portal de origem"
            );


        /* ---------------------------------------------
           CARD
        --------------------------------------------- */

        const card =
            document.createElement("div");

        card.className =
            "participante";


        /* ---------------------------------------------
           AVATAR
        --------------------------------------------- */

        const avatarContainer =
            document.createElement("div");

        avatarContainer.className =
            "participante-avatar";


        if (avatar) {

            const imagem =
                document.createElement("img");


            const urlsImagem =
                gerarUrlsImagemDrive(avatar);


            let tentativa = 0;


            imagem.src = urlsImagem[tentativa];


            imagem.alt =
                `Avatar de ${nome}`;


            imagem.loading = "lazy";


            /* tenta a próxima URL alternativa antes de desistir */
            imagem.onerror = () => {

                tentativa++;


                if (tentativa < urlsImagem.length) {

                    imagem.src =
                        urlsImagem[tentativa];

                }
                else {

                    imagem.style.display = "none";

                }

            };


            avatarContainer.appendChild(
                imagem
            );

        }
        else {

            avatarContainer.textContent = "🧙";

        }


        /* ---------------------------------------------
           NOME
        --------------------------------------------- */

        const nomeElemento =
            document.createElement("span");

        nomeElemento.className =
            "participante-nome";

        nomeElemento.textContent =
            nome;


        /* ---------------------------------------------
           CLASSE
        --------------------------------------------- */

        const classeElemento =
            document.createElement("span");

        classeElemento.className =
            "participante-classe";


        if (classe) {

            classeElemento.textContent =
                classe;

        }
        else {

            classeElemento.style.display =
                "none";

        }


        /* ---------------------------------------------
           TOOLTIP
        --------------------------------------------- */

        const tooltip =
            document.createElement("div");

        tooltip.className =
            "participante-descricao";


        const textoDescricao =
            document.createElement("span");

        textoDescricao.textContent =
            descricao;


        tooltip.appendChild(
            textoDescricao
        );


        /* ---------------------------------------------
           JORNADA
        --------------------------------------------- */

        if (jornada.trim() !== "") {

            const jornadaElemento =
                document.createElement("div");

            jornadaElemento.className =
                "tooltip-jornada";


            const jornadaTexto =
                document.createElement("strong");

            jornadaTexto.textContent =
                `🗺️ Jornada: ${jornada}`;


            jornadaElemento.appendChild(
                jornadaTexto
            );


            tooltip.appendChild(
                jornadaElemento
            );

        }


        /* ---------------------------------------------
           MONTAR CARD
        --------------------------------------------- */

        card.appendChild(
            avatarContainer
        );

        card.appendChild(
            nomeElemento
        );

        card.appendChild(
            classeElemento
        );

        card.appendChild(
            tooltip
        );


        /* ---------------------------------------------
           BLOG
        --------------------------------------------- */

        if (portal.trim() !== "") {

            card.classList.add(
                "tem-portal"
            );


            card.addEventListener(
                "click",
                () => {

                    abrirPortal(portal);

                }
            );

        }


        /* ---------------------------------------------
           MOBILE
        --------------------------------------------- */

        card.addEventListener(
            "click",
            (evento) => {

                if (window.innerWidth <= 600) {

                    const tooltipAberto =
                        card.classList.contains(
                            "mostrar-descricao"
                        );


                    if (!tooltipAberto) {

                        evento.preventDefault();

                        evento.stopImmediatePropagation();


                        document
                            .querySelectorAll(
                                ".participante.mostrar-descricao"
                            )
                            .forEach(
                                (outro) => {

                                    outro.classList.remove(
                                        "mostrar-descricao"
                                    );

                                }
                            );


                        card.classList.add(
                            "mostrar-descricao"
                        );

                    }

                }

            },
            true
        );


        lista.appendChild(
            card
        );

    }


    /* =====================================================
       GOOGLE DRIVE

       Aceita:

       drive.google.com/open?id=ID

       drive.google.com/file/d/ID/view

       drive.google.com/uc?id=ID

       CORREÇÃO: gera duas URLs candidatas (lh3, mais
       confiável para hotlink, e o /thumbnail antigo como
       reserva). O <img onerror> tenta a próxima se a
       primeira falhar.
    ===================================================== */

    function gerarUrlsImagemDrive(url) {

        if (!url) {
            return [];
        }


        url = url.trim();


        let id = null;


        /* ---------------------------------------------
           open?id=...
        --------------------------------------------- */

        const encontradoOpen =
            url.match(
                /[?&]id=([^&]+)/i
            );


        if (encontradoOpen) {

            id =
                encontradoOpen[1];

        }


        /* ---------------------------------------------
           /file/d/...
        --------------------------------------------- */

        if (!id) {

            const encontradoArquivo =
                url.match(
                    /\/file\/d\/([^/]+)/i
                );


            if (encontradoArquivo) {

                id =
                    encontradoArquivo[1];

            }

        }


        /* ---------------------------------------------
           /uc?id=...
        --------------------------------------------- */

        if (!id) {

            const encontradoUC =
                url.match(
                    /drive\.google\.com\/uc\?.*id=([^&]+)/i
                );


            if (encontradoUC) {

                id =
                    encontradoUC[1];

            }

        }


        /* ---------------------------------------------
           NÃO ENCONTROU ID
        --------------------------------------------- */

        if (!id) {

            console.warn(
                "Não foi possível encontrar o ID do Drive:",
                url
            );

            return [url];
        }


        const idCodificado =
            encodeURIComponent(id);


        return [
            "https://lh3.googleusercontent.com/d/" + idCodificado + "=w500",
            "https://drive.google.com/thumbnail?id=" + idCodificado + "&sz=w500"
        ];

    }


    /* =====================================================
       ABRIR BLOG
    ===================================================== */

    function abrirPortal(url) {

        let endereco =
            url.trim();


        if (
            !/^https?:\/\//i.test(endereco)
        ) {

            endereco =
                "https://" +
                endereco;

        }


        window.open(
            endereco,
            "_blank",
            "noopener,noreferrer"
        );

    }

});