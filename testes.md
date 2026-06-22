<script>
  
const CACHE_KEY = "entreblogs_cache_v1";
const CACHE_TIME = 1000 * 60 * 60; // 1h

document.getElementById("entreblogs-lista").innerHTML =
  "<p class='entreblogs-loading'>Carregando...</p>";

/* =======================
   CONFIG
======================= */

const URL_PARTICIPACOES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

const URL_TEMAS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?gid=1757944473&single=true&output=csv";

let DADOS = [];
let DESCRICOES = {};

/* =======================
   CACHE HELPERS
======================= */

function saveCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    time: Date.now(),
    data
  }));
}

function loadCache() {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.time > CACHE_TIME) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

/* =======================
   INIT (CACHE FIRST UX)
======================= */

const cached = loadCache();

if (cached) {
  DADOS = cached.DADOS;
  DESCRICOES = cached.DESCRICOES;

  renderizar(); // instantâneo
}

/* sempre atualiza em background */
Promise.all([
  fetch(URL_PARTICIPACOES).then(r => r.text()),
  fetch(URL_TEMAS).then(r => r.text())
]).then(([csvPart, csvTemas]) => {

  carregarParticipacoes(csvPart);
  carregarTemas(csvTemas);

  saveCache({ DADOS, DESCRICOES });

  renderizar(); // re-render atualizado (silencioso)

});

/* =======================
   PARTICIPAÇÕES
======================= */

function carregarParticipacoes(csv) {

  const linhas = csv.trim().split("\n").slice(1);

  DADOS = linhas.map(linha => {

    const cols = parseCSVLine(linha);

    const participacao = cols[2]?.trim();

    if (participacao !== "Tema principal") return null;

    const codigoOriginal = cols[7]?.trim() || "";
    const temaOriginal = cols[3]?.trim() || "Sem tema";

    const tema = temaOriginal.length > 6
      ? temaOriginal.substring(6).trim()
      : temaOriginal;

    return {
      timestamp: cols[0]?.trim(),
      blog: cols[1]?.trim(),
      participacao,
      temaPrincipal: tema,
      temaExtra: cols[4]?.trim(),
      livro: cols[5]?.trim(),
      link: cols[6]?.trim(),
      codigo: codigoOriginal
    };

  }).filter(Boolean);

}

/* =======================
   TEMAS
======================= */

function carregarTemas(csv) {

  const linhas = csv.trim().split("\n").slice(1);

  linhas.forEach(linha => {

    const cols = parseCSVLine(linha);

    const codigo = cols[0]?.trim();
    const descricao = cols[1]?.trim();

    if (codigo) {
      DESCRICOES[codigo] = descricao;
    }

  });

}

/* =======================
   RENDER OTIMIZADO
======================= */

function renderizar() {

  const container = document.getElementById("entreblogs-lista");

  const grupos = {};

  DADOS.forEach(item => {

    const chave = item.codigo + "||" + item.temaPrincipal;

    if (!grupos[chave]) {
      grupos[chave] = {
        codigo: item.codigo,
        tema: item.temaPrincipal,
        posts: []
      };
    }

    grupos[chave].posts.push(item);

  });

  const lista = Object.values(grupos);

  lista.sort((a, b) => {
    const na = parseInt((a.codigo || "").replace(/\D/g, "")) || 0;
    const nb = parseInt((b.codigo || "").replace(/\D/g, "")) || 0;
    return nb - na;
  });

  container.innerHTML = "";

  let i = 0;

  function renderChunk() {

    const chunkSize = 10;

    for (let j = 0; j < chunkSize && i < lista.length; j++, i++) {

      const grupo = lista[i];
      const descricao = DESCRICOES[grupo.codigo] || "";

      const el = document.createElement("details");
      el.className = "entreblogs-tema";
      if (i === 0) el.open = true;

      let html = `
        <summary class="entreblogs-header">
          <span class="entreblogs-codigo">${grupo.codigo}</span>
          <span class="entreblogs-titulo">${grupo.tema}</span>
          <span class="entreblogs-total">(${grupo.posts.length})</span>
        </summary>

        ${descricao ? `
          <div class="entreblogs-descricao">
            ${descricao}
          </div>
        ` : ""}

        <ul class="entreblogs-lista">
      `;

      grupo.posts.forEach(post => {
        html += `
          <li class="entreblogs-item">
            <a class="entreblogs-link" href="${post.link}" target="_blank" rel="noopener">
              ${post.blog}
            </a>
          </li>
        `;
      });

      html += `</ul>`;

      el.innerHTML = html;
      container.appendChild(el);
    }

    if (i < lista.length) {
      requestAnimationFrame(renderChunk);
    }
  }

  renderChunk();
}

/* =======================
   CSV PARSER (inalterado)
======================= */

function parseCSVLine(line) {

  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {

    const char = line[i];

    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);

  return result;
}
</script>