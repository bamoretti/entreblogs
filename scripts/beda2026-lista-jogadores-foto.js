const URL_PARTICIPANTES =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=2069176218&single=true&output=csv";


document.addEventListener(
    "DOMContentLoaded",
    function(){

        const popup =
            document.getElementById(
                "popup-participantes"
            );

        const abrir =
            document.getElementById(
                "abrir-participantes"
            );

        const fechar =
            document.getElementById(
                "fechar-participantes"
            );

        const lista =
            document.getElementById(
                "lista-participantes"
            );

        const overlay =
            popup?.querySelector(
                ".popup-overlay"
            );


        /* ==================================================
           VERIFICAÇÃO
        ================================================== */

        console.log(
            "Popup:",
            popup
        );

        console.log(
            "Botão:",
            abrir
        );

        console.log(
            "Lista:",
            lista
        );


        if(
            !popup ||
            !abrir ||
            !fechar ||
            !lista
        ){

            console.error(
                "❌ Elementos do popup não encontrados."
            );

            return;

        }


        /* ==================================================
           ABRIR
        ================================================== */

        abrir.addEventListener(
            "click",
            function(){

                console.log(
                    "🧙 Abrindo participantes..."
                );


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
           FECHAR
        ================================================== */

        function fecharPopup(){

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


        fechar.addEventListener(
            "click",
            fecharPopup
        );


        if(overlay){

            overlay.addEventListener(
                "click",
                fecharPopup
            );

        }


        document.addEventListener(
            "keydown",
            function(event){

                if(
                    event.key === "Escape" &&
                    popup.classList.contains(
                        "aberto"
                    )
                ){

                    fecharPopup();

                }

            }
        );


        /* ==================================================
           CARREGAR PLANILHA
        ================================================== */

        async function carregarParticipantes(){

            lista.innerHTML = `
                <div class="participantes-carregando">
                    Consultando os registros da
                    Biblioteca Eterna...
                </div>
            `;


            try{

                const resposta =
                    await fetch(
                        URL_PARTICIPANTES,
                        {
                            cache:"no-store"
                        }
                    );


                if(!resposta.ok){

                    throw new Error(
                        "Erro HTTP " +
                        resposta.status
                    );

                }


                const csv =
                    await resposta.text();


                const dados =
                    csvParaObjetos(
                        csv
                    );


                criarParticipantes(
                    dados
                );

            }

            catch(erro){

                console.error(
                    "❌ Erro:",
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
           CSV
        ================================================== */

        function csvParaObjetos(csv){

            const linhas =
                separarLinhasCSV(
                    csv
                );


            const cabecalhos =
                parseCSVLine(
                    linhas[0]
                ).map(
                    campo =>
                        normalizar(
                            campo
                        )
                );


            const dados = [];


            for(
                let i = 1;
                i < linhas.length;
                i++
            ){

                if(
                    !linhas[i].trim()
                ){

                    continue;

                }


                const valores =
                    parseCSVLine(
                        linhas[i]
                    );


                const objeto = {};


                cabecalhos.forEach(
                    (
                        cabecalho,
                        index
                    )=>{

                        objeto[cabecalho] =
                            (
                                valores[index] ||
                                ""
                            ).trim();

                    }
                );


                dados.push(
                    objeto
                );

            }


            return dados;

        }


        /* ==================================================
           LINHAS CSV
        ================================================== */

        function separarLinhasCSV(csv){

            const linhas = [];

            let atual = "";

            let aspas = false;


            for(
                let i = 0;
                i < csv.length;
                i++
            ){

                const c =
                    csv[i];


                if(c === '"'){

                    if(
                        aspas &&
                        csv[i + 1] === '"'
                    ){

                        atual += '""';

                        i++;

                    }

                    else{

                        aspas =
                            !aspas;

                    }

                    continue;

                }


                if(
                    (
                        c === "\n" ||
                        c === "\r"
                    ) &&
                    !aspas
                ){

                    if(
                        c === "\r" &&
                        csv[i + 1] === "\n"
                    ){

                        i++;

                    }


                    linhas.push(
                        atual
                    );

                    atual = "";

                    continue;

                }


                atual += c;

            }


            if(atual){

                linhas.push(
                    atual
                );

            }


            return linhas;

        }


        /* ==================================================
           PARSER CSV
        ================================================== */

        function parseCSVLine(linha){

            const resultado = [];

            let atual = "";

            let aspas = false;


            for(
                let i = 0;
                i < linha.length;
                i++
            ){

                const c =
                    linha[i];


                if(c === '"'){

                    if(
                        aspas &&
                        linha[i + 1] === '"'
                    ){

                        atual += '"';

                        i++;

                    }

                    else{

                        aspas =
                            !aspas;

                    }

                    continue;

                }


                if(
                    c === "," &&
                    !aspas
                ){

                    resultado.push(
                        atual
                    );

                    atual = "";

                    continue;

                }


                atual += c;

            }


            resultado.push(
                atual
            );


            return resultado;

        }


        /* ==================================================
           NORMALIZAR
        ================================================== */

        function normalizar(texto){

            return texto
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

        function campo(
            objeto,
            procurar
        ){

            const chave =
                Object.keys(objeto)
                    .find(
                        key =>
                            key.includes(
                                normalizar(
                                    procurar
                                )
                            )
                    );


            return chave
                ? objeto[chave]
                : "";

        }


        /* ==================================================
           PARTICIPANTES
        ================================================== */

        function criarParticipantes(
            dados
        ){

            lista.innerHTML = "";


            dados
                .filter(
                    pessoa =>
                        campo(
                            pessoa,
                            "nome de aventureiro"
                        )
                )
                .forEach(
                    criarParticipante
                );

        }


        /* ==================================================
           CARD
        ================================================== */

        function criarParticipante(
            dados
        ){

            const nome =
                campo(
                    dados,
                    "nome de aventureiro"
                );


            const classe =
                campo(
                    dados,
                    "classe"
                );


            const descricao =
                campo(
                    dados,
                    "descreva sobre seu personagem"
                );


            const jornada =
                campo(
                    dados,
                    "jornada"
                );


            const avatar =
                campo(
                    dados,
                    "seu avatar"
                );


            const portal =
                campo(
                    dados,
                    "portal de origem"
                );


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "participante";


            /* Avatar */

            const avatarDiv =
                document.createElement(
                    "div"
                );

            avatarDiv.className =
                "participante-avatar";


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                converterDrive(
                    avatar
                );


            img.alt =
                "Avatar de " +
                nome;


            avatarDiv.appendChild(
                img
            );


            /* Nome */

            const nomeDiv =
                document.createElement(
                    "span"
                );

            nomeDiv.className =
                "participante-nome";

            nomeDiv.textContent =
                nome;


            /* Classe */

            const classeDiv =
                document.createElement(
                    "span"
                );

            classeDiv.className =
                "participante-classe";

            classeDiv.textContent =
                classe;


            /* Descrição */

            const tooltip =
                document.createElement(
                    "div"
                );

            tooltip.className =
                "participante-descricao";


            const texto =
                document.createElement(
                    "span"
                );

            texto.textContent =
                descricao ||
                "Este aventureiro ainda não revelou sua história.";


            tooltip.appendChild(
                texto
            );


            /* Jornada */

            if(jornada){

                const jornadaDiv =
                    document.createElement(
                        "div"
                    );

                jornadaDiv.className =
                    "tooltip-jornada";


                const strong =
                    document.createElement(
                        "strong"
                    );

                strong.textContent =
                    "🗺️ Jornada: " +
                    jornada;


                jornadaDiv.appendChild(
                    strong
                );


                tooltip.appendChild(
                    jornadaDiv
                );

            }


            /* Montar */

            card.appendChild(
                avatarDiv
            );

            card.appendChild(
                nomeDiv
            );

            card.appendChild(
                classeDiv
            );

            card.appendChild(
                tooltip
            );


            /* Portal */

            if(portal){

                card.classList.add(
                    "tem-portal"
                );


                card.addEventListener(
                    "click",
                    function(){

                        let url =
                            portal.trim();


                        if(
                            !/^https?:\/\//i.test(
                                url
                            )
                        ){

                            url =
                                "https://" +
                                url;

                        }


                        window.open(
                            url,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }
                );

            }


            /* Mobile */

            card.addEventListener(
                "click",
                function(event){

                    if(
                        window.innerWidth <= 600
                    ){

                        if(
                            !card.classList.contains(
                                "mostrar-descricao"
                            )
                        ){

                            event.preventDefault();

                            document
                                .querySelectorAll(
                                    ".participante.mostrar-descricao"
                                )
                                .forEach(
                                    outro =>
                                        outro.classList.remove(
                                            "mostrar-descricao"
                                        )
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


        /* ==================================================
           DRIVE
        ================================================== */

        function converterDrive(url){

            if(!url){

                return "";

            }


            const match =
                url.match(
                    /(?:id=|\/d\/)([^/&?]+)/
                );


            if(!match){

                return url;

            }


            return (
                "https://drive.google.com/thumbnail" +
                "?id=" +
                encodeURIComponent(
                    match[1]
                ) +
                "&sz=w500"
            );

        }

    }
);