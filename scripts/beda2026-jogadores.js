
const URL_PLAYERS =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=809160378&single=true&output=csv";


let PLAYERS = [];

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

        throw new Error("Erro ao carregar planilha.");

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
   PROCESSAR CSV
========================================================== */

function processarCSV(csv){

    PLAYERS=[];

    const linhas = csv.trim().split(/\r?\n/);

    const cabecalho = parseCSVLine(linhas.shift());

    linhas.forEach(linha=>{

        const cols = parseCSVLine(linha);

        const obj={};

        cabecalho.forEach((c,i)=>{

            obj[c.trim()] = cols[i]?.trim() || "";

        });

        /* Ignora quem não possui personagem */

        if(!obj["Personagem"] || obj["Personagem"].trim()===""){

            return;

        }

        PLAYERS.push({

            blog: obj["Nome do Blog"],

            link: obj["Link"],

            personagem: obj["Personagem"],

            classeInicial: obj["Classe Inicial"],

            classeAtual: obj["Classe Atual"],

            frequencia: Number(obj["Participações"]) || 0,

            participacoes: Number(obj["Participações"]) || 0,

            medalhas: obj["Medalhas"] || ""

        });

    });

    PLAYERS.sort((a,b)=>{

        return b.frequencia-a.frequencia;

    });

}

/* ==========================================================
   RENDERIZAÇÃO
========================================================== */

function renderizarJogadores(){

    const grid=document.getElementById("playersGrid");

    grid.innerHTML="";

    PLAYERS.forEach(player=>{

        const percentual=Math.min(

            (player.frequencia/31)*100,

            100

        );

        const card=document.createElement("div");

        card.className="player-card";

        card.innerHTML=`

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

                ${player.medalhas || "—"}

            </div>

        `;

        grid.appendChild(card);

    });

}

/* ==========================================================
   INICIAR
========================================================== */

async function iniciarPlayers(){

    try{

        const csv = await fetchCSV(URL_PLAYERS);

        processarCSV(csv);

        renderizarJogadores();

    }

    catch(e){

        console.error(e);

        document.getElementById("playersGrid").innerHTML=`

            <div class="player-loading">

                Erro ao carregar os Guardiões.

            </div>

        `;

    }

}

iniciarPlayers();