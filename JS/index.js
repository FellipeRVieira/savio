 // navbar shadow on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  });

  // hero "layer counter" ambient animation
  const totalLayers = 312;
  let layer = 0;
  const layerLabel = document.getElementById('layer-count');
  const layerFill = document.getElementById('layer-fill');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced){
    setInterval(() => {
      layer = (layer + 7) % (totalLayers + 1);
      layerLabel.textContent = 'camada ' + String(layer).padStart(3,'0') + '/' + totalLayers;
      layerFill.style.width = (layer / totalLayers * 100) + '%';
    }, 220);
  } else {
    layerLabel.textContent = 'camada 312/312';
    layerFill.style.width = '100%';
  }

  // carousel controls
  const carousel = document.getElementById('carousel');
  const cardWidth = 260;
  document.getElementById('nextBtn').addEventListener('click', () => {
    carousel.scrollBy({ left: cardWidth, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    carousel.scrollBy({ left: -cardWidth, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));