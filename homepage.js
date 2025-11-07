const ApiUrl = "https://striveschool-api.herokuapp.com/api/product/";

const getProducts = function () {
  fetch(ApiUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYjU1NGY0YmQ0NzAwMTU4NWIxZTEiLCJpYXQiOjE3NjI1MDYwNjgsImV4cCI6MTc2MzcxNTY2OH0.bYGaU7MPXft1CZdq27sG1vLiqMgjLgQND7zM3zYnC4Q",
    },
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((products) => {
      console.log("products:", products);
      const row = document.getElementById("row-products");
      products.forEach((product) => {
        row.innerHTML += `
        <div class="col g-3">
            <div class="prodcard card h-100 d-flex flex-column shadow" >
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body flex-grow-1 d-flex flex-column">
                    <h5 class="card-title text-center">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <p class="card-text text-center"><strong>Brand:</strong> ${product.brand}</p>
                    <p class="card-text text-center text-primary fw-bolder">${product.price},00€</p>
                    <a href="./details.html?ProdId=${product._id}" class="btn btn-primary rounded-pill">Vai ai dettagli</a>
                </div>
            </div>
        </div>
            `;
      });
    })
    .catch((err) => {
      console.log("Errore:", err);
      const errorC = document.getElementById("error");
      errorC.innerHTML =
        "<h1 class='text-danger fw-bold'>Si è verificato un errore</h1>" + err;
    });
};
getProducts();
