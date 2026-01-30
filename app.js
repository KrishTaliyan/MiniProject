let allProducts = [];

/* FETCH PRODUCTS */
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
  });

function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

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

/* SEARCH HISTORY */
function getSearchHistory() {
  return JSON.parse(localStorage.getItem("searchHistory")) || [];
}

function saveSearch(term) {
  let history = getSearchHistory();
  if (!history.some(item => item.term === term)) {
    history.push({ term, time: new Date().toLocaleString() });
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

function searchProduct() {
  const value = searchInput.value.toLowerCase();
  if (!value) return;

  saveSearch(value);
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  displayProducts(filtered);
  showSuggestions(value);
}

function showSuggestions(input) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";
  getSearchHistory()
    .filter(item => item.term.includes(input))
    .forEach(item => {
      const div = document.createElement("div");
      div.innerText = item.term;
      div.onclick = () => {
        searchInput.value = item.term;
        searchProduct();
        box.innerHTML = "";
      };
      box.appendChild(div);
    });
}

document.getElementById("historyBtn").onclick = () => {
  historyBox.innerHTML = "";
  getSearchHistory().forEach(item => {
    historyBox.innerHTML += `<div>${item.term} (${item.time})</div>`;
  });
};

document.getElementById("clearHistoryBtn").onclick = () => {
  localStorage.removeItem("searchHistory");
  historyBox.innerHTML = "History cleared";
};

function goToViewHistory() {
  window.location.href = "view-history.html";
}

bagbutton.onclick = () => alert("Item added to bag");
wishlistbutton.onclick = () => alert("Item added to wishlist");
