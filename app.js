let allProducts = [];
let filteredProducts = []; 
let currentPage = 1;
const itemsPerPage = 8;


fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    filteredProducts = allProducts;
    renderPage();
  });

function renderPage() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageProducts = filteredProducts.slice(start, end);
  displayProducts(pageProducts);

  updatePagination();
}

function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h3>No products found</h3>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}">
      <h3>${product.title}</h3>
      <p class="price">₹ ${product.price}</p>
    `;

    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    container.appendChild(card);
  });
}

function updatePagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${totalPages}`;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

document.getElementById("prevBtn").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
};

document.getElementById("nextBtn").onclick = () => {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
};


function searchProduct() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  currentPage = 1; 
  renderPage();
}

function goToViewHistory() {
  window.location.href = "view-history.html";
}

bagbutton.onclick = () => alert("Item added to bag");
wishlistbutton.onclick = () => alert("Item added to wishlist");
