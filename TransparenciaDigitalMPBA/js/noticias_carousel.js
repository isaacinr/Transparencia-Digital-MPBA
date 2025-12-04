// js/mpba-carrossel.js → IGUAL AO DA IMAGEM, AUTOPLAY 5s, SEM ERROS
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("slide-container");
    const dotsContainer = document.getElementById("slide-dots");

    // EDITE AQUI SUAS NOTÍCIAS (como na imagem)
    const noticias = [
        {
            titulo: "Plano de Ação Direito de Defesa das Crianças e Adolescentes no Ambiente Digital",
            link: "https://mpba.mp.br/noticia/direitos-digitais",
            img: "img/noticias/direitos-criancas.jpeg", // imagem da criança com tablet
            tag: "Plano de Ação Direito de"
        },
        {
            titulo: "PGJ Itinerante: MPBA realiza 1,6 mil atendimentos em Irecê",
            link: "https://mpba.mp.br/noticia/irece",
            img: "img/noticias/irece.jpeg",
            tag: "Projeto Itinerante"
        },
        
        {
            titulo: "Lançamento do App Cegonha: direitos na palma da mão",
            link: "https://mpba.mp.br/app-cegonha",
            img: "img/noticias/cegonha.jpg",
            tag: "Aplicativo Cegonha"
        }
        // Adicione mais: copie o bloco acima
    ];

    let currentIndex = 0;
    let intervalId;

    // Gera slides
    noticias.forEach((noticia, index) => {
        const slide = document.createElement("div");
        slide.className = "slide-item";
        slide.innerHTML = `
            <img src="${noticia.img}" alt="${noticia.titulo}" onerror="this.src='img/noticia-padrao.jpg'">
            <div class="slide-content">
                <span class="slide-tag">${noticia.tag}...</span>
                <h4 class="slide-titulo">${noticia.titulo}</h4>
                <a href="${noticia.link}" target="_blank" class="slide-btn">Confira aqui o Banco de Boas Práticas</a>
            </div>
        `;
        container.appendChild(slide);

        // Pontinho
        const dot = document.createElement("span");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const totalSlides = noticias.length;
    if (totalSlides === 0) return;

    function goToSlide(index) {
        currentIndex = index;
        container.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
        resetInterval();
    }

    function updateDots() {
        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    function startInterval() {
        intervalId = setInterval(nextSlide, 4000); // 5s como no oficial
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // Pausa no hover (como no oficial)
    container.addEventListener("mouseenter", () => clearInterval(intervalId));
    container.addEventListener("mouseleave", startInterval);

    // Inicia
    updateDots();
    startInterval();
});