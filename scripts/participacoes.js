const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBdPB8FBc1OtUo-2pFEvInfttYBRWo-aXhqNOrXS8ejVaCGTL3QVpgzdqREMGoniUUtO2ZFaenw4x/pub?output=csv";

let DADOS_CACHE = [];
let CSV_PROMISE = null;

// ============================
// CARREGA CSV UMA ÚNICA VEZ
// ============================

function carregarCSV() {

  if (CSV_PROMISE) {
    return CSV_PROMISE;
  }

  CSV_PROMISE = fetch(CSV_URL)
    .then(response => response.text())
    .then(text => {

      const linhas = text
        .trim()
        .split("\n")
        .slice(1);

      DADOS_CACHE = linhas
        .map(linha => {

          const cols = parseCSVLine(linha);

          return {
            timestamp: cols[0]?.trim(),
            blog: cols[1]?.trim(),
            participacao: cols[2]?.trim(),
            temaPrincipal: cols[3]?.trim(),
            temaExtra: cols[4]?.trim(),
            livro: cols[5]?.trim(),
            link: cols[6]?.trim(),
            codigo: cols[7]?.trim()
          };

        })
        .filter(item => item.blog && item.link);

      return DADOS_CACHE;
    });

  return CSV_PROMISE;
}

// ============================
// RENDERIZA PELO CÓDIGO
// ============================

function renderizarPorCodigo(codigo, elementoId = "lista") {

  const container = document.getElementById(elementoId);

  if (!container) return;

  carregarCSV().then(() => {

    const filtrados = DADOS_CACHE.filter(item =>
      (item.codigo || "").trim() === codigo.trim()
    );

    let html = "<ul>";

    filtrados.forEach(item => {

      html += `
        <li>
          <a href="${item.link}" target="_blank" rel="noopener">
            ${item.blog}
          </a>
        </li>
      `;

    });

    html += "</ul>";

    container.innerHTML = html;

  });

}

// ============================
// RENDERIZA POR TEMA PRINCIPAL
// ============================

function renderizarPorTema(tema, elementoId = "lista") {

  const container = document.getElementById(elementoId);

  if (!container) return;

  carregarCSV().then(() => {

    const filtrados = DADOS_CACHE.filter(item =>
      (item.temaPrincipal || "").trim() === tema.trim()
    );

    let html = "<ul>";

    filtrados.forEach(item => {

      html += `
        <li>
          <a href="${item.link}" target="_blank" rel="noopener">
            ${item.blog}
          </a>
        </li>
      `;

    });

    html += "</ul>";

    container.innerHTML = html;

  });

}

// ============================
// RENDERIZA POR TEMA EXTRA
// ============================

function renderizarPorTemaExtra(tema, elementoId = "lista") {

  const container = document.getElementById(elementoId);

  if (!container) return;

  carregarCSV().then(() => {

    const filtrados = DADOS_CACHE.filter(item =>
      (item.temaExtra || "").trim() === tema.trim()
    );

    let html = "<ul>";

    filtrados.forEach(item => {

      html += `
        <li>
          <a href="${item.link}" target="_blank" rel="noopener">
            ${item.blog}
          </a>
        </li>
      `;

    });

    html += "</ul>";

    container.innerHTML = html;

  });

}

// ============================
// PARSER CSV
// ============================

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

// ============================
// PRÉ-CARREGA O CSV
// ============================

document.addEventListener("DOMContentLoaded", () => {
  carregarCSV();
});