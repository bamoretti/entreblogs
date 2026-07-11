const VELOCIDADE = 18;

const PAUSA = 450;

const STORAGE = "cronicas-lidas";

document.addEventListener(
    "DOMContentLoaded",
    iniciar
);

async function iniciar(){

    const capitulos =
        document.querySelectorAll(".capitulo");

    let ultimo =
        Number(localStorage.getItem(STORAGE)) || 0;

    for(let i=0;i<capitulos.length;i++){

        const texto =
            capitulos[i].querySelector(".capitulo-texto");

        if(i < ultimo){

            mostrar(texto);

        }

        else{

            await escrever(texto);

            ultimo = i+1;

            localStorage.setItem(
                STORAGE,
                ultimo
            );

        }

    }

}

function mostrar(container){

    container
        .querySelectorAll("p,.divisor")
        .forEach(el=>{

            el.style.opacity=1;

        });

}

async function escrever(container){

    const elementos =
        container.querySelectorAll("p,.divisor");

    for(const el of elementos){

        if(el.classList.contains("divisor")){

            el.style.opacity=1;

            await esperar(250);

            continue;

        }

        await escreverParagrafo(el);

        await esperar(PAUSA);

    }

}

function escreverParagrafo(p){

    return new Promise(resolve=>{

        const texto =
            p.textContent;

        p.dataset.html =
            p.innerHTML;

        p.innerHTML="";

        p.style.opacity=1;

        p.classList.add("cursor");

        let i=0;

        function escrever(){

            p.textContent += texto[i];

            i++;

            if(i<texto.length){

                setTimeout(
                    escrever,
                    VELOCIDADE
                );

            }

            else{

                p.classList.remove("cursor");

                p.innerHTML =
                    p.dataset.html;

                resolve();

            }

        }

        escrever();

    });

}

function esperar(ms){

    return new Promise(r=>{

        setTimeout(r,ms);

    });

}