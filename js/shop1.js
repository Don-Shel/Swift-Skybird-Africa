const priceRange = document.getElementById('random');
const priceValue = document.getElementById('priceValue');
const filterButton = document.getElementById('filterButton');

function renderProducts(filteredProducts = products) {
    productContainer.innerHTML = filteredProducts.map(createProductCard).join('');
    animateProducts();
}

function animateProducts() {
    gsap.from('.product-card', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

function updatePriceValue() {
    priceValue.textContent = priceRange.value;
}

function filterProducts() {
    const maxPrice = parseFloat(priceRange.value);
    const filteredProducts = products.filter(product => product.price <= maxPrice);
    renderProducts(filteredProducts);
}

viewToggle.addEventListener('click', toggleView);
priceRange.addEventListener('input', updatePriceValue);
filterButton.addEventListener('click', filterProducts);

renderProducts();