const cart = [];
const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

/* ================= CART ================= */

document.getElementById("openCart").addEventListener("click", openCart);

document.getElementById("closeCart").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

function openCart() {

cartElement.classList.add("active");
cartOverlay.classList.add("active");

}

function closeCart() {

cartElement.classList.remove("active");
cartOverlay.classList.remove("active");

}

/* ================= ADD PRODUCTS ================= */

document.querySelectorAll(".add-cart").forEach(button => {

button.addEventListener("click", () => {

    const product = {

        id: button.dataset.id,

        name: button.dataset.name,

        price: parseFloat(button.dataset.price),

        image: button.dataset.image,

        quantity: 1

    };


    const existingProduct = cart.find(
        item => item.id === product.id
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push(product);

    }


    updateCart();

    showToast();

});

});

/* ================= UPDATE CART ================= */

function updateCart() {

cartItems.innerHTML = "";


if (cart.length === 0) {

    cartItems.innerHTML = `

        <div class="empty-cart">

            🐾

            <p>
                Tu carrito está vacío.
            </p>

        </div>

    `;

}


cart.forEach(product => {

    const item = document.createElement("div");

    item.classList.add("cart-item");


    item.innerHTML = `

        <div class="cart-item-image">

            ${product.image}

        </div>


        <div class="cart-item-info">

            <h4>
                ${product.name}
            </h4>

            <strong>
                €${product.price.toFixed(2)}
            </strong>


            <div class="cart-controls">

                <button onclick="changeQuantity('${product.id}', -1)">
                    −
                </button>


                <span>
                    ${product.quantity}
                </span>


                <button onclick="changeQuantity('${product.id}', 1)">
                    +
                </button>


                <button
                    class="remove-item"
                    onclick="removeItem('${product.id}')"
                >
                    ✕
                </button>

            </div>

        </div>

    `;


    cartItems.appendChild(item);

});


const total = cart.reduce(

    (sum, product) => {

        return sum + product.price * product.quantity;

    },

    0

);


const totalItems = cart.reduce(

    (sum, product) => {

        return sum + product.quantity;

    },

    0

);


cartTotal.textContent = `€${total.toFixed(2)}`;

cartCount.textContent = totalItems;

}

/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

const product = cart.find(
    item => item.id === id
);


if (!product) return;


product.quantity += change;


if (product.quantity <= 0) {

    removeItem(id);

} else {

    updateCart();

}

}

/* ================= REMOVE PRODUCT ================= */

function removeItem(id) {

const index = cart.findIndex(
    item => item.id === id
);


if (index !== -1) {

    cart.splice(index, 1);

}


updateCart();

}

/* ================= TOAST ================= */

function showToast() {

toast.classList.add("show");


setTimeout(() => {

    toast.classList.remove("show");

}, 2500);

}

/* ================= FILTER PRODUCTS ================= */

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

    const filter = button.dataset.filter;


    filterButtons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    filterProducts(filter);

});

});

document.querySelectorAll(".category-card").forEach(card => {

card.addEventListener("click", () => {

    const filter = card.dataset.filter;


    document
        .getElementById("productos")
        .scrollIntoView({
            behavior: "smooth"
        });


    setTimeout(() => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        document
            .querySelector(
                `.filter-btn[data-filter="${filter}"]`
            )
            .classList
            .add("active");


        filterProducts(filter);

    }, 500);

});

});

function filterProducts(filter) {

const products =
    document.querySelectorAll(".product-card");


products.forEach(product => {

    if (

        filter === "all" ||

        product.dataset.category === filter

    ) {

        product.style.display = "block";

    } else {

        product.style.display = "none";

    }

});

}

/* ================= SEARCH ================= */

const searchBtn =
document.getElementById("searchBtn");

const searchBox =
document.getElementById("searchBox");

const closeSearch =
document.getElementById("closeSearch");

const searchInput =
document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

searchBox.classList.add("active");

searchInput.focus();

});

closeSearch.addEventListener("click", () => {

searchBox.classList.remove("active");

searchInput.value = "";

filterProducts("all");

});

searchInput.addEventListener("input", () => {

const searchTerm =
    searchInput.value.toLowerCase();


document
    .querySelectorAll(".product-card")
    .forEach(product => {

        const name =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();


        if (

            name.includes(searchTerm)

        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});

/* ================= FAQ ================= */

document
.querySelectorAll(".faq-question")
.forEach(question => {

    question.addEventListener("click", () => {

        const item =
            question.parentElement;


        document
            .querySelectorAll(".faq-item")
            .forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });


        item.classList.toggle("active");

    });

});

/* ================= NEWSLETTER ================= */

document
.getElementById("newsletterForm")
.addEventListener("submit", event => {

    event.preventDefault();


    const email =
        document
        .getElementById("newsletterEmail")
        .value;


    alert(
        `¡Gracias! ${email} ha sido registrado para recibir novedades de PataNova 🐾`
    );


    event.target.reset();

});

/* ================= CHECKOUT ================= */

document
.getElementById("checkoutBtn")
.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Tu carrito está vacío 🐾"
        );

        return;

    }


    alert(
        "El checkout está preparado. El siguiente paso será conectar un proveedor de pago autorizado."
    );

});

/* ================= START ================= */

updateCart();
