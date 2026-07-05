/* ==========================================================
   MODAIS
========================================================== */

function criarModal(botaoId, overlayId, closeId){

    const botao = document.getElementById(botaoId);
    const overlay = document.getElementById(overlayId);
    const fechar = document.getElementById(closeId);

    if(!botao || !overlay || !fechar) return;

    botao.addEventListener("click", () => {
        overlay.classList.add("active");
    });

    fechar.addEventListener("click", () => {
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", (e) => {
        if(e.target === overlay){
            overlay.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape"){
            overlay.classList.remove("active");
        }
    });

}

criarModal("manualButton","manualOverlay","manualClose");
criarModal("grimorioButton","grimorioOverlay","grimorioClose");
