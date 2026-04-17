const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const body = document.body;

// BURGER
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    body.classList.toggle("no-scroll");
});

// CTA
const ctaBtn = document.getElementById("ctaBtn");

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

// FETCH
async function loadData() {
    const container = document.getElementById("items-grid");
    const loader = document.getElementById("loader");

    loader.style.display = "block";

    try {
        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Error");
        }

        const data = await response.json();

        renderCards(data);

    } catch (error) {
        container.innerHTML = `
            <p style="color:red; text-align:center;">
                Вибачте, дані тимчасово недоступні.
            </p>
        `;
    } finally {
        loader.style.display = "none";
    }
}

// RENDER
function renderCards(data) {
    const container = document.getElementById("items-grid");

    container.innerHTML = "";

    data.forEach(item => {
        const card = `
            <article class="card" data-category="${item.category}">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>

                <button ${!item.inStock ? "disabled" : ""}>
                    ${item.inStock ? "Допомогти" : "Немає в наявності"}
                </button>

                <span class="heart">♡</span>
            </article>
        `;

        container.insertAdjacentHTML("beforeend", card);
    });

    initHearts();
    initFilters();
}

// HEART
function initHearts() {
    document.querySelectorAll(".heart").forEach(heart => {
        heart.addEventListener("click", () => {
            heart.classList.toggle("active");
            heart.textContent = heart.classList.contains("active") ? "❤" : "♡";
        });
    });
}

// FILTER
function initFilters() {
    const buttons = document.querySelectorAll(".filters button");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll(".card");

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
}

// START
loadData();