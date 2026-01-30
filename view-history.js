const box = document.getElementById("viewHistoryBox");
const history = JSON.parse(localStorage.getItem("viewHistory")) || [];

if (history.length === 0) {
  box.innerHTML = "No viewed products yet";
}

history.forEach(item => {
  const div = document.createElement("div");
  div.className = "history-card";
  div.innerHTML = `
    <img src="${item.thumbnail}" height="120">
    <h4>${item.title}</h4>
    <p>₹ ${item.price}</p>
  `;
  div.onclick = () => {
    window.location.href = `product.html?id=${item.id}`;
  };
  box.appendChild(div);
});
