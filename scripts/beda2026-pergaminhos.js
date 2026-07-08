/* ==========================================================
   CONFIGURAÇÃO
========================================================== */
/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const URL_REGISTROS =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=925696643&single=true&output=csv";

const CACHE_TIME = 1000 * 60 * 30;

let REGISTROS = [];

/* ==========================================================
   CACHE
========================================================== */

function getCache(url){

    try{

        const cache = localStorage.getItem(url);

        if(!cache) return null;

        const obj = JSON.parse(cache);

        if(Date.now() - obj.time > CACHE_TIME){

            return null;

        }

        return obj;

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
   DOWNLOAD
========================================================== */

async function fetchFresh(url){

    const resp = await fetch(url);

    if(!resp.ok){

        throw new Error("Erro ao carregar registros.");

    }

    const csv = await resp.text();

    setCache(url,csv);

    return csv;

}

/* ==========================================================
   INICIAR
========================================================== */

async function iniciarRegistros(){

    const cache = getCache(URL_REGISTROS);

    if(cache?.data){

        carregarCSV(cache.data);

        renderizarTabela();

    }

    try{

        const csv = await fetchFresh(URL_REGISTROS);

        carregarCSV(csv);

        renderizarTabela();

    }

    catch(e){

        console.error(e);

    }

}

document.addEventListener(

    "DOMContentLoaded",

    iniciarRegistros

);

/* ==========================================================
   CSV
========================================================== */

function carregarCSV(csv){

    REGISTROS=[];

    const linhas=csv.trim().split("\n");

    const cabecalho=parseCSVLine(linhas.shift());

    linhas.forEach(linha=>{

        const cols=parseCSVLine(linha);

        const obj={};

        cabecalho.forEach((c,i)=>{

            obj[c.trim()]=cols[i]?.trim()||"";

        });

        REGISTROS.push(obj);

    });

}

/* ==========================================================
   RENDER
========================================================== */

function renderizarTabela(){

    const tbody=document.querySelector("#tabelaRegistros tbody");

    tbody.innerHTML="";

    REGISTROS.sort((a,b)=>{

        return converterData(

            a["Carimbo de data/hora"]

        )-

        converterData(

            b["Carimbo de data/hora"]

        );

    });

    REGISTROS.forEach(item=>{

        const tr=document.createElement("tr");

        const data=formatarData(

            item["Carimbo de data/hora"]

        );

        const blog=item["Nome do Blog"];

        const titulo=item["Postagem"];

        const link=item["🔗 Pergaminho"];

        tr.innerHTML=`

            <td class="registro-data">

                ${data}

            </td>

            <td class="registro-blog">

                ${blog}

            </td>

            <td>

                <a

                    href="${link}"

                    target="_blank"

                    class="registro-link">

                    ${titulo}

                </a>

            </td>

        `;

        tbody.appendChild(tr);

    });

}

/* ==========================================================
   DATA
========================================================== */

function converterData(texto){

    if(!texto) return 0;

    const partes=texto.split(" ");

    const data=partes[0].split("/");

    const hora=(partes[1]||"00:00:00").split(":");

    return new Date(

        Number(data[2]),

        Number(data[1])-1,

        Number(data[0]),

        Number(hora[0]),

        Number(hora[1]),

        Number(hora[2])

    );

}

function formatarData(texto){

    const d=converterData(texto);

    return d.toLocaleString(

        "pt-BR",

        {

            day:"2-digit",

            month:"2-digit",

            year:"numeric",

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

/* ==========================================================
   CSV PARSER
========================================================== */

function parseCSVLine(line){

    const result=[];

    let current="";

    let inQuotes=false;

    for(let i=0;i<line.length;i++){

        const char=line[i];

        if(

            char=='"' &&

            line[i+1]=='"'

        ){

            current+='"';

            i++;

        }

        else if(char=='"'){

            inQuotes=!inQuotes;

        }

        else if(

            char=="," &&

            !inQuotes

        ){

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