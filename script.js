fetchProducts();

async function fetchProducts() {
  try {
    const container = document.querySelector(".container");
    const loader = document.querySelector("#loading");

    loader.classList.add("display");

    const data = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json"
    );
    const products = await data.json();

    loader.classList.remove("display");

    products.forEach((product) => {
      const card = `
        <div class="card">
          <img class="product-image" src='${product["api_featured_image"]}' alt='${product["name"]}'>
          <div class="card-content">
            <p class="product-brand">${product["brand"]}</p>
            <h3 class="product-name">${product["name"]}</h3>
            <div class="card-footer">
              <p class="product-price">${product["price"]}</p>
              <a class="button" href='${product["product_link"]}' target="_blank">BUY</a>
            </div>
          </div>
        </div>`;
      container.insertAdjacentHTML("beforeend", card);
      const cardEventListener = document
        .querySelector(".card:last-child")
        .addEventListener("click", function () {
          showModal(product);
        });
    });
  } catch (error) {
    console.log("Error: " + error);
    location.reload();
  }
}

