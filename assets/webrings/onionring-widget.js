window.addEventListener('load', function () {
  if (typeof websites === 'undefined' || !websites.length) return;

  var thisSite = window.location.href;
  var thisIndex = null;

  if (thisSite.includes("localhost") || thisSite.includes("127.0.0.1")) {
    thisIndex = 0;
  } else {
    for (var i = 0; i < websites.length; i++) {
      if (thisSite.startsWith(websites[i])) {
        thisIndex = i;
        break;
      }
    }
  }

  // Link aleatório deve funcionar sempre
  document.querySelectorAll('.eb-random').forEach(function(el) {
    el.href = "#";
    el.onclick = function(e) {
      e.preventDefault();
      location.href = websites[Math.floor(Math.random() * websites.length)];
    };
  });

  // Nome do webring pode aparecer sempre
  document.querySelectorAll('.eb-name').forEach(function(el) {
    el.textContent = ringName;
  });

  // Só prev/next dependem de descobrir o site atual
  if (thisIndex !== null) {
    var prevIndex = (thisIndex - 1 + websites.length) % websites.length;
    var nextIndex = (thisIndex + 1) % websites.length;

    document.querySelectorAll('.eb-prev').forEach(function(el) {
      el.href = websites[prevIndex];
    });

    document.querySelectorAll('.eb-next').forEach(function(el) {
      el.href = websites[nextIndex];
    });
  }
});
