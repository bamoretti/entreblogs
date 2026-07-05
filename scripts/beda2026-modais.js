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
