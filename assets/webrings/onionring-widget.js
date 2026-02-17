window.addEventListener('load', function () {
  if (typeof sites === 'undefined') return;

  var thisSite = window.location.href;
  var thisIndex = null;

  // Busca o site na lista (com suporte a localhost para você)
  for (var i = 0; i < sites.length; i++) {
    if (thisSite.includes(sites[i]) || thisSite.includes("localhost") || thisSite.includes("127.0.0.1:4000/")) {
      thisIndex = i;
      break;
    }
  }

  if (thisIndex !== null) {
    var prevIndex = (thisIndex - 1 + sites.length) % sites.length;
    var nextIndex = (thisIndex + 1) % sites.length;

    // Em vez de criar o HTML, nós apenas preenchemos os links que o usuário criou
    document.querySelectorAll('.eb-prev').forEach(el => el.href = sites[prevIndex]);
    document.querySelectorAll('.eb-next').forEach(el => el.href = sites[nextIndex]);
    document.querySelectorAll('.eb-random').forEach(el => {
        el.href = "javascript:void(0)";
        el.onclick = function() { location.href = sites[Math.floor(Math.random() * sites.length)]; };
    });
    // Preenche o nome do ring se houver um elemento para isso
    document.querySelectorAll('.eb-name').forEach(el => el.textContent = ringName);
  }
});
