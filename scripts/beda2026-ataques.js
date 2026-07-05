/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const URL_ATAQUES =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=925696643&single=true&output=csv";

const CACHE_TIME = 1000 * 60 * 30;

let ATAQUES = [];

let mostrarTodos = false;


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

        throw new Error("Erro ao carregar CSV.");

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

    ATAQUES = [];

    const linhas = csv.trim().split(/\r?\n/);

    const cabecalho = parseCSVLine(linhas.shift());

    linhas.forEach(linha=>{

        const cols = parseCSVLine(linha);

        const obj = {};

        cabecalho.forEach((coluna,i)=>{

            obj[coluna.trim()] = cols[i]?.trim() || "";

        });

        ATAQUES.push({

            dataTexto:
                obj["Carimbo de data/hora"],

            data:
                converterData(obj["Carimbo de data/hora"]),


            ataque:
                obj["Ataque"] || obj["⚔️ Missão"],

            dano:
                Number(obj["Pontuação"]) || 0,

            medalha:
                obj["Medalhas"],

           personagem:
                obj["Personagem"],
          
            link:
                obj["🔗 Pergaminho"]

        });

    });

    ATAQUES.sort((a,b)=>b.data-a.data);

}


/* ==========================================================
   DATA
========================================================== */

function converterData(valor){

    if(!valor) return new Date(0);

    const partes = valor.split(" ");

    const data = partes[0].split("/");

    const hora = (partes[1] || "00:00:00").split(":");

    return new Date(

        Number(data[2]),

        Number(data[1])-1,

        Number(data[0]),

        Number(hora[0]),

        Number(hora[1]),

        Number(hora[2] || 0)

    );

}


/* ==========================================================
   CARREGAR
========================================================== */

async function carregarAtaques(){

    try{

        const csv = await fetchCSV(URL_ATAQUES);

        processarCSV(csv);

        renderizarTabela();

    }

    catch(e){

        console.error(e);

        document.getElementById("battleBody").innerHTML = `
            <tr>
                <td colspan="6">
                    Erro ao carregar ataques.
                </td>
            </tr>
        `;

    }

}
/* ==========================================================
   RENDERIZAÇÃO DA TABELA
========================================================== */

function renderizarTabela(){

    const tbody = document.getElementById("battleBody");

    if(!tbody) return;

    tbody.innerHTML = "";

    const lista = mostrarTodos
        ? ATAQUES
        : ATAQUES.slice(0,5);

    if(lista.length === 0){

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="battle-empty">
                    Nenhum ataque registrado.
                </td>
            </tr>
        `;

        return;

    }

    lista.forEach(item=>{

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td class="battle-date">

                ${formatarData(item.data)}

            </td>

            <td class="battle-player">

                ${item.personagem}

            </td>

            <td class="battle-attack">

                ${item.ataque}

            </td>

            <td class="battle-damage">

                ${item.dano}

            </td>

            <td class="battle-medal">

                ${item.medalha || "-"}

            </td>

            <td>

                <a
                    class="battle-link"
                    href="${item.link}"
                    target="_blank"
                    rel="noopener">

                    Ler

                </a>

            </td>

        `;

        tbody.appendChild(tr);

    });

    atualizarBotao();

}


/* ==========================================================
   FORMATAR DATA
========================================================== */

function formatarData(data){

    if(!(data instanceof Date))
        return "";

    return data.toLocaleString("pt-BR",{

        day:"2-digit",

        month:"2-digit",

        year:"numeric",

        hour:"2-digit",

        minute:"2-digit"

    });

}


/* ==========================================================
   BOTÃO
========================================================== */

function atualizarBotao(){

    const botao = document.getElementById("toggleBattle");

    if(!botao) return;

    if(ATAQUES.length <= 5){

        botao.style.display = "none";

        return;

    }

    botao.style.display = "inline-block";

    botao.textContent = mostrarTodos

        ? "▲ Mostrar menos"

        : "▼ Ver todos os ataques";

}


/* ==========================================================
   EVENTO
========================================================== */

const botao = document.getElementById("toggleBattle");

if(botao){

    botao.addEventListener("click",()=>{

        mostrarTodos = !mostrarTodos;

        renderizarTabela();

    });

}


/* ==========================================================
   INICIAR
========================================================== */

carregarAtaques();