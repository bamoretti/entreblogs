
const URL_MISSOES =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQeqf6B-V3mWT2tPVYjt5UXNeqGxc6So11z4zbJbIVa6e0_5UAqKcmKBEAQQRD8KC2DRMFlgzQ_AAiz/pub?gid=554145336&single=true&output=csv";

async function carregarMissoes(){

    try{

        const resp = await fetch(URL_MISSOES);

        const csv = await resp.text();

        const linhas = csv.trim().split(/\r?\n/);

        const cabecalho =
            parseCSVLine(linhas.shift());

        const container =
            document.getElementById("listaMissoes");

        container.innerHTML = "";

        let total = 0;

        linhas.forEach(linha=>{

            const cols =
                parseCSVLine(linha);

            const obj = {};

            cabecalho.forEach((c,i)=>{

                obj[c.trim()] =
                    (cols[i] || "").trim();

            });

            if(Number(obj["Ativo"]) !== 1)
                return;

            total++;

            const card =
                document.createElement("div");

            card.className =
                "missao";

            card.innerHTML = `
	
                <div class="titulo-missao">
                    ${obj["Missão"]}
                </div>

                <div class="descricao-missao">
                    ${obj["Descrição Missão"]}
                </div>

            `;

            container.appendChild(card);

        });

        if(total === 0){

            container.innerHTML = `
                <div class="loading">
                    Nenhuma missão ativa.
                </div>
            `;

        }

    }

    catch(error){

        console.error(error);

        document.getElementById(
            "listaMissoes"
        ).innerHTML = `
            <div class="loading">
                Erro ao carregar missões.
            </div>
        `;

    }

}

function parseCSVLine(line){

    const result = [];

    let current = "";

    let inQuotes = false;

    for(let i=0;i<line.length;i++){

        const char = line[i];

        if(
            char === '"' &&
            line[i+1] === '"'
        ){

            current += '"';

            i++;

        }

        else if(char === '"'){

            inQuotes = !inQuotes;

        }

        else if(
            char === "," &&
            !inQuotes
        ){

            result.push(current);

            current = "";

        }

        else{

            current += char;

        }

    }

    result.push(current);

    return result;

}

carregarMissoes();