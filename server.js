const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 5173);
const contentPath = path.join(root, "data", "content.json");
const uploadsDir = path.join(root, "uploads");
const adminPassword = process.env.ADMIN_PASSWORD || "alex123";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".apk": "application/vnd.android.package-archive",
  ".zip": "application/zip",
  ".exe": "application/vnd.microsoft.portable-executable",
  ".dmg": "application/x-apple-diskimage",
  ".pkg": "application/octet-stream",
  ".msi": "application/octet-stream",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
};

const namedHtmlEntities = {
  aacute: "á", agrave: "à", acirc: "â", atilde: "ã", auml: "ä",
  eacute: "é", egrave: "è", ecirc: "ê", euml: "ë",
  iacute: "í", igrave: "ì", icirc: "î", iuml: "ï",
  oacute: "ó", ograve: "ò", ocirc: "ô", otilde: "õ", ouml: "ö",
  uacute: "ú", ugrave: "ù", ucirc: "û", uuml: "ü",
  ccedil: "ç", ntilde: "ñ", nbsp: " ",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú",
  Atilde: "Ã", Otilde: "Õ", Ccedil: "Ç",
};

const decodeHtml = (value = "") =>
  value
    // DuckDuckGo/Bing às vezes entregam entidades escapadas em dobro
    // (ex.: "&amp;aacute;"), então o "&amp;" precisa virar "&" antes do resto.
    .replace(/&amp;/g, "&")
    .replace(/&(aacute|agrave|acirc|atilde|auml|eacute|egrave|ecirc|euml|iacute|igrave|icirc|iuml|oacute|ograve|ocirc|otilde|ouml|uacute|ugrave|ucirc|uuml|ccedil|ntilde|nbsp|Aacute|Eacute|Iacute|Oacute|Uacute|Atilde|Otilde|Ccedil);/g, (_, name) => namedHtmlEntities[name])
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const stripTags = (value = "") => decodeHtml(value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

const unwrapDuckUrl = (href) => {
  const cleanHref = decodeHtml(href);
  const url = cleanHref.startsWith("//") ? `https:${cleanHref}` : cleanHref;

  try {
    const parsed = new URL(url);
    const unwrapped = parsed.searchParams.get("uddg");
    return unwrapped ? decodeURIComponent(unwrapped) : url;
  } catch {
    return url;
  }
};

const unwrapBingUrl = (href) => {
  const cleanHref = decodeHtml(href);

  try {
    const parsed = new URL(cleanHref);
    const wrapped = parsed.searchParams.get("u");
    if (!wrapped) return cleanHref;

    const base64 = wrapped.startsWith("a1") ? wrapped.slice(2) : wrapped;
    return Buffer.from(base64, "base64").toString("utf8");
  } catch {
    return cleanHref;
  }
};

const enhanceManualQuery = (query) => `${query} manual do usuário pdf balança`;

const normalizeForMatch = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const knownManuals = [
  {
    keywords: ["prix 4 uno", "toledo prix 4 uno", "4 uno"],
    title: "PDF Manual do usuário Toledo Prix 4 Uno",
    link: "https://saportalcorporativoprd.blob.core.windows.net/blobappportalc63534e8570/wp-content/uploads/2024/08/manual-do-usuario-08.09.23-Prix-4-Uno.pdf",
    description: "Manual do usuário da balança Toledo Prix 4 Uno em PDF.",
  },
  {
    keywords: ["prix 4 uno", "toledo prix 4 uno", "4 uno"],
    title: "Manual do Usuário Toledo Prix 4 Uno",
    link: "https://www.manualzz.com/doc/5886903/toledo-prix-4-uno-balan%C3%A7a-computadora-digital-manual-do-u...",
    description: "Manual do usuário da balança computadora digital Toledo Prix 4 Uno.",
  },
  {
    keywords: ["prix 4 uno", "toledo prix 4 uno", "4 uno"],
    title: "Manual da Balança Toledo Prix 4 Uno",
    link: "https://pt.scribd.com/document/754155325/Manual-de-instrucao-Balanca-Prix-4-uno",
    description: "Manual de instrução da Balança Prix 4 Uno.",
  },
];

const searchKnownManuals = (query, limit = 4) => {
  const normalized = query.toLowerCase();
  return knownManuals
    .filter((manual) => manual.keywords.some((keyword) => normalized.includes(keyword)))
    .slice(0, limit)
    .map(({ title, link, description }) => ({ title, link, description }));
};

const searchDuckDuckGo = async (query, limit = 6) => {
  const response = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const html = await response.text();
  const results = [];
  const regex = /<a rel="nofollow" class="result__a" href="([^"]+)">([\s\S]*?)<\/a>[\s\S]*?<a class="result__snippet"[\s\S]*?>([\s\S]*?)<\/a>/g;
  let match;

  while ((match = regex.exec(html)) && results.length < limit) {
    results.push({
      title: stripTags(match[2]),
      link: unwrapDuckUrl(match[1]),
      description: stripTags(match[3]),
    });
  }

  return results;
};

const searchBing = async (query, limit = 6) => {
  const response = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const html = await response.text();
  const results = [];
  const blocks = html.split('<li class="b_algo"').slice(1);

  for (const block of blocks) {
    if (results.length >= limit) break;

    const titleMatch = block.match(/<h2[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h2>/);
    if (!titleMatch) continue;

    const snippetMatch = block.match(/<p>([\s\S]*?)<\/p>/);
    const title = stripTags(titleMatch[2]);
    const link = unwrapBingUrl(titleMatch[1]);
    const description = stripTags(snippetMatch?.[1] || "Manual ou página técnica encontrada em busca externa.");

    results.push({ title, link, description });
  }

  return results;
};

// Bing e DuckDuckGo às vezes devolvem páginas genéricas (ajuda do navegador,
// resultados de outro idioma) quando não reconhecem bem a busca. Só aceita o
// resultado se ele realmente citar um termo da busca original (ex.: "ind560")
// e tiver cara de manual/ficha técnica — não só palavras genéricas nossas.
const filterRelevantManuals = (rawResults, originalQuery, limit = 4) => {
  const queryTerms = normalizeForMatch(originalQuery)
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 2);

  const results = [];
  for (const item of rawResults) {
    if (results.length >= limit) break;
    if (!item.title || !item.link) continue;

    const relevance = normalizeForMatch(`${item.title} ${item.link} ${item.description || ""}`);
    const blocked = ["prefeitura", "wikipedia", "mercado livre", "apkpure", "reddit.com", "systeme.io", "google.com/chrome"].some(
      (term) => relevance.includes(term),
    );
    const mentionsQuery = !queryTerms.length || queryTerms.some((term) => relevance.includes(term));
    const looksLikeManual = ["manual", "pdf", "balanca", "indicador", "pesagem", "datasheet", "ficha tecnica", "guia"].some(
      (term) => relevance.includes(term),
    );

    if (blocked || !mentionsQuery || !looksLikeManual) continue;
    results.push(item);
  }

  return results;
};

const searchYouTube = async (query, limit = 4) => {
  const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  const html = await response.text();
  const ids = [...html.matchAll(/"videoId":"([^"]+)"/g)].map((match) => match[1]);
  const titles = [...html.matchAll(/"title":\{"runs":\[\{"text":"([^"]+)"/g)].map((match) =>
    decodeHtml(match[1]),
  );
  const uniqueIds = [...new Set(ids)];

  return uniqueIds.slice(0, limit).map((id, index) => ({
    title: titles[index] || "Vídeo relacionado",
    link: `https://www.youtube.com/watch?v=${id}`,
    embed: `https://www.youtube.com/embed/${id}`,
    description: "Vídeo encontrado em busca externa do YouTube.",
  }));
};

const sendJson = (res, data, status = 200) => {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(data));
};

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Payload muito grande."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON inválido."));
      }
    });
  });

const readRawBody = (req, limit = 80_000_000) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("Arquivo muito grande."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

const isAdminRequest = (req) => req.headers["x-admin-password"] === adminPassword;

const handleContent = async (req, res) => {
  if (req.method === "GET") {
    try {
      const data = await fs.promises.readFile(contentPath, "utf8");
      sendJson(res, JSON.parse(data));
    } catch {
      sendJson(res, { apps: [], downloads: [] });
    }
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, { error: "Método não permitido." }, 405);
    return;
  }

  if (!isAdminRequest(req)) {
    sendJson(res, { error: "Senha de admin inválida." }, 401);
    return;
  }

  try {
    const data = await readJsonBody(req);
    const cleanData = {
      apps: Array.isArray(data.apps) ? data.apps : [],
      downloads: Array.isArray(data.downloads) ? data.downloads : [],
      balanceMaterials: Array.isArray(data.balanceMaterials) ? data.balanceMaterials : [],
      products: Array.isArray(data.products) ? data.products : [],
    };
    await fs.promises.mkdir(path.dirname(contentPath), { recursive: true });
    await fs.promises.writeFile(contentPath, `${JSON.stringify(cleanData, null, 2)}\n`);
    sendJson(res, { ok: true });
  } catch (error) {
    sendJson(res, { error: error.message || "Não foi possível salvar." }, 400);
  }
};

const safeFileName = (name = "arquivo") =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "arquivo";

const handleUpload = async (req, res) => {
  if (req.method !== "POST") {
    sendJson(res, { error: "Método não permitido." }, 405);
    return;
  }

  if (!isAdminRequest(req)) {
    sendJson(res, { error: "Senha de admin inválida." }, 401);
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalName = safeFileName(url.searchParams.get("name") || "arquivo");
    const ext = path.extname(originalName).toLowerCase();
    const allowed = [".apk", ".zip", ".exe", ".dmg", ".pkg", ".msi", ".pdf", ".mp4", ".mov", ".webm", ".png", ".jpg", ".jpeg", ".webp"];

    if (!allowed.includes(ext)) {
      sendJson(res, { error: "Envie apenas APK, ZIP, EXE, DMG, PKG, MSI, PDF, vídeo ou imagem." }, 400);
      return;
    }

    const data = await readRawBody(req);
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    const filename = `${Date.now()}-${originalName}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, data);
    sendJson(res, { link: `/uploads/${filename}` });
  } catch (error) {
    sendJson(res, { error: error.message || "Não foi possível enviar arquivo." }, 400);
  }
};

const handleExternalSearch = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = (url.searchParams.get("query") || "").trim();

  if (!query) {
    sendJson(res, { manuals: [], videos: [] });
    return;
  }

  try {
    const manualQuery = enhanceManualQuery(query);
    const videoQuery = `${query} balança tutorial calibração operação`;
    const [duckResults, bingResults, videos] = await Promise.all([
      searchDuckDuckGo(manualQuery, 6).catch(() => []),
      searchBing(manualQuery, 6).catch(() => []),
      searchYouTube(videoQuery, 4),
    ]);
    const known = searchKnownManuals(query, 4);
    const foundManuals = filterRelevantManuals([...duckResults, ...bingResults], query, 6);
    const manuals = [...known, ...foundManuals].filter(
      (manual, index, list) => list.findIndex((item) => item.link === manual.link) === index,
    ).slice(0, 4);

    sendJson(res, { manuals, videos });
  } catch (error) {
    sendJson(res, { error: "Não foi possível buscar resultados externos agora.", manuals: [], videos: [] }, 502);
  }
};

const serveStatic = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Arquivo não encontrado");
      return;
    }

    res.writeHead(200, { "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/upload")) {
    handleUpload(req, res);
    return;
  }

  if (req.url.startsWith("/api/content")) {
    handleContent(req, res);
    return;
  }

  if (req.url.startsWith("/api/external-search")) {
    handleExternalSearch(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Site com busca externa rodando em http://localhost:${port}/`);
});
