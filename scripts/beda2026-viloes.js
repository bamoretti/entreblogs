
const URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=525986403&single=true&output=csv";

async function carregar(){

    const resposta = await fetch(URL);

    const csv = await resposta.text();

    const linhas = csv.trim().split(/\r?\n/);

    const cabecalho = parseCSV(linhas.shift());

    let boss = null;

    for(const linha of linhas){

        const valores = parseCSV(linha);

        const obj={};

        cabecalho.forEach((c,i)=>{

            obj[c.trim()] = (valores[i] || "").trim();

        });

        if(Number(obj["Ativo"])===1){

            boss=obj;

            break;

        }

    }

    if(!boss){

        document.querySelector(".card").innerHTML =
        "<h2>Nenhum vilão ativo.</h2>";

        return;

    }

    console.table(boss);


    document.getElementById("bossPeriod").textContent =
        `${boss["Data inicial"]} até ${boss["Data final"]}`;

    document.getElementById("bossDescription").textContent =
        boss["Descrição"] || "";


    const hpMax =
        Number(boss["HP"]);

    const hpAtual =
        Number(boss["HP - Ataque"]);

    document.getElementById("bossHPText").textContent =
        hpAtual + " / " + hpMax;

    document.getElementById("bossBar").style.width =
        ((hpAtual/hpMax)*100)+"%";

    if(boss["Imagem Vilão"]){

       document.getElementById("bossImage").src =
   	   boss["Imagem Vilão"];

    }

}


function parseCSV(text){

    let resultado=[];

    let atual="";

    let aspas=false;

    for(let i=0;i<text.length;i++){

        const c=text[i];

        if(c=='"' && text[i+1]=='"'){

            atual+='"';

            i++;

        }

        else if(c=='"'){

            aspas=!aspas;

        }

        else if(c=="," && !aspas){

            resultado.push(atual);

            atual="";

        }

        else{

            atual+=c;

        }

    }

    resultado.push(atual);

    return resultado;

}

carregar();