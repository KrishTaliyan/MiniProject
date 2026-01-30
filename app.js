let allProducts = [];

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch(() => {
    document.getElementById("products").innerHTML =
      "<h2>Failed to load products</h2>";
  });

function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h3>No products found</h3>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">₹ ${product.price}</p>
    `;

    container.appendChild(card);
  });
}


function getSearchHistory() {
  return JSON.parse(localStorage.getItem("searchHistory")) || [];
}

function saveSearch(term) {
  let history = getSearchHistory();

  if (!history.some(item => item.term === term)) {
    history.push({
      term: term,
      time: new Date().toLocaleString()
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

function searchProduct() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  if (!value) return;

  saveSearch(value);

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  displayProducts(filtered);
  showSuggestions(value);
}

function showSuggestions(input) {
  const suggestionsBox = document.getElementById("suggestions");
  const history = getSearchHistory();

  suggestionsBox.innerHTML = "";
  if (!input) return;

  const filtered = history.filter(item =>
    item.term.toLowerCase().includes(input)
  );

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.innerText = item.term;

    div.onclick = () => {
      document.getElementById("searchInput").value = item.term;
      searchProduct();
      suggestionsBox.innerHTML = "";
    };

    suggestionsBox.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  showSuggestions(e.target.value.toLowerCase());
});

document.getElementById("historyBtn").addEventListener("click", () => {
  const historyBox = document.getElementById("historyBox");
  const history = getSearchHistory();

  historyBox.innerHTML = "";

  if (history.length === 0) {
    historyBox.innerHTML = "<p>No search history</p>";
    return;
  }

  history.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<b>${item.term}</b> <small>(${item.time})</small>`;
    historyBox.appendChild(div);
  });
});

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("searchHistory");
  document.getElementById("historyBox").innerHTML = "<p>History cleared</p>";
  document.getElementById("suggestions").innerHTML = "";
});


document.getElementById("bagbutton").addEventListener("click", () => {
  alert("Item added to bag");
});

document.getElementById("wishlistbutton").addEventListener("click", () => {
  alert("Item added to wishlist");
});
