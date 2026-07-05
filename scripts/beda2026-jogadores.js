/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const URL_PLAYERS =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=809160378&single=true&output=csv";

const URL_MEDALHAS =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=26031933&single=true&output=csv";


let PLAYERS = [];

let MEDALHAS = {};


/* ==========================================================
   CACHE
========================================================== */

function getCache(url){

    try{

        const cache = localStorage.getItem(url);

        if(!cache) return null;

        const dados = JSON.parse(cache);

        if(Date.now() - dados.time > CACHE_TIME){

            localStorage.removeItem(url);

            return null;

        }

        return dados.data;

    }

    catch{

        return null;

    }

}

function setCache(url,data){

    localStorage.setItem(

        url,

        JSON.stringify({

            time:Date.now(),

            data

        })

    );

}


/* ==========================================================
   DOWNLOAD CSV
========================================================== */

async function fetchCSV(url){

    const cache = getCache(url);

    if(cache){

        return cache;

    }

    const resp = await fetch(url);

    if(!resp.ok){

        throw new Error("Erro ao carregar " + url);

    }

    const csv = await resp.text();

    setCache(url,csv);

    return csv;

}


/* ==========================================================
   PARSER CSV
========================================================== */

function parseCSVLine(line){

    const result=[];

    let current="";

    let inQuotes=false;

    for(let i=0;i<line.length;i++){

        const char=line[i];

        if(char=='"' && line[i+1]=='"'){

            current+='"';

            i++;

        }

        else if(char=='"'){

            inQuotes=!inQuotes;

        }

        else if(char=="," && !inQuotes){

            result.push(current);

            current="";

        }

        else{

            current+=char;

        }

    }

    result.push(current);

    return result;

}


/* ==========================================================
   JOGADORES
========================================================== */

function processarJogadores(csv){

    PLAYERS = [];

    const linhas = csv.trim().split(/\r?\n/);

    const cabecalho = parseCSVLine(linhas.shift());

    linhas.forEach(linha=>{

        const cols = parseCSVLine(linha);

        const obj = {};

        cabecalho.forEach((coluna,i)=>{

            obj[coluna.trim()] = cols[i]?.trim() || "";

        });

        /* ignora quem não tem personagem */

        if(!obj["Personagem"]) return;

        if(obj["Personagem"].trim()==="") return;

        PLAYERS.push({

            blog:

                obj["Nome do Blog"],

            link:

                obj["Link"],

            personagem:

                obj["Personagem"],

            classeInicial:

                obj["Classe Inicial"],

            classeAtual:

                obj["Classe Atual"],

            participacoes:

                Number(obj["Participações"]) || 0,

            frequencia:

                Number(obj["Participações"]) || 0,

            medalhas:

                obj["Medalhas"] || ""

        });

    });

    PLAYERS.sort(

        (a,b)=>

            b.frequencia-a.frequencia

    );

}


/* ==========================================================
   MEDALHAS
========================================================== */

function processarMedalhas(csv){

    MEDALHAS = {};

    const linhas = csv.trim().split(/\r?\n/);

    const cabecalho = parseCSVLine(linhas.shift());

    linhas.forEach(linha=>{

        const cols = parseCSVLine(linha);

        const obj = {};

        cabecalho.forEach((coluna,i)=>{

            obj[coluna.trim()] = cols[i]?.trim() || "";

        });

        const emoji =

            obj["Medalha (Emoji)"];

        if(!emoji) return;

        MEDALHAS[emoji]={

            nome:

                obj["Nome da Medalha"],

            descricao:

                obj["Significado"]

        };

    });

}

/* ==========================================================
   MEDALHAS
========================================================== */

function renderizarMedalhas(texto){

    if(!texto) return "";

    return texto
        .split("|")
        .map(m => m.trim())
        .filter(Boolean)
        .map(emoji => {

            const medalha = MEDALHAS[emoji];

            if(!medalha){

                return `
                    <span class="medal">
                        ${emoji}
                    </span>
                `;

            }

            return `
                <span
                    class="medal"
                    data-nome="${medalha.nome}"
                    data-desc="${medalha.descricao}">
                    ${emoji}
                </span>
            `;

        })
        .join(""); // <-- IMPORTANTE: sem "|"
}


/* ==========================================================
   RENDERIZAÇÃO DOS CARDS
========================================================== */

function renderizarJogadores(){

    const grid = document.getElementById("playersGrid");

    grid.innerHTML = "";

    PLAYERS.forEach(player=>{

        const percentual = Math.min(

            (player.frequencia/31)*100,

            100

        );

        const card = document.createElement("div");

        card.className="player-card";

        card.innerHTML = `

            <div class="player-title">

                <a
                    href="${player.link}"
                    target="_blank"
                    rel="noopener">

                    ${player.personagem}

                </a>

            </div>

            <div class="player-class">

                ${player.classeAtual}

            </div>

            <div class="player-progress">

                <div
                    class="player-progress-fill"
                    style="width:${percentual}%">
                </div>

            </div>

            <div class="player-progress-text">

                ${player.frequencia}/31 pergaminhos

            </div>

            <div class="player-medals">

                ${renderizarMedalhas(player.medalhas)}

            </div>

        `;

        grid.appendChild(card);

    });

}


/* ==========================================================
   CARREGAR DADOS
========================================================== */

async function iniciarPlayers(){

    try{

        const [

            csvPlayers,

            csvMedalhas

        ] = await Promise.all([

            fetchCSV(URL_PLAYERS),

            fetchCSV(URL_MEDALHAS)

        ]);

        processarJogadores(csvPlayers);

        processarMedalhas(csvMedalhas);

        renderizarJogadores();

    }

    catch(e){

        console.error(e);

        document.getElementById("playersGrid").innerHTML = `

            <div class="player-loading">

                Erro ao carregar os Guardiões.

            </div>

        `;

    }

}


/* ==========================================================
   INICIAR
========================================================== */


const tooltip = document.getElementById("tooltip");

document.addEventListener("mouseover", function(e){

    const medal = e.target.closest(".medal");

    if(!medal) return;

    tooltip.innerHTML = `
        <strong>${medal.dataset.nome}</strong>
        ${medal.dataset.desc}
    `;

    tooltip.style.opacity = "1";

});

document.addEventListener("mousemove", function(e){

    tooltip.style.left = (e.clientX + 18) + "px";
    tooltip.style.top  = (e.clientY + 18) + "px";

});

document.addEventListener("mouseout", function(e){

    if(e.target.closest(".medal")){

        tooltip.style.opacity = "0";

    }

});

iniciarPlayers();


/* ==========================================================
   MANUAL
========================================================== */

const manualButton =
document.getElementById("manualButton");

const manualOverlay =
document.getElementById("manualOverlay");

const manualClose =
document.getElementById("manualClose");

manualButton.addEventListener("click",()=>{

    manualOverlay.classList.add("active");

});

manualClose.addEventListener("click",()=>{

    manualOverlay.classList.remove("active");

});

manualOverlay.addEventListener("click",(e)=>{

    if(e.target===manualOverlay){

        manualOverlay.classList.remove("active");

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        manualOverlay.classList.remove("active");

    }

});

/* ==========================================================
   GRIMÓRIO
========================================================== */

const grimorioButton =
document.getElementById("grimorioButton");

const grimorioOverlay =
document.getElementById("grimorioOverlay");

const grimorioClose =
document.getElementById("grimorioClose");

grimorioButton.addEventListener("click",()=>{

    grimorioOverlay.classList.add("active");

});

grimorioClose.addEventListener("click",()=>{

    grimorioOverlay.classList.remove("active");

});

grimorioOverlay.addEventListener("click",(e)=>{

    if(e.target===grimorioOverlay){

        grimorioOverlay.classList.remove("active");

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        grimorioOverlay.classList.remove("active");

    }

}); 
