let cart = [];
const products = [
    { id: 1, name: "Product 1", price: 19.99, image: "https://picsum.photos/id/1/100" },
    { id: 2, name: "Product 2", price: 29.99, image: "https://picsum.photos/id/2/100" },
    { id: 3, name: "Product 3", price: 39.99, image: "https://picsum.photos/id/3/100" }
];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartSummaryElement = document.getElementById('cartSummary');
    const cartTotalElement = document.getElementById('cartTotal');

    cartItemsElement.innerHTML = '';
    cartSummaryElement.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsElement.innerHTML += `
            <div class="product-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="product-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;

        cartSummaryElement.innerHTML += `
            <p>${item.name} x ${item.quantity}: $${itemTotal.toFixed(2)}</p>
        `;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

// Initialize cart with some items
addToCart(1);
addToCart(2);
addToCart(3);

// Checkout modal functionality
const modal = document.getElementById("checkoutModal");
const btn = document.getElementById("checkoutBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form submission
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (this.checkValidity()) {
        document.getElementById('spinnerOverlay').style.display = 'flex';

        setTimeout(() => {
            document.getElementById('spinnerOverlay').style.display = 'none';
            showThankYouPopup();
            cart = [];
            updateCart();
            modal.style.display = "none";
        }, 2000);
    } else {
        this.reportValidity();
    }
});

function showThankYouPopup() {
    document.getElementById('thankYouPopup').style.display = 'flex';
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function closeThankYouPopup() {
    document.getElementById('thankYouPopup').style.display = 'none';
}

// Toggle between login and register
document.getElementById('registerLink').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('authForm');
    const heading = document.querySelector('.auth-section h2');
    const linkText = document.querySelector('.auth-section p');

    if (heading.textContent === 'Login or Register') {
        heading.textContent = 'Register';
        form.innerHTML += '<input type="password" placeholder="Confirm Password" required>';
        form.querySelector('button').textContent = 'Register';
        linkText.innerHTML = 'Already have an account? <a href="#" id="loginLink">Login here</a>';
    } else {
        heading.textContent = 'Login or Register';
        form.innerHTML = `
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Login</button>
        `;
        linkText.innerHTML = 'Don\'t have an account? <a href="#" id="registerLink">Register here</a>';
    }
});