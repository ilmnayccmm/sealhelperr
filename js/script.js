const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const body = document.body;

// ===== BURGER MENU =====
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    body.classList.toggle("no-scroll");
});

// закриття по кліку на меню
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        body.classList.remove("no-scroll");
    });
});


// ===== CTA BUTTON =====
const ctaBtn = document.getElementById("ctaBtn");

if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
        ctaBtn.classList.add("loading");
        ctaBtn.textContent = "Обробка...";
        ctaBtn.disabled = true;

        setTimeout(() => {
            ctaBtn.classList.remove("loading");
            ctaBtn.textContent = "Відправити";
            ctaBtn.disabled = false;
        }, 2000);
    });
}


// ===== HEART LIKE =====
document.querySelectorAll(".heart").forEach(heart => {
    heart.addEventListener("click", () => {
        heart.classList.toggle("active");
        heart.textContent = heart.classList.contains("active") ? "❤" : "♡";
    });
});


// ===== FILTER =====
const filterBtns = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        cards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || filter === category) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});