const WHATSAPP_PHONE = "231779116693";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle Handler
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navList = document.getElementById("nav-list");

    if (menuBtn && navList) {
        menuBtn.addEventListener("click", () => {
            navList.classList.toggle("nav-active");
        });
    }

    // 2. Fetch and Render Products on Products Page
    const productGrid = document.getElementById("product-grid");
    if (productGrid) {
        fetchProducts();
    }

    // 3. Attach WhatsApp Form Submission Handler
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", sendToWhatsApp);
    }
});

async function fetchProducts() {
    const productGrid = document.getElementById("product-grid");

    try {
        const response = await fetch("products.json");
        const products = await response.json();

        if (!products || products.length === 0) {
            productGrid.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1;">No products available currently.</p>`;
            return;
        }

        productGrid.innerHTML = products.map(product => {
            const encodedText = encodeURIComponent(`Hello, I am interested in buying ${product.title} from Konneh Electronics.`);
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

            return `
                <div class="card">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="card-body">
                        <div>
                            <h3 class="card-title">${product.title}</h3>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp" style="padding: 0.5rem 1rem; font-size: 0.85rem; text-align: center; margin-top: 1rem;">
                            Order via WhatsApp
                        </a>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error("Error loading products:", error);
        productGrid.innerHTML = `<p style="color: var(--primary-red); text-align: center; grid-column: 1 / -1;">Failed to load items. Please check products.json syntax.</p>`;
    }
}

function sendToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const fullText = `Hello Konneh Electronics,%0A%0AMy name is *${encodeURIComponent(name)}*.%0AInquiry: *${encodeURIComponent(service)}*%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${fullText}`, '_blank');
}