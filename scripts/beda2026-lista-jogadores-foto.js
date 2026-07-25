/* ==========================================================
   PARTICIPANTES — GUARDIÕES DA BLOGOSFERA
========================================================== */


/* ==========================================================
   GOOGLE SHEETS
========================================================== */

const URL_PARTICIPANTES =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=2069176218&single=true&output=csv";


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const popup =
            document.getElementById(
                "popup-participantes"
            );

        const botaoAbrir =
            document.getElementById(
                "abrir-participantes"
            );

        const botaoFechar =
            document.getElementById(
                "fechar-participantes"
            );

        const lista =
            document.getElementById(
                "lista-participantes"
            );

        const overlay =
            popup
                ? popup.querySelector(
                    ".popup-overlay"
                )
                : null;


        /* ==================================================
           VERIFICAR ELEMENTOS
        ================================================== */

        console.log(
            "Popup:",
            popup
        );

        console.log(
            "Botão:",
            botaoAbrir
        );

        console.log(
            "Lista:",
            lista
        );


        if (
            !popup ||
            !botaoAbrir ||
            !botaoFechar ||
            !lista
        ) {

            console.error(
                "❌ Elementos do popup não encontrados."
            );

            return;

        }


        /* ==================================================
           ABRIR POPUP
        ================================================== */

        botaoAbrir.addEventListener(
            "click",
            function () {

                popup.classList.add(
                    "aberto"
                );

                popup.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";


                carregarParticipantes();

            }
        );


        /* ==================================================
           FECHAR POPUP
        ================================================== */

        function fecharPopup() {

            popup.classList.remove(
                "aberto"
            );

            popup.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";

        }


        botaoFechar.addEventListener(
            "click",
            fecharPopup
        );


        /* ==================================================
           FECHAR CLICANDO NO FUNDO
        ================================================== */

        if (overlay) {

            overlay.addEventListener(
                "click",
                fecharPopup
            );

        }


        /* ==================================================
           FECHAR COM ESC
        ================================================== */

        document.addEventListener(
            "keydown",
            function (evento) {

                if (
                    evento.key === "Escape" &&
                    popup.classList.contains(
                        "aberto"
                    )
                ) {

                    fecharPopup();

                }

            }
        );


        /* ==================================================
           CARREGAR PARTICIPANTES
        ================================================== */

        async function carregarParticipantes() {

            lista.innerHTML = `
                <div class="participantes-carregando">
                    Consultando os registros da
                    Biblioteca Eterna...
                </div>
            `;


            try {

                const resposta =
                    await fetch(
                        URL_PARTICIPANTES,
                        {
                            cache: "no-store"
                        }
                    );


                if (!resposta.ok) {

                    throw new Error(
                        "Erro HTTP: " +
                        resposta.status
                    );

                }


                const csv =
                    await resposta.text();


                console.log(
                    "CSV recebido:",
                    csv
                );


                const dados =
                    csvParaObjetos(
                        csv
                    );


                console.log(
                    "Participantes encontrados:",
                    dados.length
                );


                criarParticipantes(
                    dados
                );

            }

            catch (erro) {

                console.error(
                    "❌ Erro ao carregar participantes:",
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


        /* ==================================================
           CSV → OBJETOS
        ================================================== */

        function csvParaObjetos(csv) {

            const linhas =
                separarLinhasCSV(
                    csv
                );


            if (
                !linhas ||
                linhas.length === 0
            ) {

                return [];

            }


            /* ==============================================
               CABEÇALHOS
            ============================================== */

            const cabecalhos =
                parseCSVLine(
                    linhas[0]
                ).map(
                    function (campo) {

                        return normalizarTexto(
                            campo
                        );

                    }
                );


            console.log(
                "Cabeçalhos encontrados:",
                cabecalhos
            );


            const dados = [];


            /* ==============================================
               LINHAS
            ============================================== */

            for (
                let i = 1;
                i < linhas.length;
                i++
            ) {

                if (
                    !linhas[i] ||
                    !linhas[i].trim()
                ) {

                    continue;

                }


                const valores =
                    parseCSVLine(
                        linhas[i]
                    );


                const objeto = {};


                cabecalhos.forEach(
                    function (
                        cabecalho,
                        index
                    ) {

                        objeto[cabecalho] =
                            valores[index] !== undefined
                                ? valores[index].trim()
                                : "";

                    }
                );


                dados.push(
                    objeto
                );

            }


            return dados;

        }


        /* ==================================================
           SEPARAR LINHAS DO CSV
           
           Importante:
           não quebra linhas dentro de aspas.
           
           Isso permite que a descrição tenha:
           - vírgulas
           - quebras de linha
           - textos longos
        ================================================== */

        function separarLinhasCSV(csv) {

            const linhas = [];

            let atual = "";

            let dentroDasAspas = false;


            for (
                let i = 0;
                i < csv.length;
                i++
            ) {

                const caractere =
                    csv[i];


                /* ==========================================
                   ASPAS
                ========================================== */

                if (
                    caractere === '"'
                ) {

                    /*
                     * Duas aspas dentro de uma célula
                     * representam uma aspa real.
                     */

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

                    }


                    continue;

                }


                /* ==========================================
                   QUEBRA DE LINHA
                ========================================== */

                if (
                    (
                        caractere === "\n" ||
                        caractere === "\r"
                    ) &&
                    !dentroDasAspas
                ) {

                    /*
                     * Windows:
                     * \r\n
                     */

                    if (
                        caractere === "\r" &&
                        csv[i + 1] === "\n"
                    ) {

                        i++;

                    }


                    linhas.push(
                        atual
                    );


                    atual = "";


                    continue;

                }


                atual +=
                    caractere;

            }


            /* ==============================================
               ÚLTIMA LINHA
            ============================================== */

            if (
                atual.length > 0
            ) {

                linhas.push(
                    atual
                );

            }


            return linhas;

        }


        /* ==================================================
           PARSER CSV
           
           Esta é a parte mais importante.

           NÃO usamos:

           linha.split(",")

           porque isso quebraria:

           "Sou aventureiro, escritor e viajante"

           em várias colunas.
        ================================================== */

        function parseCSVLine(linha) {

            const resultado = [];

            let atual = "";

            let dentroDasAspas = false;


            for (
                let i = 0;
                i < linha.length;
                i++
            ) {

                const caractere =
                    linha[i];


                /* ==========================================
                   ASPAS
                ========================================== */

                if (
                    caractere === '"'
                ) {

                    /*
                     * Duas aspas seguidas dentro de
                     * uma célula representam uma aspa.
                     */

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


                /* ==========================================
                   VÍRGULA
                ========================================== */

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


                /* ==========================================
                   TEXTO
                ========================================== */

                atual +=
                    caractere;

            }


            /* ==============================================
               ÚLTIMA COLUNA
            ============================================== */

            resultado.push(
                atual.trim()
            );


            return resultado;

        }


        /* ==================================================
           NORMALIZAR TEXTO
           
           Remove:
           - espaços extras
           - acentos
           - BOM do CSV
           - diferença entre maiúsculas/minúsculas
           
           Isso facilita encontrar:
           
           🗺️ Jornada
           
           como:
           
           jornada
        ================================================== */

        function normalizarTexto(texto) {

            return String(texto || "")
                .replace(
                    /^\uFEFF/,
                    ""
                )
                .trim()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .toLowerCase();

        }


        /* ==================================================
           ENCONTRAR CAMPO
        ================================================== */

        function encontrarCampo(
            objeto,
            termo
        ) {

            const termoNormalizado =
                normalizarTexto(
                    termo
                );


            const chave =
                Object.keys(
                    objeto
                ).find(
                    function (key) {

                        const chaveNormalizada =
                            normalizarTexto(
                                key
                            );


                        return chaveNormalizada
                            .includes(
                                termoNormalizado
                            );

                    }
                );


            if (!chave) {

                console.warn(
                    "⚠️ Campo não encontrado:",
                    termo
                );

                return "";

            }


            return (
                objeto[chave] || ""
            );

        }


        /* ==================================================
           CRIAR PARTICIPANTES
        ================================================== */

        function criarParticipantes(
            dados
        ) {

            lista.innerHTML = "";


            const participantes =
                dados.filter(
                    function (pessoa) {

                        const nome =
                            encontrarCampo(
                                pessoa,
                                "nome de aventureiro"
                            );


                        return (
                            nome &&
                            nome.trim() !== ""
                        );

                    }
                );


            console.log(
                "Aventureiros válidos:",
                participantes.length
            );


            if (
                participantes.length === 0
            ) {

                lista.innerHTML = `
                    <div class="participantes-erro">
                        Nenhum aventureiro foi encontrado.
                    </div>
                `;

                return;

            }


            participantes.forEach(
                function (participante) {

                    criarParticipante(
                        participante
                    );

                }
            );

        }


        /* ==================================================
           CRIAR CARD
        ================================================== */

        function criarParticipante(
            dados
        ) {

            /* ==============================================
               DADOS DA PLANILHA
            ============================================== */

            const nome =
                encontrarCampo(
                    dados,
                    "nome de aventureiro"
                ) ||
                "Aventureiro";


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


            /* ==============================================
               DEBUG
            ============================================== */

            console.log(
                "--------------------------------"
            );

            console.log(
                "Nome:",
                nome
            );

            console.log(
                "Classe:",
                classe
            );

            console.log(
                "Jornada:",
                jornada
            );

            console.log(
                "Descrição:",
                descricao
            );

            console.log(
                "Avatar:",
                avatar
            );

            console.log(
                "Portal:",
                portal
            );


            /* ==============================================
               CARD
            ============================================== */

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "participante";


            /* ==============================================
               AVATAR
            ============================================== */

            const avatarContainer =
                document.createElement(
                    "div"
                );

            avatarContainer.className =
                "participante-avatar";


            if (avatar) {

                const imagem =
                    document.createElement(
                        "img"
                    );


                imagem.src =
                    converterImagemDrive(
                        avatar
                    );


                imagem.alt =
                    `Avatar de ${nome}`;


                imagem.loading =
                    "lazy";


                imagem.onerror =
                    function () {

                        console.warn(
                            "Imagem não carregou:",
                            avatar
                        );


                        imagem.style.display =
                            "none";

                    };


                avatarContainer.appendChild(
                    imagem
                );

            }

            else {

                avatarContainer.textContent =
                    "🧙";

            }


            /* ==============================================
               NOME
            ============================================== */

            const nomeElemento =
                document.createElement(
                    "span"
                );

            nomeElemento.className =
                "participante-nome";

            nomeElemento.textContent =
                nome;


            /* ==============================================
               CLASSE
            ============================================== */

            const classeElemento =
                document.createElement(
                    "span"
                );

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


            /* ==============================================
               TOOLTIP / DESCRIÇÃO
            ============================================== */

            const descricaoElemento =
                document.createElement(
                    "div"
                );

            descricaoElemento.className =
                "participante-descricao";


            const descricaoTexto =
                document.createElement(
                    "span"
                );

            descricaoTexto.textContent =
                descricao;


            descricaoElemento.appendChild(
                descricaoTexto
            );


            /* ==============================================
               JORNADA
            ============================================== */

            if (
                jornada &&
                jornada.trim() !== ""
            ) {

                const jornadaElemento =
                    document.createElement(
                        "div"
                    );

                jornadaElemento.className =
                    "tooltip-jornada";


                const jornadaTexto =
                    document.createElement(
                        "strong"
                    );


                jornadaTexto.textContent =
                    `🗺️ Jornada: ${jornada}`;


                jornadaElemento.appendChild(
                    jornadaTexto
                );


                descricaoElemento.appendChild(
                    jornadaElemento
                );

            }


            /* ==============================================
               MONTAR CARD
            ============================================== */

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
                descricaoElemento
            );


            /* ==============================================
               PORTAL
            ============================================== */

            if (
                portal &&
                portal.trim() !== ""
            ) {

                card.classList.add(
                    "tem-portal"
                );


                card.addEventListener(
                    "click",
                    function () {

                        abrirPortal(
                            portal
                        );

                    }
                );

            }


            /* ==============================================
               MOBILE
               
               No telemóvel:
               
               1º toque = mostra descrição
               2º toque = abre o blog
            ============================================== */

            card.addEventListener(
                "click",
                function (evento) {

                    if (
                        window.innerWidth <= 600
                    ) {

                        const mostrando =
                            card.classList.contains(
                                "mostrar-descricao"
                            );


                        if (!mostrando) {

                            evento.preventDefault();

                            evento.stopImmediatePropagation();


                            document
                                .querySelectorAll(
                                    ".participante.mostrar-descricao"
                                )
                                .forEach(
                                    function (outro) {

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


            /* ==============================================
               INSERIR NA LISTA
            ============================================== */

            lista.appendChild(
                card
            );

        }


        /* ==================================================
           CONVERTER IMAGEM DO GOOGLE DRIVE
           
           Aceita:

           https://drive.google.com/open?id=ABC

           https://drive.google.com/file/d/ABC/view

           https://drive.google.com/uc?id=ABC
        ================================================== */

        function converterImagemDrive(
            url
        ) {

            if (!url) {

                return "";

            }


            url =
                url.trim();


            let id = null;


            /* ==============================================
               open?id=
            ============================================== */

            const encontradoOpen =
                url.match(
                    /[?&]id=([^&]+)/i
                );


            if (
                encontradoOpen
            ) {

                id =
                    encontradoOpen[1];

            }


            /* ==============================================
               /file/d/
            ============================================== */

            if (!id) {

                const encontradoArquivo =
                    url.match(
                        /\/file\/d\/([^/]+)/i
                    );


                if (
                    encontradoArquivo
                ) {

                    id =
                        encontradoArquivo[1];

                }

            }


            /* ==============================================
               /uc?id=
            ============================================== */

            if (!id) {

                const encontradoUC =
                    url.match(
                        /drive\.google\.com\/uc\?.*id=([^&]+)/i
                    );


                if (
                    encontradoUC
                ) {

                    id =
                        encontradoUC[1];

                }

            }


            /* ==============================================
               NÃO ENCONTROU ID
            ============================================== */

            if (!id) {

                console.warn(
                    "⚠️ Não foi possível encontrar o ID do Drive:",
                    url
                );


                return url;

            }


            /* ==============================================
               URL DA THUMBNAIL
            ============================================== */

            return (
                "https://drive.google.com/thumbnail" +
                "?id=" +
                encodeURIComponent(id) +
                "&sz=w500"
            );

        }


        /* ==================================================
           ABRIR PORTAL
        ================================================== */

        function abrirPortal(
            url
        ) {

            let endereco =
                url.trim();


            if (
                !/^https?:\/\//i.test(
                    endereco
                )
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

    }
);