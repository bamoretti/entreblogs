/* ==========================================================
   PARTICIPANTES DA BLOGOSFERA
========================================================== */


/* ==========================================================
   GOOGLE SHEETS
========================================================== */

const URL_PARTICIPANTES =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=2069176218&single=true&output=csv";


/* ==========================================================
   ELEMENTOS
========================================================== */

const popup =
    document.getElementById("popup-participantes");

const abrir =
    document.getElementById("abrir-participantes");

const fechar =
    document.getElementById("fechar-participantes");

const lista =
    document.getElementById("lista-participantes");

const overlay =
    popup
        ? popup.querySelector(".popup-overlay")
        : null;


/* ==========================================================
   ABRIR
========================================================== */

if(abrir){

    abrir.addEventListener(
        "click",
        abrirPopup
    );

}


function abrirPopup(){

    popup.classList.add("aberto");

    document.body.style.overflow =
        "hidden";

    carregarParticipantes();

}


/* ==========================================================
   FECHAR
========================================================== */

if(fechar){

    fechar.addEventListener(
        "click",
        fecharPopup
    );

}


if(overlay){

    overlay.addEventListener(
        "click",
        fecharPopup
    );

}


function fecharPopup(){

    popup.classList.remove(
        "aberto"
    );

    document.body.style.overflow =
        "";

}


/* ==========================================================
   ESC
========================================================== */

document.addEventListener(
    "keydown",
    function(evento){

        if(
            evento.key === "Escape" &&
            popup.classList.contains("aberto")
        ){

            fecharPopup();

        }

    }
);


/* ==========================================================
   CARREGAR PARTICIPANTES
========================================================== */

async function carregarParticipantes(){

    lista.innerHTML = `
        <div class="participantes-carregando">
            Consultando os registros da Biblioteca Eterna...
        </div>
    `;


    try{

        const resposta =
            await fetch(
                URL_PARTICIPANTES,
                {
                    cache: "no-store"
                }
            );


        if(!resposta.ok){

            throw new Error(
                `Erro HTTP: ${resposta.status}`
            );

        }


        const csv =
            await resposta.text();


        const dados =
            csvParaObjetos(csv);


        criarParticipantes(
            dados
        );

    }

    catch(erro){

        console.error(
            "Erro ao carregar participantes:",
            erro
        );


        lista.innerHTML = `
            <div class="participantes-erro">

                Não foi possível consultar os
                aventureiros da Blogosfera.

            </div>
        `;

    }

}


/* ==========================================================
   CSV → OBJETOS
========================================================== */

function csvParaObjetos(csv){

    const linhas =
        separarLinhasCSV(csv);


    if(!linhas.length){

        return [];

    }


    const cabecalhos =
        parseCSVLine(
            linhas[0]
        ).map(
            cabecalho =>
                normalizarTexto(
                    cabecalho
                )
        );


    const dados = [];


    for(
        let i = 1;
        i < linhas.length;
        i++
    ){

        if(
            !linhas[i] ||
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


/* ==========================================================
   SEPARAR LINHAS
========================================================== */

function separarLinhasCSV(csv){

    const linhas = [];

    let atual = "";

    let dentroAspas = false;


    for(
        let i = 0;
        i < csv.length;
        i++
    ){

        const caractere =
            csv[i];


        if(
            caractere === '"'
        ){

            if(
                dentroAspas &&
                csv[i + 1] === '"'
            ){

                atual += '""';

                i++;

                continue;

            }


            dentroAspas =
                !dentroAspas;


            atual +=
                caractere;


            continue;

        }


        if(
            (
                caractere === "\n" ||
                caractere === "\r"
            ) &&
            !dentroAspas
        ){

            if(
                caractere === "\r" &&
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


        atual +=
            caractere;

    }


    if(atual){

        linhas.push(
            atual
        );

    }


    return linhas;

}


/* ==========================================================
   PARSER CSV
========================================================== */

function parseCSVLine(linha){

    const resultado = [];

    let atual = "";

    let dentroAspas = false;


    for(
        let i = 0;
        i < linha.length;
        i++
    ){

        const caractere =
            linha[i];


        if(
            caractere === '"'
        ){

            if(
                dentroAspas &&
                linha[i + 1] === '"'
            ){

                atual += '"';

                i++;

            }

            else{

                dentroAspas =
                    !dentroAspas;

            }


            continue;

        }


        if(
            caractere === "," &&
            !dentroAspas
        ){

            resultado.push(
                atual
            );

            atual = "";

            continue;

        }


        atual +=
            caractere;

    }


    resultado.push(
        atual
    );


    return resultado;

}


/* ==========================================================
   NORMALIZAR TEXTO
========================================================== */

function normalizarTexto(texto){

    return texto
        .replace(/^\uFEFF/, "")
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/* ==========================================================
   PROCURAR COLUNA
==========================================================

   Agora não dependemos do nome EXATO da coluna.

   Exemplo:

   "🗺️ Jornada"

   vira:

   "jornada"

   e será encontrado normalmente.
========================================================== */

function encontrarCampo(
    objeto,
    termo
){

    const termoNormalizado =
        normalizarTexto(
            termo
        );


    const chave =
        Object.keys(objeto)
            .find(
                chave => {

                    const chaveNormalizada =
                        normalizarTexto(
                            chave
                        );


                    return chaveNormalizada
                        .includes(
                            termoNormalizado
                        );

                }
            );


    if(!chave){

        return "";

    }


    return objeto[chave] || "";

}


/* ==========================================================
   CRIAR PARTICIPANTES
========================================================== */

function criarParticipantes(dados){

    lista.innerHTML = "";


    const participantes =
        dados.filter(
            participante => {

                const nome =
                    encontrarCampo(
                        participante,
                        "nome de aventureiro"
                    );


                return (
                    nome &&
                    nome.trim() !== ""
                );

            }
        );


    if(
        participantes.length === 0
    ){

        lista.innerHTML = `
            <div class="participantes-erro">
                Nenhum aventureiro foi encontrado.
            </div>
        `;

        return;

    }


    participantes.forEach(
        participante => {

            criarParticipante(
                participante
            );

        }
    );

}


/* ==========================================================
   CRIAR PARTICIPANTE
========================================================== */

function criarParticipante(dados){


    /* ======================================================
       DADOS
    ====================================================== */

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


    const descricao =
        encontrarCampo(
            dados,
            "descreva sobre seu personagem"
        ) ||
        "Este aventureiro ainda não revelou sua história.";


    const jornada =
        encontrarCampo(
            dados,
            "jornada"
        );


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


    /* ======================================================
       DEBUG
    ======================================================

       Se quiser verificar o que está vindo da planilha,
       abra F12 → Console.
    */

    console.log(
        "Aventureiro:",
        nome,
        "| Classe:",
        classe,
        "| Jornada:",
        jornada
    );


    /* ======================================================
       PARTICIPANTE
    ====================================================== */

    const participante =
        document.createElement("div");

    participante.className =
        "participante";


    /* ======================================================
       AVATAR
    ====================================================== */

    const avatarContainer =
        document.createElement("div");

    avatarContainer.className =
        "participante-avatar";


    if(avatar){

        const imagem =
            document.createElement("img");


        imagem.src =
            converterImagemDrive(
                avatar
            );


        imagem.alt =
            `Avatar de ${nome}`;


        imagem.loading =
            "lazy";


        imagem.onerror =
            function(){

                imagem.style.display =
                    "none";

            };


        avatarContainer.appendChild(
            imagem
        );

    }

    else{

        avatarContainer.textContent =
            "🧙";

    }


    /* ======================================================
       NOME
    ====================================================== */

    const nomeElemento =
        document.createElement("span");

    nomeElemento.className =
        "participante-nome";

    nomeElemento.textContent =
        nome;


    /* ======================================================
       CLASSE
    ====================================================== */

    const classeElemento =
        document.createElement("span");

    classeElemento.className =
        "participante-classe";


    if(classe){

        classeElemento.textContent =
            classe;

    }

    else{

        classeElemento.style.display =
            "none";

    }


    /* ======================================================
       DESCRIÇÃO
    ====================================================== */

    const descricaoElemento =
        document.createElement("div");

    descricaoElemento.className =
        "participante-descricao";


    const descricaoTexto =
        document.createElement("span");

    descricaoTexto.textContent =
        descricao;


    descricaoElemento.appendChild(
        descricaoTexto
    );


    /* ======================================================
       JORNADA
    ====================================================== */

    if(jornada){

        const separador =
            document.createElement("div");

        separador.className =
            "tooltip-jornada";


        const jornadaElemento =
            document.createElement("strong");


        jornadaElemento.textContent =
            `${jornada}`;


        separador.appendChild(
            jornadaElemento
        );


        descricaoElemento.appendChild(
            separador
        );

    }


    /* ======================================================
       MONTAR
    ====================================================== */

    participante.appendChild(
        avatarContainer
    );


    participante.appendChild(
        nomeElemento
    );


    participante.appendChild(
        classeElemento
    );


    participante.appendChild(
        descricaoElemento
    );


    /* ======================================================
       PORTAL
    ====================================================== */

    if(portal){

        participante.classList.add(
            "tem-portal"
        );


        participante.addEventListener(
            "click",
            function(){

                abrirPortal(
                    portal
                );

            }
        );

    }


    /* ======================================================
       MOBILE
    ====================================================== */

    participante.addEventListener(
        "click",
        function(evento){

            if(
                window.innerWidth <= 600
            ){

                if(
                    !participante.classList.contains(
                        "mostrar-descricao"
                    )
                ){

                    evento.preventDefault();

                    evento.stopImmediatePropagation();


                    document
                        .querySelectorAll(
                            ".participante.mostrar-descricao"
                        )
                        .forEach(
                            outro => {

                                outro.classList.remove(
                                    "mostrar-descricao"
                                );

                            }
                        );


                    participante.classList.add(
                        "mostrar-descricao"
                    );

                }

            }

        },
        true
    );


    /* ======================================================
       INSERIR
    ====================================================== */

    lista.appendChild(
        participante
    );

}


/* ==========================================================
   GOOGLE DRIVE
========================================================== */

function converterImagemDrive(url){

    if(!url){

        return "";

    }


    url =
        url.trim();


    let id = null;


    /* open?id= */

    const encontradoOpen =
        url.match(
            /[?&]id=([^&]+)/i
        );


    if(encontradoOpen){

        id =
            encontradoOpen[1];

    }


    /* file/d/ */

    if(!id){

        const encontradoArquivo =
            url.match(
                /\/file\/d\/([^/]+)/i
            );


        if(encontradoArquivo){

            id =
                encontradoArquivo[1];

        }

    }


    /* uc?id= */

    if(!id){

        const encontradoUC =
            url.match(
                /drive\.google\.com\/uc\?.*id=([^&]+)/i
            );


        if(encontradoUC){

            id =
                encontradoUC[1];

        }

    }


    if(!id){

        return url;

    }


    return (
        "https://drive.google.com/thumbnail" +
        "?id=" +
        encodeURIComponent(id) +
        "&sz=w500"
    );

}


/* ==========================================================
   ABRIR PORTAL
========================================================== */

function abrirPortal(url){

    let endereco =
        url.trim();


    if(
        !endereco.startsWith("http://") &&
        !endereco.startsWith("https://")
    ){

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