var BMA_PRODUCTS = {
  eva3: "EVA ICS v3",
  eva4: "EVA ICS v4"
};

function bma_inject_product() {
  try {
    let els = document
      .getElementsByClassName("search")[0]
      .getElementsByTagName("li");
    let result = Array.from(els);
    result.forEach((el) => {
      try {
        let p = el.getElementsByTagName("a")[0].href.split("/")[5];
        let product = BMA_PRODUCTS[p];
        if (product) {
          let product_el = document.createElement("span");
          product_el.innerHTML = "<b>[" + product + "]</b> ";
          el.insertBefore(product_el, el.firstChild);
        }
      } catch (err) {
        throw err;
      }
    });
  } catch (err) {
    throw err;
  }
}

function bma_wait_result() {
  if (
    document.getElementById("search-results").getElementsByTagName("h2")[0]
      .innerHTML == "Search Results"
  ) {
    bma_inject_product();
  } else {
    setTimeout(bma_wait_result, 200);
  }
}

if (document.location.pathname.endsWith("/search.html")) {
  setTimeout(bma_wait_result, 200);
}
