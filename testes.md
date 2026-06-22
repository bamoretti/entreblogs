<div id="entreblogs-lista"></div>

<style>
/* =======================
   CSS (inalterado)
======================= */

.entreblogs-tema {
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.entreblogs-header {
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 600;
  list-style: none;
  display: flex;
  gap: 10px;
  align-items: center;
}

.entreblogs-header::-webkit-details-marker {
  display: none;
}

.entreblogs-codigo {
  opacity: .6;
  font-size: .9rem;
}

.entreblogs-titulo {
  font-size: 1rem;
}

.entreblogs-total {
  opacity: .5;
  font-size: .85rem;
}

.entreblogs-descricao {
  padding: 0 16px 12px 16px;
  font-size: .95rem;
  line-height: 1.5;
  opacity: .8;
}

.entreblogs-lista {
  margin: 0;
  padding: 0 20px 15px 40px;
}

.entreblogs-item {
  margin: 8px 0;
}

.entreblogs-link {
  text-decoration: none;
}

.entreblogs-link:hover {
  text-decoration: underline;
}

.entreblogs-tema[open] .entreblogs-header {
  border-bottom: 1px solid #eee;
}
</style>

<script>
/* =======================
   CONFIG
======================= */

const URL_PARTICIPACOES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

const URL_TEMAS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/gviz/tq?tqx=out:csv&sheet=temas";

let DADOS = [];
let DESCRICOES = {};

/* =======================
   CACHE
======================= */

const CACHE_TIME = 1000 * 60 * 30; // 30 min

async function fetchComCache(url) {

  const cache = localStorage.getItem(url);

  if (cache) {
    try {
      const parsed = JSON.parse(cache);

      if (Date.now() - parsed.time < CACHE_TIME) {
        return parsed.data;
      }
    } catch (e) {}
  }

  const resp = await fetch(url);
  const data = await resp.text();

  localStorage.setItem(url, JSON.stringify({
    time: Date.now(),
    data
  }));

  return data;
}

/* =======================
   INÍCIO
======================= */

Promise.all([
  fetchComCache(URL_PARTICIPACOES),
  fetchComCache(URL_TEMAS)
]).then(([csvPart, csvTemas]) => {

  carregarParticipacoes(csvPart);
  carregarTemas(csvTemas);

  renderizar();

});

/* =======================
   PARTICIPAÇÕES
======================= */

function carregarParticipacoes(csv) {

  const linhas = csv.trim().split("\n").slice(1);

  DADOS = linhas.map(linha => {

    const cols = parseCSVLine(linha);

    const codigo = cols[7]?.trim() || "";
    const temaOriginal = cols[3]?.trim() || "Sem tema";

    const tema = temaOriginal.length > 6
      ? temaOriginal.substring(6).trim()
      : temaOriginal;

    return {
      timestamp: cols[0]?.trim(),
      blog: cols[1]?.trim(),
      participacao: cols[2]?.trim(),
      temaPrincipal: tema,
      temaExtra: cols[4]?.trim(),
      livro: cols[5]?.trim(),
      link: cols[6]?.trim(),
      codigo
    };

  }).filter(d => d.blog && d.link);

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
   RENDER OTIMIZADO (INCREMENTAL)
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

  let i = 0;

  function renderLote() {

    const chunk = 10; // render em blocos
    const end = Math.min(i + chunk, lista.length);

    for (; i < end; i++) {

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
      requestAnimationFrame(renderLote);
    }
  }

  renderLote();
}

/* =======================
   CSV PARSER
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