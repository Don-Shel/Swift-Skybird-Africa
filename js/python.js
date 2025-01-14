// At the top of your script tag
const API_URL = 'http://your-backend-url.com/api';

// Replace the displayProducts function
async function displayProducts() {
    try {
        const response = await axios.get(`${API_URL}/products`);
        const products = response.data;
        // Rest of the function remains the same
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Replace the addToCart function
async function addToCart(productId) {
    try {
        const response = await axios.post(`${API_URL}/cart/add`, { productId });
        if (response.data.success) {
            // Update local cart state
            updateCartIcon();
            displayProducts();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Replace the checkout function
async function checkout() {
    try {
        const response = await axios.post(`${API_URL}/checkout`, { cart });
        if (response.data.success) {
            alert('Checkout successful!');
            cart.length = 0;
            updateCartIcon();
            closeCart();
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
}


// another python code
async function fetchProducts(category = 'All') {
    try {
        const response = await axios.get(`${API_URL}/products`, { params: { category } });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function filterProducts(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filteredProducts = await fetchProducts(category);
    displayProducts(filteredProducts);
}

function displayProducts(productList) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    productList.forEach(product => {
        // Create and append product cards as before
    });
}

// Initial load
(async function() {
    const initialProducts = await fetchProducts();
    displayProducts(initialProducts);
})();