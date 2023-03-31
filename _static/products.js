var BMA_PRODUCTS = {
  eva3: "EVA ICS v3",
  eva4: "EVA ICS v4",
  "eva-mlkit": "EVA ICS Machine Learning kit",
  psrt: "PSRT",
  busrt: "BUS/RT",
  "hmi-block-ui": "HMI Block UI"
};

function bma_inject_product() {
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
      // throw err;
    }
  });
}

function bma_wait_result() {
  let el = document.getElementById("search-results");
  try {
    if (el.getElementsByTagName("h2")[0].innerHTML == "Search Results") {
      bma_inject_product();
    } else {
      setTimeout(bma_wait_result, 100);
    }
  } catch (err) {
    setTimeout(bma_wait_result, 100);
  }
}

if (document.location.pathname.endsWith("/search.html")) {
  setTimeout(bma_wait_result, 100);
}
