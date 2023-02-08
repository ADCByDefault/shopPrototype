// /** @type {Array} */
// import products from "/products.js";
const pathToImgs = "imgs/productsImgs/";
/** @type{HTMLInputElement} */
const searchInput = document.querySelector("#searchInput");
const categories = Array.from(document.querySelectorAll("[data-searchable]"));
const body = document.querySelector("#cardContainer");

/** @type {Array}*/
const productItems = products.map((product) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("col", "item-card", "p-1");

    let img = document.createElement("img");
    img.src = `${pathToImgs}${product.image}`;
    img.classList.add("w-100", "card-img");

    let name = document.createElement("h3");
    name.textContent = `${product.productName}`;

    let size = document.createElement("p");
    size.textContent = product.size.join(" / ");
    size.classList.add("fs-6");

    let onSale = document.createElement("p");
    onSale.classList.add("text-danger");
    onSale.textContent = `On Sale!`;

    let searchOptions = `${product.productName} ${product.category.join(" ")} `;
    wrapper.dataset.keyWords = searchOptions.toUpperCase();
    wrapper.append(img, name, size);

    if (product.sale) {
        wrapper.append(onSale);
        wrapper.classList.add("border", "border-danger", "rounded");
    }
    return wrapper;
});

let displayArray = productItems.map((e) => e);
body.append(...displayArray);

categories.forEach((c) => {
    c.addEventListener("click", () => {
        search(c.innerText);
    });
});

function search(key) {
    if (key == "All") key = "";
    key = key.toUpperCase();
    displayArray = productItems.map((e) => e);
    displayArray = displayArray.filter((product) => {
        return product.dataset.keyWords.includes(key);
    });
    body.textContent = "";
    body.append(...displayArray);
}

searchInput.addEventListener("input", () => {
    search(searchInput.value);
});
