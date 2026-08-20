/* =========================================================
   CONFIG — troque aqui quando tiver o número real
========================================================= */
const whatsappNumber = "5500000000000";

/* =========================================================
   ÍCONES (placeholders — trocar por fotos reais dos produtos)
========================================================= */
const icons = {
  controle: '<svg viewBox="0 0 100 100" fill="none"><rect x="20" y="30" width="60" height="45" rx="4" stroke="currentColor" stroke-width="2"/><path d="M30 30v-8h40v8" stroke="currentColor" stroke-width="2"/></svg>',
  vaso: '<svg viewBox="0 0 100 100" fill="none"><path d="M50 20c14 0 22 10 22 24 0 12-10 16-10 28H38c0-12-10-16-10-28 0-14 8-24 22-24Z" stroke="currentColor" stroke-width="2"/></svg>',
  luminaria: '<svg viewBox="0 0 100 100" fill="none"><path d="M50 18v14M35 55l15-23 15 23z" stroke="currentColor" stroke-width="2"/><rect x="30" y="55" width="40" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M42 65v12h16V65" stroke="currentColor" stroke-width="2"/></svg>',
  celular: '<svg viewBox="0 0 100 100" fill="none"><rect x="26" y="24" width="48" height="52" rx="8" stroke="currentColor" stroke-width="2"/><path d="M38 65h24" stroke="currentColor" stroke-width="2"/></svg>',
  miniatura: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="42" r="16" stroke="currentColor" stroke-width="2"/><path d="M30 78c2-14 10-20 20-20s18 6 20 20" stroke="currentColor" stroke-width="2"/></svg>',
  organizador: '<svg viewBox="0 0 100 100" fill="none"><rect x="22" y="30" width="56" height="40" rx="4" stroke="currentColor" stroke-width="2"/><path d="M22 46h56M40 30v40M60 30v40" stroke="currentColor" stroke-width="1.4"/></svg>',
  porta_chaves: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="30" r="10" stroke="currentColor" stroke-width="2"/><path d="M50 40v34M38 60h24M40 74h20" stroke="currentColor" stroke-width="2"/></svg>',
  quadro: '<svg viewBox="0 0 100 100" fill="none"><rect x="24" y="22" width="52" height="56" rx="3" stroke="currentColor" stroke-width="2"/><path d="M24 62 42 46l12 12 22-20" stroke="currentColor" stroke-width="2"/></svg>',
  porta_copo: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="26" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="10" stroke="currentColor" stroke-width="1.4"/></svg>'
};

/* =========================================================
   DADOS FICTÍCIOS DOS PRODUTOS
   (mesma estrutura pode alimentar um backend real depois)
========================================================= */
const products = [
  {
    id:1,
    name:"Suporte para controle",
    price:39.90,
    category:"Acessórios",
    icon:"controle",
    images: [],
    description:"Suporte produzido em impressão 3D, ideal para organizar seu controle de videogame na mesa ou estante. Acabamento fosco e encaixe firme."
  },
  {
    id:2,
    name:"Vaso geométrico",
    price:54.90,
    category:"Decoração",
    icon:"vaso",
    images: [],
    description:"Vaso com design geométrico moderno, impresso em PETG translúcido. Perfeito para plantas pequenas ou suculentas."
  },
  {
    id:3,
    name:"Luminária modular",
    price:89.90,
    category:"Decoração",
    icon:"luminaria",
    images: [],
    description:"Luminária de mesa com difusor impresso em 3D, montagem modular e luz aconchegante para o ambiente."
  },
  {
    id:4,
    name:"Suporte para celular",
    price:32.90,
    category:"Acessórios",
    icon:"celular",
    images: [],
    description:"Suporte compacto para celular, ideal para mesa de trabalho ou cabeceira. Material rígido e resistente."
  },
  {
    id:5,
    name:"Miniatura personalizada",
    price:64.90,
    category:"Decoração",
    icon:"miniatura",
    images: [],
    description:"Miniatura impressa em resina com alto nível de detalhe. Personalizamos conforme sua referência."
  },
  {
    id:6,
    name:"Organizador de mesa",
    price:47.90,
    category:"Organizadores",
    icon:"organizador",
    images: [],
    description:"Organizador modular para canetas, clipes e acessórios de escritório. Encaixa em qualquer mesa."
  },
  {
    id:7,
    name:"Porta-chaves de parede",
    price:29.90,
    category:"Utilidades",
    icon:"porta_chaves",
    images: [],
    description:"Porta-chaves compacto para fixar na parede, com acabamento em camadas finas para maior precisão."
  },
  {
    id:8,
    name:"Quadro decorativo 3D",
    price:74.90,
    category:"Decoração",
    icon:"quadro",
    images: [],
    description:"Quadro com relevo impresso em 3D, textura única que faz o design ganhar profundidade na parede."
  },
  {
    id:9,
    name:"Porta-copos em par",
    price:24.90,
    category:"Utilidades",
    icon:"porta_copo",
    images: [],
    description:"Par de porta-copos com base emborrachável, resistentes a líquidos e fáceis de limpar."
  }
];

const categories = ["Todos", "Decoração", "Utilidades", "Acessórios", "Organizadores"];

/* =========================================================
   ESTADO
========================================================= */
let activeCategory = "Todos";
let searchTerm = "";

/* =========================================================
   RENDER — FILTROS
========================================================= */
const filtersEl = document.getElementById('filters');
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.className = 'filter-btn' + (cat === activeCategory ? ' active' : '');
  btn.textContent = cat;
  btn.setAttribute('role','tab');
  btn.addEventListener('click', () => {
    activeCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid();
  });
  filtersEl.appendChild(btn);
});

/* =========================================================
   RENDER — GRID
========================================================= */
function getFiltered(){
  return products.filter(p => {
    const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function getProductImages(p){
  return Array.isArray(p.images) ? p.images.filter(Boolean) : [];
}

function productVisual(p, className = ''){
  const images = getProductImages(p);
  if (images.length) {
    return `<img class="${className}" src="${images[0]}" alt="${p.name}" loading="lazy" draggable="false">`;
  }
  return icons[p.icon] || '';
}

function cardHTML(p){
  return `
    <div class="card" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${p.name}">
      <div class="card-img">${productVisual(p)}</div>
      <span class="card-cat">${p.category}</span>
      <div class="card-name">${p.name}</div>
      <div class="card-price">R$ ${p.price.toFixed(2).replace('.',',')}</div>
      <div class="card-cta">Ver produto</div>
    </div>`;
}

function renderGrid(){
  const grid = document.getElementById('grid');
  const empty = document.getElementById('emptyState');
  const meta = document.getElementById('resultsMeta');
  const list = getFiltered();

  meta.textContent = list.length + (list.length === 1 ? ' produto encontrado' : ' produtos encontrados');
  grid.innerHTML = list.map(cardHTML).join('');
  empty.classList.toggle('show', list.length === 0);
  grid.style.display = list.length === 0 ? 'none' : 'grid';

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openProduct(Number(card.dataset.id)));
    card.addEventListener('keypress', e => { if (e.key === 'Enter') openProduct(Number(card.dataset.id)); });
  });
}

/* =========================================================
   BUSCA
========================================================= */
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value.trim();
  searchClear.classList.toggle('show', searchTerm.length > 0);
  renderGrid();
});
searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  searchClear.classList.remove('show');
  renderGrid();
  searchInput.focus();
});

/* =========================================================
   MODAL DE PRODUTO
========================================================= */
const overlay = document.getElementById('modalOverlay');

function openProduct(id){
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalCat').textContent = p.category;
  document.getElementById('modalProductName').textContent = p.name;
  document.getElementById('modalPrice').textContent = 'R$ ' + p.price.toFixed(2).replace('.',',');
  document.getElementById('modalDesc').textContent = p.description;

  const galleryMain = document.getElementById('galleryMain');
  const thumbs = document.getElementById('galleryThumbs');
  const images = getProductImages(p);
  const galleryItems = images.length ? images : [null, null, null];

  function renderGalleryImage(src, index = 0){
    const visual = src
      ? `<img src="${src}" alt="${p.name} - imagem ${index + 1}" draggable="false">`
      : `${icons[p.icon] || ''}`;

    galleryMain.innerHTML = `
      ${visual}
      <div class="zoom-lens" id="zoomLens" aria-hidden="true"></div>
      <span class="zoom-hint" id="zoomHint">Passe o mouse para ampliar</span>
    `;

    setupImageZoom();
  }

  renderGalleryImage(galleryItems[0], 0);

  thumbs.innerHTML = galleryItems.map((src, i) => `
    <button class="thumb ${i === 0 ? 'active' : ''}" type="button" data-i="${i}" aria-label="Visualizar imagem ${i + 1}">
      ${src ? `<img src="${src}" alt="${p.name} - miniatura ${i + 1}" loading="lazy" draggable="false">` : (icons[p.icon] || '')}
    </button>
  `).join('');

  thumbs.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', () => {
      const index = Number(t.dataset.i);
      thumbs.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      galleryMain.classList.remove('is-zooming');
      renderGalleryImage(galleryItems[index], index);
    });
  });

  const mobileNote = document.getElementById('mobileZoomNote');
  if (mobileNote) mobileNote.hidden = !images.length;

  const message = `Olá! Tenho interesse no produto ${p.name}`;
  document.getElementById('modalWhats').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0,3);
  document.getElementById('relatedGrid').innerHTML = related.map(r => `
    <div class="related-card" data-id="${r.id}" tabindex="0" role="button" aria-label="Ver ${r.name}">
      <div class="card-img">${productVisual(r)}</div>
      <div class="card-name">${r.name}</div>
      <div class="card-price">R$ ${r.price.toFixed(2).replace('.',',')}</div>
    </div>`).join('');

  document.getElementById('relatedGrid').querySelectorAll('.related-card').forEach(c => {
    c.addEventListener('click', () => openProduct(Number(c.dataset.id)));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProduct(Number(c.dataset.id));
      }
    });
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (location.hash !== `#produto/${p.id}`) {
    history.pushState({ produto: p.id }, '', `#produto/${p.id}`);
  }
}

/* =========================================================
   ZOOM — estilo marketplace
   Desktop: lente + painel ampliado.
   Touch: toque para abrir uma visualização ampliada.
========================================================= */
function setupImageZoom(){
  const galleryMain = document.getElementById('galleryMain');
  const zoomLens = document.getElementById('zoomLens');
  const zoomPreview = document.getElementById('zoomPreview');
  const zoomHint = document.getElementById('zoomHint');
  const mobileNote = document.getElementById('mobileZoomNote');
  const image = galleryMain?.querySelector('img');

  if (!galleryMain || !zoomLens || !zoomPreview || !image) {
    if (zoomPreview) zoomPreview.innerHTML = '';
    return;
  }

  const zoom = 2.6;
  let touchZoomed = false;

  zoomPreview.innerHTML = `<img src="${image.src}" alt="" aria-hidden="true" draggable="false">`;
  const previewImage = zoomPreview.querySelector('img');

  const updatePreview = (clientX, clientY) => {
    const rect = galleryMain.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const lensW = zoomLens.offsetWidth;
    const lensH = zoomLens.offsetHeight;
    let lensX = x - lensW / 2;
    let lensY = y - lensH / 2;

    lensX = Math.max(0, Math.min(lensX, rect.width - lensW));
    lensY = Math.max(0, Math.min(lensY, rect.height - lensH));

    zoomLens.style.left = `${lensX}px`;
    zoomLens.style.top = `${lensY}px`;

    const px = (lensX + lensW / 2) / rect.width * 100;
    const py = (lensY + lensH / 2) / rect.height * 100;
    previewImage.style.transformOrigin = `${px}% ${py}%`;
    previewImage.style.transform = `scale(${zoom})`;
  };

  const showZoom = (clientX, clientY) => {
    galleryMain.classList.add('is-zooming');
    if (zoomHint) zoomHint.style.opacity = '0';
    updatePreview(clientX, clientY);
  };

  const hideZoom = () => {
    if (!touchZoomed) {
      galleryMain.classList.remove('is-zooming');
      previewImage.style.transform = 'scale(1)';
      previewImage.style.transformOrigin = '50% 50%';
    }
  };

  galleryMain.onpointermove = event => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      showZoom(event.clientX, event.clientY);
    }
  };

  galleryMain.onpointerenter = event => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      showZoom(event.clientX, event.clientY);
    }
  };

  galleryMain.onpointerleave = () => {
    if (!touchZoomed) hideZoom();
  };

  galleryMain.onclick = event => {
    if (event.pointerType === 'touch') return;
  };

  galleryMain.ontouchstart = event => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      const touch = event.touches[0];
      touchZoomed = !touchZoomed;
      if (touchZoomed) {
        showZoom(touch.clientX, touch.clientY);
        if (mobileNote) mobileNote.textContent = 'Toque novamente para fechar o zoom';
      } else {
        galleryMain.classList.remove('is-zooming');
        if (mobileNote) mobileNote.textContent = 'Toque na imagem para ampliar';
      }
    }
  };

  galleryMain.ontouchmove = event => {
    if (touchZoomed) {
      const touch = event.touches[0];
      updatePreview(touch.clientX, touch.clientY);
      event.preventDefault();
    }
  };

  galleryMain.ontouchend = () => {};

  image.addEventListener('load', () => {
    previewImage.src = image.currentSrc || image.src;
  }, { once: true });
}

function closeModalUI(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(){
  closeModalUI();
  // se a URL ainda tem o hash do produto, "consome" essa entrada do
  // histórico voltando, em vez de empilhar uma entrada nova — assim o
  // botão de voltar do navegador leva para a página anterior de verdade,
  // e não reabre o produto
  if (location.hash.match(/#produto\//)) {
    history.back();
  }
}

document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

/* mantém o modal sincronizado com a URL — tanto ao entrar direto com
   #produto/id quanto ao navegar com os botões voltar/avançar do navegador */
function checkHash(){
  const match = location.hash.match(/#produto\/(\d+)/);
  if (match) {
    openProduct(Number(match[1]));
  } else {
    closeModalUI();
  }
}
window.addEventListener('hashchange', checkHash);

/* =========================================================
   INIT
========================================================= */
renderGrid();
checkHash();