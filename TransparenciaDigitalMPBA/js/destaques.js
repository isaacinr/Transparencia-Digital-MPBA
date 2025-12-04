
document.addEventListener("DOMContentLoaded", () => {

    //acordeao
    document.querySelectorAll(".accordion-header").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains("active");

            document.querySelectorAll(".accordion-item").forEach(i => {
                i.classList.remove("active");
                i.querySelector(".accordion-header").classList.remove("active");
            });

            if (!isActive) {
                item.classList.add("active");
                btn.classList.add("active");
            }
        });
    });

    // ====== CARROSSEL COM AUTOPLAY INFINITO ======
    const area = document.getElementById("carousel-area");
    const pontos = document.getElementById("carousel-pontos");
    const carousel = document.querySelector(".carousel-simples");
    let atual = 0;
    let totalSlides = 0;
    let autoplay;

    // Carrega as notícias
    fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://mpba.mp.br/feed/"))
        .then(r => r.json())
        .then(d => {
            const itens = new DOMParser().parseFromString(d.contents, "text/xml").querySelectorAll("item");
            let slidesHTML = "";

            itens.forEach((item, i) => {
                if (i >= 8) return; // até 8 notícias 
                const titulo = item.querySelector("title")?.textContent || "Notícia";
                const link = item.querySelector("link")?.textContent || "#";
                const desc = item.querySelector("description")?.textContent || "";
                const img = desc.match(/src="([^"]*\.(jpe?g|png|gif))/i)?.[1] || "img/noticia-padrao.jpg";

                slidesHTML += `
                    <div class="carousel-slide">
                        <img src="${img}" alt="${titulo}" onerror="this.src='img/noticia-padrao.jpg'">
                        <div>
                            <span class="tag">Notícia</span>
                            <h4>${titulo.substring(0, 85)}${titulo.length > 85 ? '...' : ''}</h4>
                            <a href="${link}" target="_blank" class="link-azul">Leia mais</a>
                        </div>
                    </div>`;

                // Cria pontinho
                const ponto = document.createElement("span");
                ponto.onclick = () => irPara(i);
                pontos.appendChild(ponto);
            });

            area.innerHTML = slidesHTML;
            totalSlides = pontos.children.length;

            if (totalSlides > 0) {
                atualizarPontos();
                iniciarAutoplay();
            }
        })
        .catch(() => {
            area.innerHTML = "<p style='text-align:center;color:#c00;padding:30px;'>Erro ao carregar notícias</p>";
        });

    // Funções do carrossel
    const irPara = (i) => {
        atual = i;
        area.style.transform = `translateX(-${i * 100}%)`;
        atualizarPontos();
    };

    const proximo = () => {
        atual = (atual + 1) % totalSlides;
        irPara(atual);
    };

    const anterior = () => {
        atual = (atual - 1 + totalSlides) % totalSlides;
        irPara(atual);
    };

    const atualizarPontos = () => {
        Array.from(pontos.children).forEach((p, i) => {
            p.classList.toggle("active", i === atual);
        });
    };

    const iniciarAutoplay = () => {
        autoplay = setInterval(proximo, 6000); // troca a cada 6 segundos
    };

    const pararAutoplay = () => clearInterval(autoplay);
    const continuarAutoplay = () => { pararAutoplay(); iniciarAutoplay(); };

    // Controles manuais
    document.querySelector(".next").onclick = () => { proximo(); continuarAutoplay(); };
    document.querySelector(".prev").onclick = () => { anterior(); continuarAutoplay(); };

    // Pausa quando o mouse está em cima
    carousel.addEventListener("mouseenter", pararAutoplay);
    carousel.addEventListener("mouseleave", continuarAutoplay);

    // Toque no celular (swipe)
    let touchStartX = 0;
    carousel.addEventListener("touchstart", e => touchStartX = e.touches[0].clientX);
    carousel.addEventListener("touchend", e => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) proximo();
        if (touchEndX - touchStartX > 50) anterior();
        continuarAutoplay();
    });
});