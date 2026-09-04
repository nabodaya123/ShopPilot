/* =========================================
   SHOPPILOT AI
   AGENTIC COMMERCE ASSISTANT
   JavaScript
   ========================================= */


/* =========================================
   PRODUCT DATABASE
   ========================================= */

const products = [

    {
        id: 1,
        name: "AeroBook 14",
        price: 42999,
        icon: "💻",
        tag: "Best Value",
        desc: "14-inch laptop for coding, study and daily work.",
        keys: [
            "laptop",
            "college",
            "coding",
            "study"
        ]
    },

    {
        id: 2,
        name: "SoundCore Buds",
        price: 2499,
        icon: "🎧",
        tag: "Top Rated",
        desc: "Wireless earbuds with low-latency audio.",
        keys: [
            "audio",
            "gaming",
            "college"
        ]
    },

    {
        id: 3,
        name: "FlexDesk Lamp",
        price: 1299,
        icon: "💡",
        tag: "Productivity",
        desc: "Adjustable LED desk lamp with USB charging.",
        keys: [
            "college",
            "study",
            "desk"
        ]
    },

    {
        id: 4,
        name: "KeyPro Mechanical",
        price: 3499,
        icon: "⌨️",
        tag: "Creator Pick",
        desc: "Compact mechanical keyboard for long sessions.",
        keys: [
            "coding",
            "gaming",
            "college"
        ]
    },

    {
        id: 5,
        name: "Ergo Mouse",
        price: 1499,
        icon: "🖱️",
        tag: "Comfort",
        desc: "Ergonomic wireless mouse for everyday use.",
        keys: [
            "coding",
            "college",
            "desk"
        ]
    },

    {
        id: 6,
        name: "PowerPack 20K",
        price: 1799,
        icon: "🔋",
        tag: "Essential",
        desc: "20,000mAh fast-charge power bank.",
        keys: [
            "college",
            "travel",
            "essential"
        ]
    },

    {
        id: 7,
        name: "Focus Stand",
        price: 899,
        icon: "📱",
        tag: "Smart Buy",
        desc: "Adjustable phone and tablet stand.",
        keys: [
            "study",
            "desk",
            "college"
        ]
    },

    {
        id: 8,
        name: "GamePad X",
        price: 2299,
        icon: "🎮",
        tag: "Gaming",
        desc: "Wireless controller for casual gaming.",
        keys: [
            "gaming"
        ]
    }

];


/* =========================================
   SHOPPING CART
   ========================================= */

// Get saved cart from browser storage

let cart = JSON.parse(
    localStorage.getItem("shopPilotCart") || "[]"
);


/* =========================================
   DOM ELEMENTS
   ========================================= */

const productsElement =
    document.getElementById("products");

const queryInput =
    document.getElementById("query");

const searchButton =
    document.getElementById("searchBtn");

const cartButton =
    document.getElementById("cartBtn");

const cartCount =
    document.getElementById("cartCount");

const drawer =
    document.getElementById("drawer");

const closeCartButton =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkout");

const toastElement =
    document.getElementById("toast");

const resultText =
    document.getElementById("resultText");


/* =========================================
   FORMAT CURRENCY
   ========================================= */

function formatMoney(amount) {

    return "₹" +
        amount.toLocaleString("en-IN");

}


/* =========================================
   DISPLAY PRODUCTS
   ========================================= */

function renderProducts(productList = products) {

    productsElement.innerHTML = "";


    productList.forEach(product => {

        const productCard =
            document.createElement("article");

        productCard.className = "product";


        productCard.innerHTML = `

            <div class="pic">
                ${product.icon}
            </div>

            <div class="product-body">

                <span class="tag">
                    ${product.tag}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="desc">
                    ${product.desc}
                </div>

                <div class="price">
                    ${formatMoney(product.price)}
                </div>

                <button
                    class="add"
                    onclick="addToCart(${product.id})"
                >
                    Add to AI Cart
                </button>

            </div>

        `;


        productsElement.appendChild(
            productCard
        );

    });

}


/* =========================================
   SAVE CART
   ========================================= */

function saveCart() {

    localStorage.setItem(
        "shopPilotCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   ADD PRODUCT TO CART
   ========================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    // Check if product already exists

    const alreadyExists =
        cart.some(
            item => item.id === productId
        );


    if (alreadyExists) {

        showToast(
            `${product.name} is already in your cart`
        );

        return;

    }


    cart.push(product);

    saveCart();

    updateCart();


    showToast(
        `${product.name} added to your AI cart`
    );

}


/* =========================================
   REMOVE PRODUCT
   ========================================= */

function removeItem(productId) {

    cart =
        cart.filter(
            product => product.id !== productId
        );


    saveCart();

    updateCart();


    showToast(
        "Product removed from cart"
    );

}


/* =========================================
   UPDATE CART
   ========================================= */

function updateCart() {

    // Update cart counter

    cartCount.textContent =
        cart.length;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p style="
                color:#93a4b8;
                padding:20px 0;
            ">
                Your AI cart is empty.
            </p>

        `;

    }

    else {

        cartItems.innerHTML =
            cart.map(product => `

                <div class="cart-item">

                    <div>

                        <strong>
                            ${product.icon}
                            ${product.name}
                        </strong>

                        <p>
                            ${formatMoney(product.price)}
                        </p>

                    </div>

                    <button
                        class="remove"
                        onclick="removeItem(${product.id})"
                    >
                        Remove
                    </button>

                </div>

            `).join("");

    }


    // Calculate total

    const total =
        cart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    cartTotal.textContent =
        formatMoney(total);

}


/* =========================================
   OPEN CART
   ========================================= */

function openCart() {

    drawer.classList.add("open");

    overlay.classList.add("show");

}


/* =========================================
   CLOSE CART
   ========================================= */

function closeCart() {

    drawer.classList.remove("open");

    overlay.classList.remove("show");

}


/* =========================================
   AI SHOPPING AGENT
   ========================================= */

function runAgent(userQuery) {

    const query =
        userQuery.toLowerCase().trim();


    /*
        =====================================
        STEP 1 — UNDERSTAND USER INTENT
        =====================================
    */


    let budget = Infinity;


    /*
        Find budget from phrases such as:

        under ₹15000
        below 15000
        budget 10000
        within 20000
    */

    const budgetMatch =
        query.match(
            /(?:under|below|within|budget)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/
        );


    if (budgetMatch) {

        budget =
            Number(
                budgetMatch[1]
                    .replaceAll(",", "")
            );

    }


    /*
        Detect shopping category
    */

    let intentKeywords = [];


    if (
        query.includes("gaming") ||
        query.includes("gamer") ||
        query.includes("game")
    ) {

        intentKeywords = [
            "gaming"
        ];

    }

    else if (
        query.includes("coding") ||
        query.includes("programming") ||
        query.includes("developer")
    ) {

        intentKeywords = [
            "coding"
        ];

    }

    else if (
        query.includes("travel") ||
        query.includes("travelling")
    ) {

        intentKeywords = [
            "travel"
        ];

    }

    else if (
        query.includes("study") ||
        query.includes("student") ||
        query.includes("college")
    ) {

        intentKeywords = [
            "college",
            "study"
        ];

    }

    else {

        // Default shopping intent

        intentKeywords = [
            "college",
            "study"
        ];

    }


    /*
        =====================================
        STEP 2 — REASON ABOUT PRODUCTS
        =====================================
    */


    let rankedProducts =
        products

            // First apply budget filter

            .filter(product =>
                product.price <= budget
            )

            // Then calculate relevance

            .map(product => {

                const score =
                    product.keys.filter(
                        key =>
                            intentKeywords.includes(key)
                    ).length;


                return {
                    ...product,
                    score
                };

            })

            // Sort by relevance

            .sort(
                (a, b) => {

                    if (b.score !== a.score) {

                        return b.score - a.score;

                    }

                    return a.price - b.price;

                }
            );


    /*
        =====================================
        STEP 3 — DISPLAY RESULTS
        =====================================
    */


    if (rankedProducts.length === 0) {

        rankedProducts = products;

        resultText.textContent =
            "Showing all available products";

    }

    else {

        resultText.textContent =
            `Agent found ${rankedProducts.length} relevant options`;

    }


    renderProducts(
        rankedProducts
    );


    /*
        Scroll to products
    */

    document
        .getElementById("discover")
        .scrollIntoView({
            behavior: "smooth"
        });


    /*
        Show success notification
    */

    showToast(
        "AI agent analyzed your shopping goal"
    );

}


/* =========================================
   SEARCH BUTTON
   ========================================= */

searchButton.addEventListener(
    "click",
    () => {

        const query =
            queryInput.value.trim();


        if (!query) {

            runAgent(
                "college setup"
            );

            return;

        }


        runAgent(query);

    }
);


/* =========================================
   ENTER KEY SEARCH
   ========================================= */

queryInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchButton.click();

        }

    }
);


/* =========================================
   QUICK SUGGESTION BUTTONS
   ========================================= */

const chips =
    document.querySelectorAll(
        ".chips button"
    );


chips.forEach(chip => {

    chip.addEventListener(
        "click",
        () => {

            queryInput.value =
                chip.textContent.trim();


            runAgent(
                chip.textContent.trim()
            );

        }
    );

});


/* =========================================
   CART EVENTS
   ========================================= */

cartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);


overlay.addEventListener(
    "click",
    closeCart
);


/* =========================================
   CHECKOUT
   ========================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Add products to your cart first"
            );

            return;

        }


        showToast(
            "Demo checkout ready — connect a payment gateway for production"
        );

    }
);


/* =========================================
   TOAST NOTIFICATION
   ========================================= */

function showToast(message) {

    toastElement.textContent =
        message;


    toastElement.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toastElement.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================
   INITIALIZE APPLICATION
   ========================================= */

// Display products

renderProducts();


// Restore cart

updateCart();
