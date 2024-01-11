const productContainer = document.getElementById('container-product');
const dataUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
let options = {
    method: "GET"
}
// Fetch product data
async function fetchData() {
    try {
        const response = await fetch(dataUrl, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Show product cards based on the selected category
function showCategory(category) {
    fetchData().then(data => {
        const categoryData = data.categories.find(cat => cat.category_name === category);

        if (categoryData) {
            const products = categoryData.category_products;
            renderProductCards(products);
        }

    });
}

// Render product cards dynamically
function renderProductCards(products) {
    productContainer.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
     <div class="image-container">
        <img src="${product.image}" alt="${product.title}">
        <div class="text-overlay">
            ${product.badge_text}
        </div>
    </div>
    <div class="bg">
    <div class="bg2>
    <div class="title">${product.title}</div>
    <ul><li class="vendor">${product.vendor}</li></ul>
    </div>
    <div class="bg2">
    <div class="price">${product.price}</div>
    <div class="compare-price">${product.compare_at_price}</div>
    <div class="discount">${calculateDiscount(product.price, product.compare_at_price)}% Off</div>
    </div>
    <button class="add-to-cart-btn">Add to Cart</button>
    
    </div>
  `;

    return card;
}