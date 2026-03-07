window.addEventListener('load', function () {
  if (typeof websites === 'undefined') return;

  var thisSite = window.location.href;
  var thisIndex = null;

  // Em localhost, usa o índice 0 apenas para testar a navegação
  if (thisSite.includes("localhost") || thisSite.includes("127.0.0.1")) {
    thisIndex = 0;
  } else {
    for (var i = 0; i < websites.length; i++) {
      if (thisSite.includes(websites[i])) {
        thisIndex = i;
        break;
      }
    }
  }

  if (thisIndex !== null) {
    var prevIndex = (thisIndex - 1 + websites.length) % websites.length;
    var nextIndex = (thisIndex + 1) % websites.length;

    document.querySelectorAll('.eb-prev').forEach(el => el.href = websites[prevIndex]);
    document.querySelectorAll('.eb-next').forEach(el => el.href = websites[nextIndex]);
    document.querySelectorAll('.eb-random').forEach(el => {
      el.href = "javascript:void(0)";
      el.onclick = function() { location.href = websites[Math.floor(Math.random() * websites.length)]; };
    });
    document.querySelectorAll('.eb-name').forEach(el => el.textContent = ringName);
  }
});