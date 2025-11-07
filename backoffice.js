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
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const newProduct = new Product(name, description, brand, price, imageUrl);
  console.log("New Product Created:", newProduct);

  const ApiUrl = "https://striveschool-api.herokuapp.com/api/product/";

  fetch(ApiUrl, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjU1NGY0YmQ0NzAwMTU4NWIxZTEiLCJpYXQiOjE3NjI1MDYwNjgsImV4cCI6MTc2MzcxNTY2OH0.bYGaU7MPXft1CZdq27sG1vLiqMgjLgQND7zM3zYnC4Q",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Prodotto salvato con successo!");
        form.reset();
      } else {
        alert("Errore non è stato aggiunto il prodotto");
      }
    })
    .catch((err) => {
      console.log("Errore:", err);
    });
});
