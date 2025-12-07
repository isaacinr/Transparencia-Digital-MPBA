// publicacoes_carousel.js
document.addEventListener("DOMContentLoaded", () => {
  const track        = document.getElementById("footer-track");
  const dotsContainer = document.getElementById("footer-dots");

  const publicacoes = [
    { img: "/TransparenciaDigitalMPBA/img/photos/card-vida-longa.jpg",                     tag: "19 e 20 OUT", color: "#6a1b9a", titulo: "IV WORKSHOP DO PROJETO VIDA LONGA",               btn: "Saiba mais",      url: "https://www.mpba.mp.br/projeto/projeto-vida-longa" },
    { img: "/TransparenciaDigitalMPBA/img/photos/serviço voluntario.jpg",           tag: "14 OUT",      color: "#c62828", titulo: "Instituto de Ação Voluntária",                btn: "Saiba mais",      url: "https://ceaf.mpba.mp.br/servico-voluntario/" },
    { img: "/TransparenciaDigitalMPBA/img/photos/plano geral de atuacao 2025.png",       tag: null,          color: "#d32f2f", titulo: "PLANO GERAL DE ATUAÇÃO 2025",                        btn: "CLIQUE E CONFIRA",url: "https://infomail.mpba.mp.br/wp-content/uploads/2025/01/PGA-2025.pdf" },
    { img: "/TransparenciaDigitalMPBA/img/photos/cartilha.png",                    tag: null,          color: "#f9a825", titulo: "GUIA: Retificação do Registro Civil",                btn: "CLIQUE E BAIXE",  url: "https://www.mpba.mp.br/sites/default/files/institucional/2024/mpdiverso_cartliha_a5.pdf" },
    { img: "/TransparenciaDigitalMPBA/img/photos/corrupcao.jpg",         tag: "EM BREVE",    color: "#1976d2", titulo: "Seminário Nacional de Combate à Corrupção",          btn: "Em breve",        url: "#" }
  ];

  let currentIndex = 0;
  let cardWidth = 410; // valor inicial só pra não dar NaN

  // Renderiza os cards (todo o card vira link)
  function renderCards() {
    track.innerHTML = publicacoes.map(item => {
      const isSoon = item.tag?.includes("BREVE");
      const hasLink = item.url && item.url !== "#";

      return `
        <a href="${item.url}" 
           class="footer-card ${hasLink ? '' : 'no-link'}"
           ${hasLink ? 'target="_blank" rel="noopener"' : ''}>
          <img src="${item.img}" alt="${item.titulo}" loading="lazy">
          ${item.tag ? `
            <span class="footer-card-tag footer-card-tag--${isSoon ? 'soon' : 'data'}"
                  style="background:${isSoon ? '#1976d2' : item.color}">
              ${item.tag}
            </span>` : ''}
          <div class="footer-card-content">
            <h3 class="footer-card-titulo">${item.titulo}</h3>
            <span class="footer-card-btn" style="background:${item.color}">${item.btn}</span>
          </div>
        </a>`;
    }).join("");
  }

  // Dots
  function renderDots() {
    dotsContainer.innerHTML = publicacoes
      .map((_, i) => `<span class="${i === currentIndex ? 'active' : ''}"></span>`)
      .join("");
  }

  // Atualiza posição do carrossel
  function updateCarousel() {
    const firstCard = track.querySelector(".footer-card");
    if (!firstCard) return;

    const gap = parseInt(getComputedStyle(track).gap) || 30;
    cardWidth = firstCard.offsetWidth + gap;

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    renderDots();
  }

  // Próximo slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % publicacoes.length;
    updateCarousel();
  }

  // Clique nos dots
  dotsContainer.addEventListener("click", e => {
    if (e.target.tagName === "SPAN") {
      currentIndex = Array.from(dotsContainer.children).indexOf(e.target);
      updateCarousel();
    }
  });

  // Auto-play + pause no hover
  let autoplay = setInterval(nextSlide, 7000);
  track.addEventListener("mouseenter", () => clearInterval(autoplay));
  track.addEventListener("mouseleave", () => autoplay = setInterval(nextSlide, 7000));

  // Resize com debounce
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateCarousel, 150);
  });

  // Inicia tudo
  renderCards();
  renderDots();
  updateCarousel();
});