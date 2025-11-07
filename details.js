const url = location.search;
const allP = new URLSearchParams(url);
const id = allP.get("ProdId");
console.log("ID:", id);

const ApiUrl = "https://striveschool-api.herokuapp.com/api/product/";

const getProductDetails = function () {
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
        throw new Error("Errore nel recupero del prodotto");
      }
    })
    .then((product) => {
      console.log("product:", product);
      document.getElementById("image").src = product.imageUrl;
      document.getElementById("name").innerText = product.name;
      document.getElementById("description").innerText = product.description;
      document.getElementById("brand").innerText = product.brand;
      document.getElementById("price").innerText = product.price + ",00€";
    })
    .catch((err) => {
      console.log("Errore:", err);
      // qui andrà un get element per recuperare ERR con l'innterText
    });
};
getProductDetails();
// bottone modifica
const editEvent = function () {
  location.assign(`./backoffice.html?ProdId=${id}`);
};
// bottone elimina
const deleteEvent = function () {
  fetch(ApiUrl + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjU1NGY0YmQ0NzAwMTU4NWIxZTEiLCJpYXQiOjE3NjI1MDYwNjgsImV4cCI6MTc2MzcxNTY2OH0.bYGaU7MPXft1CZdq27sG1vLiqMgjLgQND7zM3zYnC4Q",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Prodotto eliminato con successo");
        location.assign("homepage.html");
      } else {
        throw new Error("Errore nell'eliminazione del prodotto");
      }
    })
    .catch((err) => {
      console.log("Errore:", err);
    });
};
