const ApiUrl = "https://striveschool-api.herokuapp.com/api/product/";

class Product {
  constructor(_name, _description, _brand, _price, _imageUrl) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }
}

const form = document.getElementById("form-product");

const url = location.search;
const allP = new URLSearchParams(url);
const id = allP.get("ProdId");
const resetBtn = document.getElementById("reset-btn");
const inviaBtn = document.getElementById("invia-btn");
if (id) {
  resetBtn.style.display = "none";
  inviaBtn.textContent = "MODIFICA";
}
if (id) {
  fetch(ApiUrl + "/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjU1NGY0YmQ0NzAwMTU4NWIxZTEiLCJpYXQiOjE3NjI1MDYwNjgsImV4cCI6MTc2MzcxNTY2OH0.bYGaU7MPXft1CZdq27sG1vLiqMgjLgQND7zM3zYnC4Q",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("price").value = product.price;
      document.getElementById("imageUrl").value = product.imageUrl;
    })
    .catch((err) => {
      console.log("Errore:", err);
      const errorC = document.getElementById("error");
      errorC.innerHTML =
        "<h1 class='text-danger fw-bold'>Si è verificato un errore</h1>" + err;
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const newProduct = new Product(name, description, brand, price, imageUrl);
  console.log("New Product Created:", newProduct);

  fetch(ApiUrl + (id ? "/" + id : ""), {
    method: id ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjU1NGY0YmQ0NzAwMTU4NWIxZTEiLCJpYXQiOjE3NjI1MDYwNjgsImV4cCI6MTc2MzcxNTY2OH0.bYGaU7MPXft1CZdq27sG1vLiqMgjLgQND7zM3zYnC4Q",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert(
          id
            ? "Prodotto modificato con successo"
            : "Prodotto aggiunto con successo"
        );
        form.reset();
      } else {
        alert("Errore non è stato aggiunto il prodotto");
      }
    })
    .catch((err) => {
      console.log("Errore:", err);
      const errorC = document.getElementById("error");
      errorC.innerHTML =
        "<h1 class='text-danger fw-bold'>Si è verificato un errore nel caricamento del prodotto.</h1>" +
        err;
    });
});

const confirmResetBtn = document.getElementById("confirmReset");
const resetModalEl = document.getElementById("confirmResetModal");

confirmResetBtn.addEventListener("click", () => {
  form.reset();
});
