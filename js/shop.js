 // JavaScript code
 const products = [
    { id: 1, name: "Classic T-Shirt", price: 19.99, category: "clothing", image: "https://picsum.photos/id/1/300/200", description: "A comfortable and stylish classic t-shirt for everyday wear." },
    { id: 2, name: "Wireless Earbuds", price: 89.99, category: "electronics", image: "https://picsum.photos/id/2/300/200", description: "High-quality wireless earbuds with noise-cancellation technology." },
    { id: 3, name: "Leather Wallet", price: 39.99, category: "accessories", image: "https://picsum.photos/id/3/300/200", description: "A sleek and durable leather wallet with multiple card slots." },
    { id: 4, name: "Smart Watch", price: 199.99, category: "electronics", image: "https://picsum.photos/id/4/300/200", description: "A feature-packed smartwatch with health tracking and notifications." },
    { id: 5, name: "Denim Jeans", price: 59.99, category: "clothing", image: "https://picsum.photos/id/5/300/200", description: "Classic denim jeans with a comfortable fit and timeless style." },
    { id: 6, name: "Sunglasses", price: 29.99, category: "accessories", image: "https://picsum.photos/id/6/300/200", description: "Stylish sunglasses with UV protection for a cool look." }
];

let cart = [];
let currentProduct = null;

function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productCard.addEventListener('click', () => showProductDetails(product)); 
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartBadge();
        updateCartSummary();
    }
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

function updateCartSummary() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function toggleCart() {
    const cartSummary = document.querySelector('.cart-summary');
    cartSummary.style.display = cartSummary.style.display === 'none' ? 'block' : 'none';
}

function checkout() {
    alert('Proceeding to checkout. This feature is not implemented in this demo.');
}

function showProductDetails(product) {
    currentProduct = product;
    const modal = document.getElementById('productModal');
    const modalImage = modal.querySelector('.modal-product-image');
    const modalName = modal.querySelector('.modal-product-name');
    const modalPrice = modal.querySelector('.modal-product-price');
    const modalDescription = modal.querySelector('.modal-product-description');

    modalImage.src = product.image;
    modalName.textContent = product.name;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalDescription.textContent = product.description;

    modal.style.display = 'block';
}

// Close the modal when clicking on <span> (x)
document.querySelector('.close').onclick = function() {
    document.getElementById('productModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Initialize the page
renderProducts();


//****spiner loading section */

 // Updated form submission handler with loading spinner
 document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (this.checkValidity()) {
        // Show loading spinner
        document.getElementById('spinnerOverlay').style.display = 'flex';

        // Simulate server request with setTimeout
        setTimeout(() => {
            // Collect form data
            const formData = new FormData(event.target);
            const orderData = Object.fromEntries(formData.entries());

            // Add selected payment method
            const selectedPaymentMethod = document.querySelector('.payment-method.selected');
            orderData.paymentMethod = selectedPaymentMethod ? selectedPaymentMethod.querySelector('p').textContent : '';

            // Add cart items and total
            orderData.items = cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
            orderData.total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

            // In a real application, you would send this data to a server
            console.log('Order placed:', orderData);

            // Hide loading spinner
            document.getElementById('spinnerOverlay').style.display = 'none';

            // Show confirmation and reset cart
            //alert('Thank you for your purchase! Order details have been logged to the console.');
            cart = [];
            updateCartBadge();
            updateCartSummary();
            closeCheckoutModal();
        }, 2000); // Simulating a 2-second server request
    } else {
        // If the form is invalid, trigger the browser's default validation UI
        this.reportValidity();
    }
});

// Close the checkout modal when clicking outside of it
window.onclick = function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    if (event.target == checkoutModal) {
        closeCheckoutModal();
    }
}


//*******Check out Section */
function checkout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'block';
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'none';
}

function selectPaymentMethod(method) {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(pm => pm.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    const orderData = Object.fromEntries(formData.entries());

    // Add selected payment method
    const selectedPaymentMethod = document.querySelector('.payment-method.selected');
    orderData.paymentMethod = selectedPaymentMethod ? selectedPaymentMethod.querySelector('p').textContent : '';

    // Add cart items and total
    orderData.items = cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));
    orderData.total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    // In a real application, you would send this data to a server
    console.log('Order placed:', orderData);

    // Show confirmation and reset cart
    //alert('Thank you for your purchase! Order details have been logged to the console.');
    cart = [];
    updateCartBadge();
    updateCartSummary();
    closeCheckoutModal();
});

// Close the checkout modal when clicking outside of it
window.onclick = function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    if (event.target == checkoutModal) {
        closeCheckoutModal();
    }
}

 // Previous JavaScript code remains unchanged

        // New JavaScript for form validation
        const emailInput = document.getElementById('email');
        const zipCodeInput = document.getElementById('zipCode');
        const emailError = document.getElementById('emailError');
        const zipCodeError = document.getElementById('zipCodeError');

        // Email validation
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.setCustomValidity('');
                emailError.style.display = 'none';
            } else {
                this.setCustomValidity('Invalid email address');
                emailError.style.display = 'block';
            }
        });

        // Zip code validation
        zipCodeInput.addEventListener('input', function() {
            const zipRegex = /^\d{5}(-\d{4})?$/;  // US zip code format
            if (zipRegex.test(this.value)) {
                this.setCustomValidity('');
                zipCodeError.style.display = 'none';
            } else {
                this.setCustomValidity('Invalid zip code');
                zipCodeError.style.display = 'block';
            }
        });

        // Updated form submission handler
        document.getElementById('checkoutForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Check if the form is valid
            if (this.checkValidity()) {
                // Collect form data
                const formData = new FormData(event.target);
                const orderData = Object.fromEntries(formData.entries());

                // Add selected payment method
                const selectedPaymentMethod = document.querySelector('.payment-method.selected');
                orderData.paymentMethod = selectedPaymentMethod ? selectedPaymentMethod.querySelector('p').textContent : '';

                // Add cart items and total
                orderData.items = cart.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }));
                orderData.total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

                // In a real application, you would send this data to a server
                console.log('Order placed:', orderData);

                // Show confirmation and reset cart
                //alert('Thank you for your purchase! Order details have been logged to the console.');
                cart = [];
                updateCartBadge();
                updateCartSummary();
                closeCheckoutModal();
            } else {
                // If the form is invalid, trigger the browser's default validation UI
                this.reportValidity();
            }
        });

        // Close the modal when clicking on <span> (x)
        document.querySelector('.close').onclick = function() {
        document.getElementById('productModal').style.display = 'none';
        }

        // Close the checkout modal when clicking outside of it
        window.onclick = function(event) {
            const checkoutModal = document.getElementById('checkoutModal');
            if (event.target == checkoutModal) {
                closeCheckoutModal();
            }
        }


//*****Thank You section */
// Updated form submission handler with thank you popup
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (this.checkValidity()) {
        // Show loading spinner
        document.getElementById('spinnerOverlay').style.display = 'flex';

        // Simulate server request with setTimeout
        setTimeout(() => {
            // Collect form data
            const formData = new FormData(event.target);
            const orderData = Object.fromEntries(formData.entries());

            // Add selected payment method
            const selectedPaymentMethod = document.querySelector('.payment-method.selected');
            orderData.paymentMethod = selectedPaymentMethod ? selectedPaymentMethod.querySelector('p').textContent : '';

            // Add cart items and total
            orderData.items = cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
            orderData.total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

            // In a real application, you would send this data to a server
            console.log('Order placed:', orderData);

            // Hide loading spinner
            document.getElementById('spinnerOverlay').style.display = 'none';

            // Show thank you popup
            showThankYouPopup();

            // Reset cart
            cart = [];
            updateCartBadge();
            updateCartSummary();
            closeCheckoutModal();
        }, 2000); // Simulating a 2-second server request
    } else {
        // If the form is invalid, trigger the browser's default validation UI
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

// Close the checkout modal when clicking outside of it
window.onclick = function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    const thankYouPopup = document.getElementById('thankYouPopup');
    if (event.target == checkoutModal) {
        closeCheckoutModal();
    }
    if (event.target == thankYouPopup) {
        closeThankYouPopup();
    }
}

 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});