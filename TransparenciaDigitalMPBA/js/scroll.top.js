
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".back-top");

    window.addEventListener("scroll", () => {
        btn.classList.toggle("show", window.scrollY > 600);
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});