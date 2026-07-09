/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const VELOCIDADE = 18;

const STORAGE_KEY = "entreblogs-capitulo-lido";

/* ==========================================================
   INICIAR
========================================================== */

document.addEventListener("DOMContentLoaded", iniciarCronicas);

async function iniciarCronicas(){

    const capitulos = document.querySelectorAll(".capitulo");

    const ultimoLido =
        Number(localStorage.getItem(STORAGE_KEY)) || 0;

    for(let i=0;i<capitulos.length;i++){

        const texto = capitulos[i]
            .querySelector(".capitulo-texto");

        const conteudo =
            texto.textContent.trim();

        texto.textContent="";

        if(i < ultimoLido){

            texto.textContent = conteudo;

        }else{

            await escrever(texto,conteudo);

            localStorage.setItem(
                STORAGE_KEY,
                i+1
            );

        }

    }

}

/* ==========================================================
   MÁQUINA DE ESCREVER
========================================================== */

function escrever(elemento,texto){

    return new Promise(resolve=>{

        let i=0;

        elemento.classList.add("escrevendo");

        function digitar(){

            elemento.textContent += texto[i];

            i++;

            if(i<texto.length){

                setTimeout(
                    digitar,
                    VELOCIDADE
                );

            }else{

                elemento.classList.remove("escrevendo");

                resolve();

            }

        }

        digitar();

    });

}