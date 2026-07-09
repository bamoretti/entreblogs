/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const VELOCIDADE = 18;

const PAUSA_PARAGRAFO = 300;

const STORAGE_KEY = "entreblogs-capitulo-lido";

/* ==========================================================
   INICIAR
========================================================== */

document.addEventListener("DOMContentLoaded", iniciarCronicas);

async function iniciarCronicas(){

    const capitulos = document.querySelectorAll(".capitulo");

    let ultimoLido =
        Number(localStorage.getItem(STORAGE_KEY)) || 0;

    for(let i=0;i<capitulos.length;i++){

        const capitulo = capitulos[i];

        const texto = capitulo.querySelector(".capitulo-texto");

        if(i < ultimoLido){

            mostrarTudo(texto);

        }

        else{

            await escreverCapitulo(texto);

            ultimoLido = i + 1;

            localStorage.setItem(
                STORAGE_KEY,
                ultimoLido
            );

        }

    }

}

/* ==========================================================
   MOSTRA IMEDIATAMENTE
========================================================== */

function mostrarTudo(container){

    container
        .querySelectorAll("[data-original]")
        .forEach(el=>{

            el.innerHTML =
                el.dataset.original;

        });

}

/* ==========================================================
   ESCREVE UM CAPÍTULO
========================================================== */

async function escreverCapitulo(container){

    const elementos =
        [...container.children];

    for(const el of elementos){

        if(el.classList.contains("divisor")){

            await esperar(200);

            continue;

        }

        await escreverElemento(el);

        await esperar(PAUSA_PARAGRAFO);

    }

}

/* ==========================================================
   ESCREVE UM PARÁGRAFO
========================================================== */

function escreverElemento(elemento){

    return new Promise(resolve=>{

        const htmlOriginal =
            elemento.innerHTML;

        elemento.dataset.original =
            htmlOriginal;

        const texto =
            elemento.textContent;

        elemento.innerHTML="";

        elemento.classList.add("escrevendo");

        let i=0;

        function digitar(){

            elemento.textContent += texto[i];

            i++;

            if(i < texto.length){

                setTimeout(
                    digitar,
                    VELOCIDADE
                );

            }

            else{

                elemento.classList.remove("escrevendo");

                elemento.innerHTML =
                    htmlOriginal;

                resolve();

            }

        }

        digitar();

    });

}

/* ==========================================================
   UTIL
========================================================== */

function esperar(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}