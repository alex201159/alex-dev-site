const ownerPhone = "5599999999999";
const ownerEmail = "seuemail@exemplo.com";

const header = document.querySelector("[data-header]");
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
const form = document.querySelector("[data-contact-form]");
const contributeForm = document.querySelector("[data-contribute-form]");
const communityFeed = document.querySelector("[data-community-feed]");
const materialSearch = document.querySelector("[data-material-search]");
const quickSearchForm = document.querySelector("[data-quick-search-form]");
const resultsForm = document.querySelector("[data-results-form]");
const resultsInput = document.querySelector("[data-results-input]");
const resultsQuery = document.querySelector("[data-results-query]");
const resultsStatus = document.querySelector("[data-results-status]");
const resultsManuals = document.querySelector("[data-results-manuals]");
const resultsVideos = document.querySelector("[data-results-videos]");
const materialModel = document.querySelector("[data-material-model]");
const materialType = document.querySelector("[data-material-type]");
const externalSearch = document.querySelector("[data-external-search]");
const balanceTabs = document.querySelectorAll("[data-balance-tab]");
const balancePanels = document.querySelectorAll("[data-balance-panel]");
const materialTabs = document.querySelectorAll("[data-material-tab]");
const manualTabs = document.querySelectorAll("[data-manual-tab]");
const manualPanels = document.querySelectorAll("[data-manual-panel]");
const manualBrandList = document.querySelector(".manual-brand-list");
const manualModelSearch = document.querySelector("[data-manual-model-search]");
const manualEmpty = document.querySelector("[data-manual-empty]");
const communityManuals = document.querySelector("[data-community-manuals]");
const communityManualCount = document.querySelector("[data-community-manual-count]");
const pdfViewer = document.querySelector("[data-pdf-viewer]");
const pdfFrame = document.querySelector("[data-pdf-frame]");
const pdfTitle = document.querySelector("[data-pdf-title]");
const pdfClose = document.querySelector("[data-pdf-close]");
const pdfBlocked = document.querySelector("[data-pdf-blocked]");
const pdfExternal = document.querySelector("[data-pdf-external]");
const headerAction = document.querySelector("[data-header-action]");
const headerLoginBadge = document.querySelector("[data-header-login]");
const questionForm = document.querySelector("[data-question-form]");
const questionList = document.querySelector("[data-question-list]");
const appsList = document.querySelector("[data-apps-list]");
const downloadCards = document.querySelector("[data-download-cards]");
const downloadTable = document.querySelector("[data-download-table]");
const productsList = document.querySelector("[data-products-list]");
const adminLogin = document.querySelector("[data-admin-login]");
const adminWorkspace = document.querySelector("[data-admin-workspace]");
const adminApps = document.querySelector("[data-admin-apps]");
const adminDownloads = document.querySelector("[data-admin-downloads]");
const adminMaterials = document.querySelector("[data-admin-materials]");
const adminProducts = document.querySelector("[data-admin-products]");
const adminStatus = document.querySelector("[data-admin-status]");
const communityStorageKey = "alex-dev-balanceiros-materials";
const authStorageKey = "alex-dev-google-user";
const questionStorageKey = "alex-dev-balanceiros-questions";
const adminPasswordStorageKey = "alex-dev-admin-password";
const mainBrands = ["Toledo", "Filizola", "Celmi", "Urano", "Ramuza", "Alfa", "Systel", "UPX", "Balmak", "Elgin", "Weightech"];
let selectedMaterialBrand = "all";
let selectedManualBrand = "all";
let externalSearchAbort;
let lastExternalQuery = "";
let runtimeProducts = [];

const setupMobileMenu = () => {
  const nav = document.querySelector(".site-header .nav-links");
  const siteHeader = document.querySelector(".site-header");
  if (!nav || !siteHeader || siteHeader.querySelector("[data-mobile-menu-toggle]")) return;

  const button = document.createElement("button");
  button.className = "mobile-menu-toggle";
  button.type = "button";
  button.dataset.mobileMenuToggle = "";
  button.setAttribute("aria-expanded", "false");
  button.textContent = "Menu";

  siteHeader.insertBefore(button, nav);
  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    nav.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  });
};

const curatedMaterials = [
  {
    name: "Portal Toledo/Prix",
    title: "Manual Toledo Prix 7E",
    type: "Manual PDF",
    brand: "Toledo",
    model: "Prix 7E",
    link: "https://www.toledobrasil.com/produtos/manuais-de-usuario/",
    description: "Manual do usuário da balança comercial Prix 7E, listado no portal oficial Toledo/Prix.",
    external: true,
  },
  {
    name: "Portal Toledo/Prix",
    title: "Manual Toledo Prix Rebanho",
    type: "Manual PDF",
    brand: "Toledo",
    model: "Prix Rebanho",
    link: "https://www.toledobrasil.com/produtos/manuais-de-usuario/",
    description: "Manual do usuário para balança de gado Prix Rebanho, indicado no portal oficial de manuais.",
    external: true,
  },
  {
    name: "Portal Toledo/Prix",
    title: "Manual Toledo 2098 e 2098 C",
    type: "Manual PDF",
    brand: "Toledo",
    model: "2098 e 2098 C",
    link: "https://www.toledobrasil.com/produtos/manuais-de-usuario/",
    description: "Manual do usuário para balanças Toledo 2098 e 2098 C.",
    external: true,
  },
  {
    name: "Doutor Balança",
    title: "Manual e guia Filizola Platina",
    type: "Manual PDF",
    brand: "Filizola",
    model: "Platina",
    link: "https://drbalanca.com.br/videos/cadastro-produtos-filizola-platina-manual/",
    description: "Material de apoio para cadastro e operação da Filizola Platina.",
    external: true,
  },
  {
    name: "Scribd",
    title: "Manual Filizola BP / BPS",
    type: "Manual PDF",
    brand: "Filizola",
    model: "BP / BPS",
    link: "https://pt.scribd.com/document/351374380/Manual-do-usuario-Filizola-Bp-BPS-WWW-DRBALANCA-COM-BR-pdf",
    description: "Manual de instalação e operação para balanças Filizola BP/BPS.",
    external: true,
  },
  {
    name: "Oswaldo Filizola",
    title: "Manual Filizola portátil para bovinos",
    type: "Manual PDF",
    brand: "Filizola",
    model: "Portátil para bovinos",
    link: "https://www.oswaldofilizola.com.br/pdf/manualbdpb.pdf",
    description: "Manual em PDF da balança digital portátil para bovinos.",
    external: true,
  },
  {
    name: "Scribd",
    title: "Manual técnico Celmi CSP-10A",
    type: "Manual PDF",
    brand: "Celmi",
    model: "CSP-10A",
    link: "https://pt.scribd.com/document/584547067/Manual-Te-cnico-CSP10A",
    description: "Manual técnico do indicador Celmi CSP-10A.",
    external: true,
  },
  {
    name: "Scribd",
    title: "Manual Celmi CSP-10B",
    type: "Manual PDF",
    brand: "Celmi",
    model: "CSP-10B",
    link: "https://www.scribd.com/document/772221980/Manual-CSP-10B",
    description: "Manual do usuário do indicador de pesagem sem fio Celmi CSP-10B.",
    external: true,
  },
  {
    name: "Celmi",
    title: "Material Celmi CSP-10Ci",
    type: "Manual PDF",
    brand: "Celmi",
    model: "CSP-10Ci",
    link: "https://www.celmi.com.br/produtos/terminais-e-indicadores/indicador-csp-10ci",
    description: "Página técnica oficial do indicador Celmi CSP-10Ci para peso individual, por eixo e total.",
    external: true,
  },
];

const defaultMaterials = [
  ...curatedMaterials,
  {
    name: "Exatta Tech",
    title: "Checklist antes de iniciar a pesagem",
    type: "Dica rápida",
    brand: "Geral",
    model: "Todos os modelos",
    link: "contato.html",
    description: "Confira conexão, estabilidade do peso, impressora e relatório antes de começar o atendimento.",
  },
  {
    name: "Exatta Tech",
    title: "Guia de suporte para Bluetooth",
    type: "Procedimento técnico",
    brand: "Geral",
    model: "Indicadores com Bluetooth",
    link: "ajuda.html",
    description: "Passos para revisar permissões, reconexão BLE, pareamento e testes básicos de comunicação.",
  },
];

const getMaterials = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(communityStorageKey));
    if (!Array.isArray(saved) || !saved.length) return defaultMaterials;

    const savedWithoutDuplicatedCurated = saved.filter(
      (item) => !curatedMaterials.some((curated) => curated.title === item.title && curated.brand === item.brand),
    );
    return [...curatedMaterials, ...savedWithoutDuplicatedCurated];
  } catch {
    return defaultMaterials;
  }
};

const runtimeMaterials = getMaterials();

const saveMaterials = (materials) => {
  localStorage.setItem(communityStorageKey, JSON.stringify(materials));
};

const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem(authStorageKey));
    if (!user?.name || !user?.email) return null;
    return user;
  } catch {
    return null;
  }
};

const getQuestions = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(questionStorageKey));
    if (Array.isArray(saved)) return saved;
  } catch {
    return [];
  }

  return [];
};

const saveQuestions = (questions) => {
  localStorage.setItem(questionStorageKey, JSON.stringify(questions));
};

const runtimeQuestions = getQuestions();

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });

const dataUrlToObjectUrl = (dataUrl) => {
  if (!String(dataUrl).startsWith("data:")) return dataUrl;

  try {
    const [meta, base64] = dataUrl.split(",");
    const mime = meta.match(/data:(.*?);/)?.[1] || "application/octet-stream";
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return URL.createObjectURL(new Blob([bytes], { type: mime }));
  } catch {
    return dataUrl;
  }
};

// A maioria dos sites de fabricante/revenda bloqueia incorporação em iframe
// (X-Frame-Options) ou tem link direto que expira (ex.: Mediafire) — por
// experiência, isso já quebrou com Toledo, Mediafire e Alfa Instrumentos.
// Em vez de ir bloqueando host por host conforme aparece erro, só tentamos
// embutir quando a fonte é confiável (upload do próprio site ou storage bruto
// tipo Azure Blob/S3, que normalmente não bloqueiam). Todo o resto manda
// direto para "Abrir fonte original".
const embeddablePdfHosts = ["blob.core.windows.net", "amazonaws.com", "urano.com.br", "primaxbalancas.com.br"];

const openPdfViewer = (title, link) => {
  if (!pdfViewer || !pdfFrame) return false;

  const cleanLink = String(link || "");
  const lowerLink = cleanLink.toLowerCase();
  const isOwnUpload =
    cleanLink.startsWith("/uploads/") ||
    cleanLink.startsWith("assets/") ||
    cleanLink.startsWith("/assets/") ||
    cleanLink.startsWith("blob:") ||
    cleanLink.startsWith("data:application/pdf");
  const isTrustedStorage = lowerLink.includes(".pdf") && embeddablePdfHosts.some((host) => lowerLink.includes(host));
  const canEmbed = isOwnUpload || isTrustedStorage;

  pdfFrame.hidden = !canEmbed;
  if (pdfBlocked) pdfBlocked.hidden = canEmbed;
  if (pdfExternal) pdfExternal.href = cleanLink;
  pdfFrame.src = canEmbed ? cleanLink : "";
  if (pdfTitle) pdfTitle.textContent = title || "Manual";
  pdfViewer.hidden = false;
  pdfViewer.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const fetchContent = async () => {
  const response = await fetch("/api/content");
  if (!response.ok) throw new Error("Não foi possível carregar o conteúdo.");
  return response.json();
};

const renderPublicApps = (apps = []) => {
  if (!appsList) return;

  appsList.innerHTML = apps.length
    ? apps
        .map(
          (app) => `
            <article class="project-card ${app.featured ? "featured-project" : ""}" data-category="${escapeHtml(app.category || "tecnico")}">
              ${
                app.icon
                  ? `<img class="app-icon" src="${escapeHtml(app.icon)}" alt="Ícone do app ${escapeHtml(app.title)}" />`
                  : `<div class="app-icon fallback-icon">${escapeHtml(app.initials || app.title?.slice(0, 2) || "AP")}</div>`
              }
              <span class="tag">${escapeHtml(app.tag || app.category || "App")}</span>
              <h2>${escapeHtml(app.title || "App sem título")}</h2>
              <p>${escapeHtml(app.description || "")}</p>
              <a class="download-link" href="${escapeHtml(app.link || "downloads.html")}">Ver download</a>
            </article>
          `,
        )
        .join("")
    : `<div class="empty-feed">Nenhum app cadastrado.</div>`;
};

const renderPublicDownloads = (downloads = []) => {
  if (downloadCards) {
    const featured = downloads.filter((item) => item.featured).slice(0, 3);
    downloadCards.innerHTML = featured.length
      ? featured
          .map(
            (item) => `
              <article>
                <span>${escapeHtml(item.project || "Projeto")}</span>
                <strong>${escapeHtml(item.category || "Categoria")}</strong>
                <p>${escapeHtml(item.description || item.file || "")}</p>
                <a href="${escapeHtml(item.link || "contato.html")}" ${String(item.link || "").startsWith("/uploads/") ? "download" : ""}>${escapeHtml(item.action || "Baixar")}</a>
              </article>
            `,
          )
          .join("")
      : `<div class="empty-feed">Nenhum download em destaque.</div>`;
  }

  if (downloadTable) {
    downloadTable.innerHTML = `
      <div class="table-row table-head"><span>Projeto</span><span>Categoria</span><span>Arquivo</span><span>Ação</span></div>
      ${
        downloads.length
          ? downloads
              .map(
                (item) => `
                  <div class="table-row">
                    <span>${escapeHtml(item.project || "Projeto")}</span>
                    <span>${escapeHtml(item.category || "Categoria")}</span>
                    <span>${escapeHtml(item.file || "Arquivo")}</span>
                    <a href="${escapeHtml(item.link || "contato.html")}" ${String(item.link || "").startsWith("/uploads/") ? "download" : ""}>${escapeHtml(item.action || "Abrir")}</a>
                  </div>
                `,
              )
              .join("")
          : `<div class="table-row"><span>Nenhum download cadastrado.</span><span></span><span></span><a href="admin.html">Admin</a></div>`
      }
    `;
  }
};

const renderPublicProducts = (products = []) => {
  if (!productsList) return;

  runtimeProducts = products;
  productsList.innerHTML = products.length
    ? products
        .map((product, index) => {
          const videos = getProductVideos(product);
          return `
            <article class="sales-card" data-product-card="${index}">
              ${product.image ? `<img src="${escapeHtml(product.image)}" alt="Imagem de ${escapeHtml(product.name || "produto")}" />` : `<div class="sales-placeholder">${escapeHtml(product.name?.slice(0, 2) || "PD")}</div>`}
              <div class="sales-card-body">
                <span>${escapeHtml(product.category || "Produto")}</span>
                <h2>${escapeHtml(product.name || "Produto sem nome")}</h2>
                <p>${escapeHtml(product.description || "")}</p>
                <strong>${escapeHtml(product.price || "Consulte")}</strong>
                <div class="sales-card-actions">
                  <button class="button secondary" type="button" data-product-detail="${index}">Ver detalhes</button>
                  <a class="button primary" href="${escapeHtml(product.link || "contato.html")}">${escapeHtml(product.action || "Comprar")}</a>
                </div>
                ${videos.length ? `<small>${videos.length} vídeo${videos.length > 1 ? "s" : ""} disponível${videos.length > 1 ? "eis" : ""}</small>` : ""}
              </div>
            </article>
          `;
        })
        .join("")
    : `
      <div class="sales-empty">
        <span>Vitrine vazia</span>
        <h2>Nenhum produto cadastrado ainda.</h2>
        <p>Entre no admin, abra a aba Vendas e adicione produtos com imagem, preço, descrição e link de compra.</p>
        <a class="button primary" href="admin.html">Abrir admin</a>
      </div>
    `;
};

const getProductVideos = (product = {}) => {
  const videos = [];
  if (Array.isArray(product.videos)) videos.push(...product.videos);
  if (product.video) videos.push(product.video);
  if (product.videosText) {
    videos.push(...String(product.videosText).split(/\n+/).map((item) => item.trim()).filter(Boolean));
  }

  return [...new Set(videos.filter(Boolean))];
};

const getYouTubeEmbed = (link = "") => {
  try {
    const url = new URL(link);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    if (host.includes("youtube.com")) {
      const id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }

  return "";
};

const renderProductVideos = (videos) => {
  if (!videos.length) return `<div class="sales-video-empty">Nenhum vídeo cadastrado para este produto.</div>`;

  return videos
    .map((video) => {
      const embed = getYouTubeEmbed(video);
      const isLocalVideo = /\.(mp4|mov|webm)$/i.test(video) || String(video).startsWith("/uploads/");

      if (embed) {
        return `<iframe title="Vídeo do produto" src="${escapeHtml(embed)}" loading="lazy" allowfullscreen></iframe>`;
      }

      if (isLocalVideo) {
        return `<video controls src="${escapeHtml(video)}"></video>`;
      }

      return `<a class="button secondary" href="${escapeHtml(video)}">Abrir vídeo</a>`;
    })
    .join("");
};

const openProductDetail = (index) => {
  const product = runtimeProducts[Number(index)];
  if (!product) return;

  let modal = document.querySelector("[data-product-modal]");
  if (!modal) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<section class="product-modal" data-product-modal hidden>
        <div class="product-modal-backdrop" data-product-close></div>
        <article class="product-modal-card" role="dialog" aria-modal="true">
          <button class="product-modal-close" type="button" data-product-close>Fechar</button>
          <div data-product-modal-content></div>
        </article>
      </section>`,
    );
    modal = document.querySelector("[data-product-modal]");
  }

  const videos = getProductVideos(product);
  modal.querySelector("[data-product-modal-content]").innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-media">
        ${
          product.image
            ? `<img src="${escapeHtml(product.image)}" alt="Imagem de ${escapeHtml(product.name || "produto")}" />`
            : `<div class="sales-placeholder">${escapeHtml(product.name?.slice(0, 2) || "PD")}</div>`
        }
      </div>
      <div class="product-detail-copy">
        <span>${escapeHtml(product.category || "Produto")}</span>
        <h2>${escapeHtml(product.name || "Produto sem nome")}</h2>
        <p>${escapeHtml(product.description || "")}</p>
        <strong>${escapeHtml(product.price || "Consulte")}</strong>
        <a class="button primary" href="${escapeHtml(product.link || "contato.html")}">${escapeHtml(product.action || "Comprar")}</a>
      </div>
    </div>
    <div class="product-video-section">
      <p class="eyebrow">Vídeos</p>
      <h3>Demonstração do produto</h3>
      <div class="product-video-grid">${renderProductVideos(videos)}</div>
    </div>
  `;
  modal.hidden = false;
};

const renderPublicContent = async () => {
  if (!appsList && !downloadCards && !downloadTable && !productsList && !manualBrandList && !communityFeed) return;

  try {
    const content = await fetchContent();
    renderPublicApps(content.apps || []);
    renderPublicDownloads(content.downloads || []);
    renderPublicProducts(content.products || []);
    applyServerBalanceMaterials(content.balanceMaterials || []);
  } catch {
    if (appsList) appsList.innerHTML = `<div class="empty-feed">Não consegui carregar os apps.</div>`;
    if (downloadCards) downloadCards.innerHTML = `<div class="empty-feed">Não consegui carregar os downloads.</div>`;
  }
};

const applyServerBalanceMaterials = (materials = []) => {
  if (!Array.isArray(materials) || !materials.length) return;

  const existingKeys = new Set(runtimeMaterials.map((item) => `${item.title}|${item.brand}|${item.model}|${item.link}`));
  materials.forEach((item) => {
    const material = {
      name: "Admin",
      title: item.title || "Material sem título",
      brand: item.brand || "Geral",
      model: item.model || "Todos os modelos",
      type: item.type || "Manual PDF",
      link: item.link || "#",
      description: item.description || "",
      previewType: item.type === "Vídeo" && /\.(mp4|mov|webm)$/i.test(item.link || "") ? "video" : "",
      external: false,
      admin: true,
    };
    const key = `${material.title}|${material.brand}|${material.model}|${material.link}`;
    if (!existingKeys.has(key)) runtimeMaterials.unshift(material);
  });

  renderMaterialModels();
  renderCommunityFeed();
  renderManualTabs();
};

let adminContent = { apps: [], downloads: [] };
let adminPassword = localStorage.getItem(adminPasswordStorageKey) || "";

const field = (label, value, path, multiline = false) => `
  <label>${label}
    ${
      multiline
        ? `<textarea rows="4" data-admin-field="${path}">${escapeHtml(value || "")}</textarea>`
        : `<input type="text" value="${escapeHtml(value || "")}" data-admin-field="${path}" />`
    }
  </label>
`;

const renderAdminApps = () => {
  if (!adminApps) return;

  adminApps.innerHTML = adminContent.apps
    .map(
      (app, index) => `
        <article class="admin-item">
          <header><strong>${escapeHtml(app.title || "Novo app")}</strong><button class="button secondary" type="button" data-remove-app="${index}">Remover</button></header>
          <div class="admin-grid">
            ${field("Nome", app.title, `apps.${index}.title`)}
            ${field("Categoria", app.category, `apps.${index}.category`)}
            ${field("Tag", app.tag, `apps.${index}.tag`)}
            ${field("Ícone", app.icon, `apps.${index}.icon`)}
            ${field("Iniciais", app.initials, `apps.${index}.initials`)}
            ${field("Link", app.link, `apps.${index}.link`)}
          </div>
          ${field("Descrição", app.description, `apps.${index}.description`, true)}
          <label class="checkbox-line"><input type="checkbox" data-admin-field="apps.${index}.featured" ${app.featured ? "checked" : ""} /> Destaque</label>
        </article>
      `,
    )
    .join("");
};

const renderAdminDownloads = () => {
  if (!adminDownloads) return;

  adminDownloads.innerHTML = adminContent.downloads
    .map(
      (item, index) => `
        <article class="admin-item">
          <header><strong>${escapeHtml(item.project || "Novo download")}</strong><button class="button secondary" type="button" data-remove-download="${index}">Remover</button></header>
          <div class="admin-grid">
            ${field("Projeto", item.project, `downloads.${index}.project`)}
            ${field("Categoria", item.category, `downloads.${index}.category`)}
            ${field("Arquivo", item.file, `downloads.${index}.file`)}
            ${field("Link", item.link, `downloads.${index}.link`)}
            ${field("Texto do botão", item.action, `downloads.${index}.action`)}
            <label>Arquivo do computador
              <input type="file" accept=".apk,.zip,.exe,.dmg,.pkg,.msi,.pdf" data-download-upload="${index}" />
            </label>
          </div>
          <button class="button secondary" type="button" data-upload-download="${index}">Enviar arquivo e preencher link</button>
          ${field("Descrição", item.description, `downloads.${index}.description`, true)}
          <label class="checkbox-line"><input type="checkbox" data-admin-field="downloads.${index}.featured" ${item.featured ? "checked" : ""} /> Destaque</label>
        </article>
      `,
    )
    .join("");
};

const renderAdminMaterials = () => {
  if (!adminMaterials) return;

  adminContent.balanceMaterials = Array.isArray(adminContent.balanceMaterials) ? adminContent.balanceMaterials : [];
  adminMaterials.innerHTML = adminContent.balanceMaterials
    .map(
      (item, index) => `
        <article class="admin-item">
          <header><strong>${escapeHtml(item.title || "Novo material")}</strong><button class="button secondary" type="button" data-remove-material="${index}">Remover</button></header>
          <div class="admin-grid">
            ${field("Título", item.title, `balanceMaterials.${index}.title`)}
            <label>Tipo
              <select data-admin-field="balanceMaterials.${index}.type">
                <option ${item.type === "Manual PDF" ? "selected" : ""}>Manual PDF</option>
                <option ${item.type === "Vídeo" ? "selected" : ""}>Vídeo</option>
              </select>
            </label>
            ${field("Marca", item.brand, `balanceMaterials.${index}.brand`)}
            ${field("Modelo", item.model, `balanceMaterials.${index}.model`)}
            ${field("Link", item.link, `balanceMaterials.${index}.link`)}
            <label>Arquivo do computador
              <input type="file" accept="application/pdf,video/mp4,video/quicktime,video/webm" data-admin-upload="${index}" />
            </label>
          </div>
          <button class="button secondary" type="button" data-upload-material="${index}">Enviar arquivo e preencher link</button>
          ${field("Descrição", item.description, `balanceMaterials.${index}.description`, true)}
        </article>
      `,
    )
    .join("");
};

const renderAdminProducts = () => {
  if (!adminProducts) return;

  adminContent.products = Array.isArray(adminContent.products) ? adminContent.products : [];
  adminProducts.innerHTML = adminContent.products
    .map(
      (product, index) => `
        <article class="admin-item">
          <header><strong>${escapeHtml(product.name || "Novo produto")}</strong><button class="button secondary" type="button" data-remove-product="${index}">Remover</button></header>
          <div class="admin-grid">
            ${field("Nome do produto", product.name, `products.${index}.name`)}
            ${field("Categoria", product.category, `products.${index}.category`)}
            ${field("Preço", product.price, `products.${index}.price`)}
            ${field("Link de compra", product.link, `products.${index}.link`)}
            ${field("Texto do botão", product.action, `products.${index}.action`)}
            ${field("Imagem", product.image, `products.${index}.image`)}
            ${field("Vídeo principal", product.video, `products.${index}.video`)}
            <label>Imagem do computador
              <input type="file" accept="image/png,image/jpeg,image/webp" data-product-upload="${index}" />
            </label>
            <label>Vídeo do computador
              <input type="file" accept="video/mp4,video/quicktime,video/webm" data-product-video-upload="${index}" />
            </label>
          </div>
          <div class="admin-inline-actions">
            <button class="button secondary" type="button" data-upload-product="${index}">Enviar imagem e preencher campo</button>
            <button class="button secondary" type="button" data-upload-product-video="${index}">Enviar vídeo e preencher campo</button>
          </div>
          ${field("Descrição", product.description, `products.${index}.description`, true)}
          ${field("Vídeos extras, um link por linha", product.videosText, `products.${index}.videosText`, true)}
        </article>
      `,
    )
    .join("");
};

const renderAdmin = () => {
  adminContent.apps = Array.isArray(adminContent.apps) ? adminContent.apps : [];
  adminContent.downloads = Array.isArray(adminContent.downloads) ? adminContent.downloads : [];
  adminContent.balanceMaterials = Array.isArray(adminContent.balanceMaterials) ? adminContent.balanceMaterials : [];
  adminContent.products = Array.isArray(adminContent.products) ? adminContent.products : [];
  renderAdminApps();
  renderAdminDownloads();
  renderAdminMaterials();
  renderAdminProducts();
};

const setAdminValue = (path, value) => {
  const [collection, index, key] = path.split(".");
  if (!adminContent[collection]?.[Number(index)]) return;
  adminContent[collection][Number(index)][key] = value;
  if (adminStatus) adminStatus.textContent = "Alterações locais ainda não salvas.";
};

const loadAdmin = async () => {
  adminContent = await fetchContent();
  if (adminWorkspace) adminWorkspace.hidden = false;
  renderAdmin();
};

const saveAdmin = async () => {
  await uploadPendingAdminMaterialFiles();
  await uploadPendingAdminDownloadFiles();
  await uploadPendingAdminProductImages();
  await uploadPendingAdminProductVideos();

  const response = await fetch("/api/content", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-admin-password": adminPassword,
    },
    body: JSON.stringify(adminContent),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Não foi possível salvar.");
  if (adminStatus) adminStatus.textContent = "Salvo com sucesso.";
};

const uploadAdminFile = async (file) => {
  const response = await fetch(`/api/upload?name=${encodeURIComponent(file.name)}`, {
    method: "POST",
    headers: {
      "content-type": file.type || "application/octet-stream",
      "x-admin-password": adminPassword,
    },
    body: file,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Falha ao enviar arquivo.");
  return data.link;
};

const uploadAdminMaterialFile = async (index, shouldRender = true) => {
  const fileInput = document.querySelector(`[data-admin-upload="${index}"]`);
  const file = fileInput?.files?.[0];
  if (!file) {
    if (adminStatus) adminStatus.textContent = "Escolha um arquivo antes de enviar.";
    return;
  }

  adminContent.balanceMaterials[index].link = await uploadAdminFile(file);
  adminContent.balanceMaterials[index].type = file.type.startsWith("video/") ? "Vídeo" : "Manual PDF";
  if (!adminContent.balanceMaterials[index].title || adminContent.balanceMaterials[index].title === "Novo manual") {
    adminContent.balanceMaterials[index].title = file.name.replace(/\.[^.]+$/, "");
  }
  if (shouldRender) renderAdminMaterials();
  if (adminStatus) adminStatus.textContent = "Arquivo enviado. Salvando publicação...";
};

const uploadPendingAdminMaterialFiles = async () => {
  const uploadInputs = [...document.querySelectorAll("[data-admin-upload]")].filter((input) => input.files?.[0]);

  for (const input of uploadInputs) {
    await uploadAdminMaterialFile(Number(input.dataset.adminUpload), false);
  }
};

const uploadAdminDownloadFile = async (index, shouldRender = true) => {
  const fileInput = document.querySelector(`[data-download-upload="${index}"]`);
  const file = fileInput?.files?.[0];
  if (!file) {
    if (adminStatus) adminStatus.textContent = "Escolha um arquivo antes de enviar.";
    return;
  }

  adminContent.downloads[index].link = await uploadAdminFile(file);
  adminContent.downloads[index].file = file.name;
  adminContent.downloads[index].action = "Baixar";
  if (!adminContent.downloads[index].project || adminContent.downloads[index].project === "Novo download") {
    adminContent.downloads[index].project = file.name.replace(/\.[^.]+$/, "");
  }
  if (shouldRender) renderAdminDownloads();
  if (adminStatus) adminStatus.textContent = "Arquivo de download enviado. Salvando publicação...";
};

const uploadPendingAdminDownloadFiles = async () => {
  const uploadInputs = [...document.querySelectorAll("[data-download-upload]")].filter((input) => input.files?.[0]);

  for (const input of uploadInputs) {
    await uploadAdminDownloadFile(Number(input.dataset.downloadUpload), false);
  }
};

const uploadAdminProductImage = async (index, shouldRender = true) => {
  const fileInput = document.querySelector(`[data-product-upload="${index}"]`);
  const file = fileInput?.files?.[0];
  if (!file) {
    if (adminStatus) adminStatus.textContent = "Escolha uma imagem antes de enviar.";
    return;
  }

  adminContent.products[index].image = await uploadAdminFile(file);
  if (!adminContent.products[index].name || adminContent.products[index].name === "Novo produto") {
    adminContent.products[index].name = file.name.replace(/\.[^.]+$/, "");
  }
  if (!adminContent.products[index].action) {
    adminContent.products[index].action = "Comprar";
  }
  if (shouldRender) renderAdminProducts();
  if (adminStatus) adminStatus.textContent = "Imagem enviada. Salvando produto...";
};

const uploadPendingAdminProductImages = async () => {
  const uploadInputs = [...document.querySelectorAll("[data-product-upload]")].filter((input) => input.files?.[0]);

  for (const input of uploadInputs) {
    await uploadAdminProductImage(Number(input.dataset.productUpload), false);
  }
};

const uploadAdminProductVideo = async (index, shouldRender = true) => {
  const fileInput = document.querySelector(`[data-product-video-upload="${index}"]`);
  const file = fileInput?.files?.[0];
  if (!file) {
    if (adminStatus) adminStatus.textContent = "Escolha um vídeo antes de enviar.";
    return;
  }

  adminContent.products[index].video = await uploadAdminFile(file);
  if (!adminContent.products[index].name || adminContent.products[index].name === "Novo produto") {
    adminContent.products[index].name = file.name.replace(/\.[^.]+$/, "");
  }
  if (shouldRender) renderAdminProducts();
  if (adminStatus) adminStatus.textContent = "Vídeo enviado. Salvando produto...";
};

const uploadPendingAdminProductVideos = async () => {
  const uploadInputs = [...document.querySelectorAll("[data-product-video-upload]")].filter((input) => input.files?.[0]);

  for (const input of uploadInputs) {
    await uploadAdminProductVideo(Number(input.dataset.productVideoUpload), false);
  }
};

const setupAdmin = () => {
  if (!adminLogin) return;

  if (adminPassword) loadAdmin().catch(() => localStorage.removeItem(adminPasswordStorageKey));

  adminLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    adminPassword = new FormData(adminLogin).get("password").trim();
    localStorage.setItem(adminPasswordStorageKey, adminPassword);
    await loadAdmin();
    adminLogin.reset();
  });

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-admin-tab]").forEach((tab) => tab.classList.remove("active"));
      document.querySelectorAll("[data-admin-panel]").forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`[data-admin-panel="${button.dataset.adminTab}"]`)?.classList.add("active");
    });
  });

  adminWorkspace?.addEventListener("input", (event) => {
    const control = event.target.closest("[data-admin-field]");
    if (!control) return;
    setAdminValue(control.dataset.adminField, control.type === "checkbox" ? control.checked : control.value);
  });

  adminWorkspace?.addEventListener("change", async (event) => {
    const uploadInput = event.target.closest("[data-admin-upload]");
    const downloadUploadInput = event.target.closest("[data-download-upload]");
    const productUploadInput = event.target.closest("[data-product-upload]");
    const productVideoUploadInput = event.target.closest("[data-product-video-upload]");
    if (!uploadInput?.files?.[0] && !downloadUploadInput?.files?.[0] && !productUploadInput?.files?.[0] && !productVideoUploadInput?.files?.[0]) return;

    try {
      if (uploadInput?.files?.[0]) {
        await uploadAdminMaterialFile(Number(uploadInput.dataset.adminUpload));
      }
      if (downloadUploadInput?.files?.[0]) {
        await uploadAdminDownloadFile(Number(downloadUploadInput.dataset.downloadUpload));
      }
      if (productUploadInput?.files?.[0]) {
        await uploadAdminProductImage(Number(productUploadInput.dataset.productUpload));
      }
      if (productVideoUploadInput?.files?.[0]) {
        await uploadAdminProductVideo(Number(productVideoUploadInput.dataset.productVideoUpload));
      }
      await saveAdmin();
      if (adminStatus) adminStatus.textContent = "Arquivo enviado e salvo.";
    } catch (error) {
      if (adminStatus) adminStatus.textContent = error.message;
    }
  });

  adminWorkspace?.addEventListener("click", async (event) => {
    const addApp = event.target.closest("[data-add-app]");
    const addDownload = event.target.closest("[data-add-download]");
    const addMaterial = event.target.closest("[data-add-material]");
    const addProduct = event.target.closest("[data-add-product]");
    const saveButton = event.target.closest("[data-save-content]");
    const uploadMaterial = event.target.closest("[data-upload-material]");
    const uploadDownload = event.target.closest("[data-upload-download]");
    const uploadProduct = event.target.closest("[data-upload-product]");
    const uploadProductVideo = event.target.closest("[data-upload-product-video]");
    const removeApp = event.target.closest("[data-remove-app]");
    const removeDownload = event.target.closest("[data-remove-download]");
    const removeMaterial = event.target.closest("[data-remove-material]");
    const removeProduct = event.target.closest("[data-remove-product]");

    if (addApp) {
      adminContent.apps.push({ title: "Novo app", category: "tecnico", tag: "App", description: "", icon: "", initials: "AP", link: "downloads.html", featured: false });
      renderAdminApps();
    }
    if (addDownload) {
      adminContent.downloads.push({ project: "Novo download", category: "Categoria", file: "Arquivo", description: "", link: "contato.html", action: "Abrir", featured: false });
      renderAdminDownloads();
    }
    if (addMaterial) {
      adminContent.balanceMaterials.push({ title: "Novo manual", type: "Manual PDF", brand: "Toledo", model: "Modelo", link: "", description: "" });
      renderAdminMaterials();
    }
    const addMaterialBulk = event.target.closest("[data-add-material-bulk]");
    if (addMaterialBulk) {
      const bulkBrand = adminWorkspace.querySelector("[data-bulk-brand]");
      const bulkType = adminWorkspace.querySelector("[data-bulk-type]");
      const bulkTextarea = adminWorkspace.querySelector("[data-bulk-materials]");
      const bulkStatus = adminWorkspace.querySelector("[data-bulk-status]");

      const brand = bulkBrand?.value.trim() || "Geral";
      const type = bulkType?.value || "Manual PDF";
      const lines = (bulkTextarea?.value || "").split("\n").map((line) => line.trim()).filter(Boolean);

      let added = 0;
      let skipped = 0;
      lines.forEach((line) => {
        const [model, description, link] = line.split("|").map((part) => part?.trim() || "");
        if (!model || !link) {
          skipped += 1;
          return;
        }
        adminContent.balanceMaterials.push({
          title: description || model,
          type,
          brand,
          model,
          link,
          description: description || "",
        });
        added += 1;
      });

      if (bulkStatus) {
        bulkStatus.textContent = added
          ? `${added} ${added > 1 ? "manuais adicionados" : "manual adicionado"}${skipped ? ` (${skipped} linha${skipped > 1 ? "s" : ""} ignorada${skipped > 1 ? "s" : ""} por faltar modelo ou link)` : ""}. Clique em "Salvar alterações" para publicar.`
          : "Nenhuma linha válida encontrada. Use o formato Modelo | Descrição | Link, um por linha.";
      }
      if (added) {
        if (bulkTextarea) bulkTextarea.value = "";
        renderAdminMaterials();
      }
    }
    if (addProduct) {
      adminContent.products.push({ name: "Novo produto", category: "Produto", price: "", description: "", image: "", video: "", videosText: "", link: "contato.html", action: "Comprar" });
      renderAdminProducts();
    }
    if (removeApp) {
      adminContent.apps.splice(Number(removeApp.dataset.removeApp), 1);
      renderAdminApps();
    }
    if (removeDownload) {
      adminContent.downloads.splice(Number(removeDownload.dataset.removeDownload), 1);
      renderAdminDownloads();
    }
    if (removeMaterial) {
      adminContent.balanceMaterials.splice(Number(removeMaterial.dataset.removeMaterial), 1);
      renderAdminMaterials();
    }
    if (removeProduct) {
      adminContent.products.splice(Number(removeProduct.dataset.removeProduct), 1);
      renderAdminProducts();
    }
    if (saveButton) {
      try {
        await saveAdmin();
      } catch (error) {
        if (adminStatus) adminStatus.textContent = error.message;
      }
    }
    if (uploadMaterial) {
      try {
        await uploadAdminMaterialFile(Number(uploadMaterial.dataset.uploadMaterial));
        await saveAdmin();
        if (adminStatus) adminStatus.textContent = "Arquivo enviado e material salvo. Abra Manuais PDF para conferir.";
      } catch (error) {
        if (adminStatus) adminStatus.textContent = error.message;
      }
    }
    if (uploadDownload) {
      try {
        await uploadAdminDownloadFile(Number(uploadDownload.dataset.uploadDownload));
        await saveAdmin();
        if (adminStatus) adminStatus.textContent = "Arquivo enviado e download salvo.";
      } catch (error) {
        if (adminStatus) adminStatus.textContent = error.message;
      }
    }
    if (uploadProduct) {
      try {
        await uploadAdminProductImage(Number(uploadProduct.dataset.uploadProduct));
        await saveAdmin();
        if (adminStatus) adminStatus.textContent = "Imagem enviada e produto salvo. Abra Vendas para conferir.";
      } catch (error) {
        if (adminStatus) adminStatus.textContent = error.message;
      }
    }
    if (uploadProductVideo) {
      try {
        await uploadAdminProductVideo(Number(uploadProductVideo.dataset.uploadProductVideo));
        await saveAdmin();
        if (adminStatus) adminStatus.textContent = "Vídeo enviado e produto salvo. Abra Vendas para conferir.";
      } catch (error) {
        if (adminStatus) adminStatus.textContent = error.message;
      }
    }
  });
};

const matchesQuery = (item, query) => {
  const haystack = `${item.title} ${item.type} ${item.brand || ""} ${item.model || ""} ${item.description}`.toLowerCase();
  return haystack.includes(query);
};

const renderQuickResultCards = (items) =>
  items
    .map(
      (item) => `
        <article class="quick-result-card">
          <span>${escapeHtml(item.type)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <div class="material-meta">
            <b>${escapeHtml(item.brand || "Marca não informada")}</b>
            <em>${escapeHtml(item.model || "Modelo não informado")}</em>
          </div>
          <p>${escapeHtml(item.description)}</p>
          <a href="${escapeHtml(item.link)}">${item.external ? "Abrir fonte" : "Abrir material"}</a>
        </article>
      `,
    )
    .join("");

const openResultsPage = (query) => {
  const cleanQuery = query.trim();
  if (!cleanQuery) return;
  window.open(`resultados.html?q=${encodeURIComponent(cleanQuery)}`, "_blank", "noopener,noreferrer");
};

// Mesma lógica do app Flutter (LocalCatalogService._normalize): remove
// acentos e pontuação para comparar consultas com os modelos cadastrados.
const normalizeSearchText = (input) => {
  const accented = "áàâãäéèêëíìîïóòôõöúùûüçñ";
  const plain = "aaaaaeeeeiiiiooooouuuucn";
  let result = String(input).toLowerCase();
  for (let i = 0; i < accented.length; i += 1) {
    result = result.replaceAll(accented[i], plain[i]);
  }
  return result.replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
};

// Mesma lógica do app Flutter (LocalCatalogService.findMatch): acha o
// manual já cadastrado no acervo cujo modelo mais combina com a busca.
const findLocalManualMatch = (query) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return null;

  let best = null;
  let bestScore = 0;

  document.querySelectorAll("[data-manual-model]").forEach((link) => {
    const model = link.dataset.manualModel || "";
    if (!model) return;

    const brand = link.closest("[data-manual-panel]")?.dataset.manualPanel || "";
    const normalizedModel = normalizeSearchText(model);
    const normalizedBrand = normalizeSearchText(brand);
    if (!normalizedModel) return;

    const brandBonus = normalizedBrand && normalizedQuery.includes(normalizedBrand) ? 10 : 0;
    let score = 0;

    if (normalizedQuery.includes(normalizedModel) || normalizedModel.includes(normalizedQuery)) {
      score = normalizedModel.length + brandBonus;
    } else {
      const words = normalizedModel.split(" ").filter(Boolean);
      if (words.length && words.every((word) => normalizedQuery.includes(word))) {
        score = words.join("").length + brandBonus;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = { link, brand };
    }
  });

  return best;
};

const renderAuthState = () => {
  const user = getCurrentUser();

  if (headerAction) headerAction.hidden = Boolean(user);
  if (headerLoginBadge) {
    headerLoginBadge.hidden = !user;
    headerLoginBadge.textContent = user?.name?.trim()?.charAt(0)?.toUpperCase() || "G";
    headerLoginBadge.title = user ? `${user.name} conectado` : "Conta conectada";
  }
};

const startGoogleLogin = () => {
  const currentUser = getCurrentUser();
  if (currentUser) return currentUser;

  const shouldLogin = confirm("Para continuar, entre com sua conta Google.");
  if (!shouldLogin) return null;

  const user = {
    name: "Alex Junior",
    email: "conta-google-local@alex.dev",
    provider: "google",
  };

  localStorage.setItem(authStorageKey, JSON.stringify(user));
  renderAuthState();
  return user;
};

const requireGoogleLogin = () => {
  const user = getCurrentUser();
  if (user) return user;
  return startGoogleLogin();
};

const renderQuestions = () => {
  if (!questionList) return;

  if (!runtimeQuestions.length) {
    questionList.innerHTML = `
      <div class="empty-feed">
        Nenhuma pergunta publicada ainda. Entre com Google e seja o primeiro a abrir uma dúvida.
      </div>
    `;
    return;
  }

  questionList.innerHTML = runtimeQuestions
    .map((item) => {
      const answers = Array.isArray(item.answers) ? item.answers : [];
      return `
        <article class="question-card">
          <div class="question-card-head">
            <span>${escapeHtml(item.brand)}</span>
            <em>${escapeHtml(item.model)}</em>
          </div>
          <h3>${escapeHtml(item.question)}</h3>
          <p>Publicado por ${escapeHtml(item.author)}.</p>
          <div class="answer-list">
            ${
              answers.length
                ? answers
                    .map(
                      (answer) => `
                        <div class="answer-card">
                          <strong>${escapeHtml(answer.author)}</strong>
                          <p>${escapeHtml(answer.text)}</p>
                        </div>
                      `,
                    )
                    .join("")
                : `<div class="answer-card muted-answer">Aguardando resposta da comunidade.</div>`
            }
          </div>
          <form class="answer-form" data-answer-form data-question-id="${escapeHtml(item.id)}">
            <input type="text" name="answer" placeholder="Responder esta pergunta" required />
            <button class="button secondary" type="submit">Responder</button>
          </form>
        </article>
      `;
    })
    .join("");
};

const renderResultsPage = async () => {
  if (!resultsManuals || !resultsVideos || !resultsStatus) return;

  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();
  const normalizedQuery = query.toLowerCase();

  if (resultsQuery) resultsQuery.textContent = query || "equipamento";
  if (resultsInput) resultsInput.value = query;

  if (!query) {
    resultsStatus.textContent = "Digite um equipamento para buscar.";
    resultsManuals.innerHTML = `<div class="empty-feed">Nenhum manual pesquisado.</div>`;
    resultsVideos.innerHTML = `<div class="empty-feed">Nenhum vídeo pesquisado.</div>`;
    return;
  }

  const localMatches = runtimeMaterials.filter((item) => matchesQuery(item, normalizedQuery));
  const localManuals = localMatches.filter((item) => item.type === "Manual PDF");
  const localVideos = localMatches.filter((item) => item.type === "Vídeo");

  if (localManuals.length || localVideos.length) {
    resultsStatus.textContent = "Resultados encontrados primeiro no acervo do site.";
    resultsManuals.innerHTML = localManuals.length ? renderQuickResultCards(localManuals) : `<div class="empty-feed">Nenhum manual no acervo do site.</div>`;
    resultsVideos.innerHTML = localVideos.length ? renderQuickResultCards(localVideos) : `<div class="empty-feed">Nenhum vídeo no acervo do site.</div>`;
    return;
  }

  resultsStatus.textContent = "Nada encontrado no acervo do site. Buscando manuais e vídeos externos...";

  try {
    const response = await fetch(`/api/external-search?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Falha na busca externa.");

    resultsStatus.textContent = "Resultados externos carregados dentro do site.";
    resultsManuals.innerHTML = renderLiveResultCards(data.manuals || [], "manual");
    resultsVideos.innerHTML = renderLiveResultCards(data.videos || [], "video");
  } catch {
    resultsStatus.textContent = "Não consegui buscar fora agora. Confirme se o servidor Node está rodando.";
    resultsManuals.innerHTML = `<div class="empty-feed">Busca indisponível.</div>`;
    resultsVideos.innerHTML = `<div class="empty-feed">Busca indisponível.</div>`;
  }
};

if (window.location.pathname.endsWith("balanceiros.html") && window.location.hash === "#contribuir") {
  window.location.replace("balanceiros.html#postar");
}

const showBalancePanel = (panelId = "busca-rapida", shouldUpdateHash = true) => {
  if (!balancePanels.length) return;

  const availablePanels = [...balancePanels].map((panel) => panel.dataset.balancePanel);
  const activePanel = availablePanels.includes(panelId) ? panelId : "busca-rapida";

  balancePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.balancePanel === activePanel);
  });

  balanceTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.balanceTab === activePanel);
  });

  if (shouldUpdateHash && window.location.hash !== `#${activePanel}`) {
    history.replaceState(null, "", `#${activePanel}`);
  }
};

const renderCommunityFeed = () => {
  if (!communityFeed) return;

  const search = materialSearch?.value.trim().toLowerCase() || "";
  const selectedModel = materialModel?.value || "all";
  const selectedType = materialType?.value || "Vídeo";
  const filterMaterial = (item) => {
    const haystack = `${item.title} ${item.type} ${item.brand || ""} ${item.model || ""} ${item.description}`.toLowerCase();
    const isOtherBrand = !mainBrands.includes(item.brand);
    const brandMatches =
      selectedMaterialBrand === "all" ||
      item.brand === selectedMaterialBrand ||
      (selectedMaterialBrand === "other" && isOtherBrand);
    const modelMatches = selectedModel === "all" || item.model === selectedModel;
    const typeMatches = selectedType === "all" || item.type === selectedType;
    return haystack.includes(search) && brandMatches && modelMatches && typeMatches;
  };
  const localMaterials = runtimeMaterials.filter((item) => !item.external && item.type === "Vídeo");
  const localResults = localMaterials.filter(filterMaterial);
  const externalResults = [];
  const filteredMaterials = localResults.length ? localResults : externalResults;
  const externalQuery = search || [selectedMaterialBrand, selectedModel].filter((item) => item && item !== "all" && item !== "other").join(" ");
  const showingExternalResults = !localResults.length && Boolean(search) && externalResults.length > 0;
  renderExternalSuggestions(localResults.length, externalResults.length, externalQuery, Boolean(search));

  communityFeed.innerHTML = filteredMaterials.length
    ? filteredMaterials
    .map(
      (item) => `
        <article class="community-material">
          <span>${escapeHtml(item.type)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <div class="material-meta">
            <b>${escapeHtml(item.brand || "Marca não informada")}</b>
            <em>${escapeHtml(item.model || "Modelo não informado")}</em>
          </div>
          <p>${escapeHtml(item.description)}</p>
          <small>Enviado por ${escapeHtml(item.name)}</small>
          ${item.previewType === "video" ? `<video controls src="${escapeHtml(item.link)}"></video>` : ""}
          <a href="${escapeHtml(item.link)}">${showingExternalResults ? "Abrir fonte externa" : "Abrir material"}</a>
        </article>
      `,
    )
    .join("")
    : `<div class="empty-feed">${search ? "Nenhum vídeo próprio encontrado para essa busca." : "Nenhum vídeo próprio publicado nesta aba ainda."}</div>`;
};

const renderExternalSuggestions = (localCount, externalCount, query, hasSearch) => {
  if (!externalSearch) return;

  if (localCount) {
    externalSearch.innerHTML = `<strong>Resultado encontrado no seu site.</strong><span>Mostrando vídeos publicados no acervo próprio.</span>`;
    return;
  }

  if (!hasSearch) {
    externalSearch.innerHTML = `<span>Digite um modelo para buscar vídeos no acervo do site. Vídeos de terceiros só aparecem quando não houver conteúdo próprio correspondente.</span>`;
    return;
  }

  if (externalCount) {
    externalSearch.innerHTML = `<strong>Não encontrei conteúdo próprio para essa busca.</strong><span>Mostrando abaixo materiais de terceiros já cadastrados no site.</span>`;
    return;
  }

  renderLiveExternalResults(query);
};

const renderLiveExternalResults = async (query) => {
  if (!query || !externalSearch) return;
  if (lastExternalQuery === query) return;

  lastExternalQuery = query;
  externalSearchAbort?.abort();
  externalSearchAbort = new AbortController();
  externalSearch.innerHTML = `<strong>Não encontrei vídeos próprios para esse equipamento.</strong><span>Buscando vídeos externos para exibir aqui...</span>`;

  try {
    const response = await fetch(`/api/external-search?query=${encodeURIComponent(query)}`, {
      signal: externalSearchAbort.signal,
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Falha na busca externa.");

    const videos = data.videos || [];

    externalSearch.innerHTML = `
      <strong>Vídeos externos encontrados para "${escapeHtml(query)}"</strong>
      <div class="live-results-grid videos-only-results">
        <section>
          ${renderLiveResultCards(videos, "video")}
        </section>
      </div>
    `;
  } catch (error) {
    if (error.name === "AbortError") return;

    externalSearch.innerHTML = `
      <strong>Não consegui buscar resultados externos agora.</strong>
      <span>Para trazer resultados automaticamente dentro do site, rode esta página pelo servidor local <code>node server.js</code>.</span>
    `;
  }
};

const renderLiveResultCards = (items, type) => {
  if (!items.length) return `<div class="empty-feed">Nenhum resultado encontrado.</div>`;

  return items
    .map(
      (item) => `
        <article class="live-result-card">
          ${type === "video" && item.embed ? `<iframe title="${escapeHtml(item.title)}" src="${escapeHtml(item.embed)}" loading="lazy" allowfullscreen></iframe>` : ""}
          <span>${type === "video" ? "Vídeo" : "Manual / PDF"}</span>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.description || "Resultado externo encontrado para o equipamento pesquisado.")}</p>
          <a href="${escapeHtml(item.link)}">Abrir fonte</a>
        </article>
      `,
    )
    .join("");
};

const renderMaterialModels = () => {
  if (!materialModel) return;

  const current = materialModel.value;
  const models = [
    ...new Set(
      runtimeMaterials
        .filter((item) => {
          const isOtherBrand = !mainBrands.includes(item.brand);
          return (
            selectedMaterialBrand === "all" ||
            item.brand === selectedMaterialBrand ||
            (selectedMaterialBrand === "other" && isOtherBrand)
          );
        })
        .map((item) => item.model)
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));

  materialModel.innerHTML = `<option value="all">Todos os modelos</option>${models
    .map((model) => `<option value="${escapeHtml(model)}">${escapeHtml(model)}</option>`)
    .join("")}`;
  materialModel.value = models.includes(current) ? current : "all";
};

const renderCommunityManuals = () => {
  if (!manualBrandList) return;

  manualBrandList.querySelectorAll("[data-dynamic-manual]").forEach((item) => item.remove());

  const manuals = runtimeMaterials.filter((item) => !item.external && item.type === "Manual PDF" && item.link && item.link !== "#");
  const brandFor = (item) => {
    if (!item.admin) return "Comunidade";
    return mainBrands.find((brand) => brand.toLowerCase() === String(item.brand || "").trim().toLowerCase()) || "Comunidade";
  };

  manuals.forEach((item) => {
    const panelName = brandFor(item);
    const panel = [...manualPanels].find((manualPanel) => manualPanel.dataset.manualPanel === panelName);
    const container = panel?.querySelector(".manual-items");
    if (!container) return;

    const manualLink = dataUrlToObjectUrl(item.link);
    container.insertAdjacentHTML(
      "beforeend",
      `
        <a data-dynamic-manual data-manual-model="${escapeHtml(item.model || "")}" data-pdf-link="${escapeHtml(manualLink)}" data-pdf-name="${escapeHtml(item.title)}" href="#visualizar-manual">
          <b>${escapeHtml(item.title)}</b>
          <small>${escapeHtml(item.brand || "Marca não informada")} · ${escapeHtml(item.model || "Modelo não informado")}</small>
          <small>${escapeHtml(item.description)}</small>
          <em>Ver no site</em>
        </a>
      `,
    );
  });

  manualPanels.forEach((panel) => {
    const count = panel.querySelectorAll("[data-manual-model]").length;
    const counter = panel.querySelector("header strong");
    if (!counter) return;
    const noun = panel.dataset.manualPanel === "Comunidade" ? "enviados" : "cadastrados";
    counter.textContent = `${count} ${count === 1 ? "manual" : "manuais"} ${noun}`;
  });
};

const enhanceManualCards = () => {
  if (!manualBrandList) return;

  manualBrandList.querySelectorAll("a[href]").forEach((link) => {
    if (!link.dataset.pdfLink) link.dataset.pdfLink = link.getAttribute("href");
    if (!link.dataset.pdfName) link.dataset.pdfName = link.querySelector("b")?.textContent?.trim() || "Manual";
    link.setAttribute("href", "#visualizar-manual");
    link.removeAttribute("target");
    link.removeAttribute("download");
    if (!link.querySelector("em")) link.insertAdjacentHTML("beforeend", "<em>Ver no site</em>");
  });
};

const renderManualTabs = () => {
  renderCommunityManuals();
  enhanceManualCards();

  const search = manualModelSearch?.value.trim().toLowerCase() || "";
  let visibleManualCount = 0;

  manualTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.manualTab === selectedManualBrand);
  });

  const isAllMode = selectedManualBrand === "all";

  manualPanels.forEach((panel) => {
    const isActive = isAllMode ? Boolean(search) : panel.dataset.manualPanel === selectedManualBrand;
    if (!isActive) {
      panel.classList.remove("active");
      return;
    }

    let panelVisibleCount = 0;
    panel.querySelectorAll("[data-manual-model]").forEach((item) => {
      const haystack = `${item.dataset.manualModel || ""} ${item.textContent}`.toLowerCase();
      const isHidden = !search ? false : !haystack.includes(search);
      item.classList.toggle("hidden", isHidden);
      if (!isHidden) {
        visibleManualCount += 1;
        panelVisibleCount += 1;
      }
    });

    // No modo "Todas" com busca, só mostra a marca se ela tiver resultado —
    // evita poluir a tela com cabeçalhos de marcas sem nenhum manual encontrado.
    panel.classList.toggle("active", !isAllMode || !search || panelVisibleCount > 0);
  });

  if (manualEmpty) {
    const showPrompt = selectedManualBrand === "all" && !search;
    const showNoResults = selectedManualBrand === "all" && Boolean(search) && visibleManualCount === 0;
    manualEmpty.textContent = showNoResults
      ? "Nenhum manual encontrado para esse modelo."
      : "Digite um modelo para buscar em todas as marcas.";
    manualEmpty.classList.toggle("active", showPrompt || showNoResults);
  }
};

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 18);
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll("[data-category]").forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const clickedButton = event.submitter;
  const data = new FormData(form);
  const name = data.get("name").trim();
  const subject = data.get("subject");
  const message = data.get("message").trim();
  const text = `Olá, meu nome é ${name}. Preciso de ajuda com: ${subject}. Mensagem: ${message}`;

  if (clickedButton.dataset.channel === "email") {
    const mailto = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = mailto;
    return;
  }

  const whatsapp = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(text)}`;
  window.open(whatsapp, "_blank", "noopener,noreferrer");
});

contributeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = requireGoogleLogin();
  if (!user) return;

  const clickedButton = event.submitter;
  const data = new FormData(contributeForm);
  const name = data.get("name").trim() || user.name;
  const title = data.get("title").trim();
  const brand = data.get("brand").trim();
  const model = data.get("model").trim();
  const type = data.get("type");
  const file = data.get("file");
  let link = data.get("link").trim();
  const description = data.get("description").trim();
  const subject = `Contribuição para balanceiros: ${type}`;
  const hasFile = file instanceof File && file.size > 0;

  if (!link && !hasFile) {
    alert("Informe um link ou selecione um arquivo de vídeo/PDF.");
    return;
  }

  const previewType = hasFile && file.type.startsWith("video/") ? "video" : "";
  let volatile = false;

  if (hasFile && !link) {
    if (file.size > 2500000) {
      alert("Esse arquivo é grande para salvar direto no navegador. Envie um link do YouTube, Drive ou PDF online.");
      return;
    }

    try {
      link = await readFileAsDataUrl(file);
    } catch {
      alert("Não consegui ler esse arquivo. Tente enviar um link do material.");
      return;
    }
  }

  const text = `Olá, meu nome é ${name}. Quero contribuir com um material para balanceiros.\nTítulo: ${title}\nMarca: ${brand}\nModelo: ${model}\nTipo: ${type}\nLink: ${volatile ? "Arquivo enviado diretamente pela página" : link}\nDescrição: ${description}`;

  runtimeMaterials.unshift({ name, title, brand, model, type, link, description, previewType, volatile, savedAt: new Date().toISOString() });
  saveMaterials(runtimeMaterials.filter((item) => !item.volatile).slice(0, 24));
  renderMaterialModels();
  renderCommunityFeed();
  renderManualTabs();
  contributeForm.reset();

  if (clickedButton.dataset.channel === "publish") {
    if (type === "Vídeo") {
      showBalancePanel("videos");
    } else {
      selectedManualBrand = "Comunidade";
      if (manualModelSearch) manualModelSearch.value = "";
      renderManualTabs();
      showBalancePanel("manuais");
    }
    document.querySelector(".balance-nav-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!balancePanels.length) window.location.href = type === "Vídeo" ? "balanceiros.html#videos" : "balanceiros.html#manuais";
    return;
  }

  window.open(`https://wa.me/${ownerPhone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

quickSearchForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = materialSearch?.value || "";

  // Espera o acervo (manuais enviados por vocês/comunidade) terminar de
  // carregar do servidor antes de decidir que não existe manual salvo —
  // sem isso, uma busca rápida logo ao abrir a página podia cair na busca
  // externa mesmo quando o manual já estava cadastrado no site.
  await publicContentPromise;
  renderManualTabs();

  const match = findLocalManualMatch(query);
  if (match) {
    selectedManualBrand = match.brand || "all";
    if (manualModelSearch) manualModelSearch.value = "";
    renderManualTabs();
    showBalancePanel("manuais");
    match.link.click();
    return;
  }

  openResultsPage(query);
});

balanceTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    showBalancePanel(tab.dataset.balanceTab);
  });
});

window.addEventListener("hashchange", () => {
  showBalancePanel((window.location.hash || "#busca-rapida").slice(1), false);
});

document.querySelectorAll(".quick-actions a[href^='#'], .footer a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const panelId = link.getAttribute("href").slice(1);
    if (![...balancePanels].some((panel) => panel.dataset.balancePanel === panelId)) return;

    event.preventDefault();
    showBalancePanel(panelId);
    document.querySelector(".balance-nav-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

headerLoginBadge?.addEventListener("click", () => {
  if (!confirm("Deseja sair da conta conectada?")) return;
  localStorage.removeItem(authStorageKey);
  renderAuthState();
});

questionForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = requireGoogleLogin();
  if (!user) return;

  const data = new FormData(questionForm);
  const brand = data.get("brand").trim();
  const model = data.get("model").trim();
  const question = data.get("question").trim();

  runtimeQuestions.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    author: user.name,
    email: user.email,
    brand,
    model,
    question,
    answers: [],
  });
  saveQuestions(runtimeQuestions.slice(0, 40));
  renderQuestions();
  questionForm.reset();
  questionList?.scrollIntoView({ behavior: "smooth", block: "start" });
});

questionList?.addEventListener("submit", (event) => {
  const answerForm = event.target.closest("[data-answer-form]");
  if (!answerForm) return;

  event.preventDefault();
  const user = requireGoogleLogin();
  if (!user) return;

  const question = runtimeQuestions.find((item) => item.id === answerForm.dataset.questionId);
  const answer = new FormData(answerForm).get("answer").trim();
  if (!question || !answer) return;

  question.answers = Array.isArray(question.answers) ? question.answers : [];
  question.answers.push({
    author: user.name,
    email: user.email,
    text: answer,
  });
  saveQuestions(runtimeQuestions.slice(0, 40));
  renderQuestions();
});

resultsForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(resultsForm);
  const query = String(data.get("q") || "").trim();
  if (query) window.location.href = `resultados.html?q=${encodeURIComponent(query)}`;
});

materialSearch?.addEventListener("input", renderCommunityFeed);
materialModel?.addEventListener("change", renderCommunityFeed);
materialType?.addEventListener("change", renderCommunityFeed);

materialTabs.forEach((button) => {
  button.addEventListener("click", () => {
    selectedMaterialBrand = button.dataset.materialTab;
    materialTabs.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderMaterialModels();
    renderCommunityFeed();
  });
});

manualTabs.forEach((button) => {
  button.addEventListener("click", () => {
    selectedManualBrand = button.dataset.manualTab;
    if (manualModelSearch) manualModelSearch.value = "";
    renderManualTabs();
  });
});

manualModelSearch?.addEventListener("input", renderManualTabs);

manualBrandList?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  event.preventDefault();
  event.stopPropagation();
  openPdfViewer(link.dataset.pdfName, link.dataset.pdfLink || link.getAttribute("href"));
}, true);

pdfClose?.addEventListener("click", () => {
  if (pdfFrame) pdfFrame.src = "";
  if (pdfBlocked) pdfBlocked.hidden = true;
  if (pdfViewer) pdfViewer.hidden = true;
});

productsList?.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-product-detail]");
  const card = event.target.closest("[data-product-card]");
  const buyLink = event.target.closest("a");
  if (buyLink) return;

  const index = detailButton?.dataset.productDetail || card?.dataset.productCard;
  if (index === undefined) return;
  openProductDetail(index);
});

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-product-close]");
  if (!closeButton) return;

  const modal = document.querySelector("[data-product-modal]");
  const media = modal?.querySelectorAll("iframe, video") || [];
  media.forEach((item) => {
    if (item.tagName === "IFRAME") item.src = item.src;
    if (item.tagName === "VIDEO") item.pause();
  });
  if (modal) modal.hidden = true;
});

renderMaterialModels();
renderManualTabs();
renderCommunityFeed();
renderResultsPage();
renderAuthState();
renderQuestions();
showBalancePanel((window.location.hash || "#busca-rapida").slice(1), false);
const publicContentPromise = renderPublicContent();
setupAdmin();
setupMobileMenu();
