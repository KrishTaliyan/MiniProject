const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const box = document.getElementById("productDetails");

fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(product => {
    box.innerHTML = `
      <img src="${product.thumbnail}">
      <div>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <h3>₹ ${product.price}</h3>
        <p><b>Brand:</b> ${product.brand}</p>
        <p><b>Category:</b> ${product.category}</p>
        <p><b>Rating:</b>  ${product.rating}</p>
      </div>
    `;

    saveViewHistory(product);
    
    });


function saveViewHistory(product) {
  let history = JSON.parse(localStorage.getItem("viewHistory")) || [];

  if (!history.some(item => item.id === product.id)) {
    history.push({
      id: product.id,
      title: product.title,
      price: product.price
    });

    if(history.length > 5){
        history.shift();
    }

    localStorage.setItem("viewHistory", JSON.stringify(history));
  }
}
