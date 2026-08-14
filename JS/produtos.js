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
    description:"Suporte produzido em impressão 3D, ideal para organizar seu controle de videogame na mesa ou estante. Acabamento fosco e encaixe firme." 
},

  { 
    id:2, 
    name:"Vaso geométrico", 
    price:54.90, 
    category:"Decoração", 
    icon:"vaso", 
    description:"Vaso com design geométrico moderno, impresso em PETG translúcido. Perfeito para plantas pequenas ou suculentas." 
},

  { 
    id:3, 
    name:"Luminária modular", 
    price:89.90, 
    category:"Decoração", 
    icon:"luminaria", 
    description:"Luminária de mesa com difusor impresso em 3D, montagem modular e luz aconchegante para o ambiente." 
},

  { 
    id:4, 
    name:"Suporte para celular", 
    price:32.90, 
    category:"Acessórios", 
    icon:"celular", 
    description:"Suporte compacto para celular, ideal para mesa de trabalho ou cabeceira. Material rígido e resistente." 
},

  { 
    id:5, 
    name:"Miniatura personalizada", 
    price:64.90, 
    category:"Decoração", 
    icon:"miniatura", 
    description:"Miniatura impressa em resina com alto nível de detalhe. Personalizamos conforme sua referência." 
},

  { 
    id:6, 
    name:"Organizador de mesa", 
    price:47.90, 
    category:"Organizadores", 
    icon:"organizador", 
    description:"Organizador modular para canetas, clipes e acessórios de escritório. Encaixa em qualquer mesa." 
},

  { 
    id:7, 
    name:"Porta-chaves de parede", 
    price:29.90, 
    category:"Utilidades", 
    icon:"porta_chaves", 
    description:"Porta-chaves compacto para fixar na parede, com acabamento em camadas finas para maior precisão." 
},

  { 
    id:8, 
    name:"Quadro decorativo 3D", 
    price:74.90, 
    category:"Decoração", 
    icon:"quadro", 
    description:"Quadro com relevo impresso em 3D, textura única que faz o design ganhar profundidade na parede." 
},

  { 
    id:9, 
    name:"Porta-copos em par", 
    price:24.90, 
    category:"Utilidades", 
    icon:"porta_copo", 
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

function cardHTML(p){
  return `
    <div class="card" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${p.name}">
      <div class="card-img">${icons[p.icon]}</div>
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
  galleryMain.innerHTML = icons[p.icon];
  thumbs.innerHTML = [0,1,2].map(i => `<div class="thumb ${i===0?'active':''}" data-i="${i}">${icons[p.icon]}</div>`).join('');
  thumbs.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', () => {
      thumbs.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      galleryMain.style.opacity = 0;
      setTimeout(() => { galleryMain.innerHTML = icons[p.icon]; galleryMain.style.opacity = 1; }, 120);
    });
  });

  const message = `Olá! Tenho interesse no produto ${p.name}`;
  document.getElementById('modalWhats').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0,3);
  document.getElementById('relatedGrid').innerHTML = related.map(r => `
    <div class="related-card" data-id="${r.id}">
      <div class="card-img">${icons[r.icon]}</div>
      <div class="card-name">${r.name}</div>
      <div class="card-price">R$ ${r.price.toFixed(2).replace('.',',')}</div>
    </div>`).join('');
  document.getElementById('relatedGrid').querySelectorAll('.related-card').forEach(c => {
    c.addEventListener('click', () => openProduct(Number(c.dataset.id)));
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState(null, '', `#produto/${p.id}`);
}

function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  history.pushState(null, '', location.pathname);
}

document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

/* abre produto direto se a URL já vier com #produto/id */
function checkHash(){
  const match = location.hash.match(/#produto\/(\d+)/);
  if (match) openProduct(Number(match[1]));
}
window.addEventListener('hashchange', checkHash);

/* =========================================================
   INIT
========================================================= */
renderGrid();
checkHash();