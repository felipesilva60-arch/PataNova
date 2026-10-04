const cart = [];

const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");


// ===============================
// FORMATAÇÃO DE PREÇO
// ===============================

const money = value => {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

};


// ===============================
// CARRINHO
// ===============================

document
    .getElementById("openCart")
    .addEventListener("click", openCart);


document
    .getElementById("closeCart")
    .addEventListener("click", closeCart);


cartOverlay.addEventListener("click", closeCart);


function openCart() {

    cartElement.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCart() {

    cartElement.classList.remove("active");

    cartOverlay.classList.remove("active");

}


// ===============================
// ADICIONAR PRODUTO
// ===============================

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener("click", () => {

            const product = {

                id: button.dataset.id,

                name: button.dataset.name,

                price: Number(button.dataset.price),

                image: button.dataset.image,

                quantity: 1

            };


            const existing = cart.find(
                item => item.id === product.id
            );


            if (existing) {

                existing.quantity++;

            } else {

                cart.push(product);

            }


            updateCart();

            showToast();

        });

    });


// ===============================
// ATUALIZAR CARRINHO
// ===============================

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

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>


                <strong>
                    ${money(product.price)}
                </strong>


                <div class="cart-controls">

                    <button
                        onclick="changeQuantity('${product.id}', -1)">
                        −
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="changeQuantity('${product.id}', 1)">
                        +
                    </button>


                    <button
                        class="remove-item"
                        onclick="removeItem('${product.id}')">

                        ✕

                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(item);

    });


    const total = cart.reduce(

        (sum, product) =>

            sum +
            product.price *
            product.quantity,

        0

    );


    const totalItems = cart.reduce(

        (sum, product) =>

            sum +
            product.quantity,

        0

    );


    cartTotal.textContent = money(total);

    cartCount.textContent = totalItems;

}


// ===============================
// QUANTIDADE
// ===============================

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


// ===============================
// REMOVER PRODUTO
// ===============================

function removeItem(id) {

    const index = cart.findIndex(
        item => item.id === id
    );


    if (index !== -1) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ===============================
// AVISO DE PRODUTO ADICIONADO
// ===============================

function showToast() {

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


// ===============================
// FILTROS
// ===============================

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        filterProducts(filter);

    });

});


document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const filter =
                card.dataset.filter;


            document
                .getElementById("productos")
                .scrollIntoView({
                    behavior: "smooth"
                });


            setTimeout(() => {

                filterButtons.forEach(btn => {

                    btn.classList.remove("active");

                });


                const matchingButton =
                    document.querySelector(
                        `.filter-btn[data-filter="${filter}"]`
                    );


                if (matchingButton) {

                    matchingButton.classList.add("active");

                }


                filterProducts(filter);

            }, 400);

        });

    });


function filterProducts(filter) {

    document
        .querySelectorAll(".product-card")
        .forEach(product => {

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


// ===============================
// PESQUISA
// ===============================

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


    filterButtons.forEach(btn => {

        btn.classList.remove("active");

    });


    document
        .querySelector(
            '.filter-btn[data-filter="all"]'
        )
        .classList.add("active");

});


searchInput.addEventListener("input", () => {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    document
        .querySelectorAll(".product-card")
        .forEach(product => {

            const name =
                product
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            const description =
                product
                    .querySelector("p")
                    .textContent
                    .toLowerCase();


            if (
                name.includes(searchTerm) ||
                description.includes(searchTerm)
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

});


// ===============================
// FAQ
// ===============================

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


// ===============================
// NEWSLETTER
// ===============================

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();


        const email =
            document
                .getElementById("newsletterEmail")
                .value;


        alert(
            `¡Gracias! ${email} ha sido registrado en PataNova 🐾`
        );


        event.target.reset();

    });


// ===============================
// CHECKOUT
// ===============================

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

            "El carrito funciona correctamente. " +

            "Antes de vender, debes conectar " +

            "un proveedor de pagos y definir el envío."

        );

    });


// ===============================
// INICIAR
// ===============================

updateCart();
