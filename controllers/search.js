const container = document.getElementById("search__container");
const search = document.getElementById("search__items");
const action = document.getElementById("search__action");
const label = document.querySelector(".label--active");

console.log("Search elements:", container, search, action);

let products = [];

setInterval(() => {
  products = Array.from(document.querySelectorAll("[data-product]"));
}, 1000 / 5);

const update = () => {
  const value = search.value.toLowerCase();

  for (const product of products) {
    const name = (product.getAttribute("data-product") || "")
      .toLowerCase()
      .trim();

    console.log("Search value and product", { value, name });

    product.style.display =
      !value || !name || name.includes(value) ? "flex" : "none";
  }
};

search.addEventListener("input", update);
search.addEventListener("change", update);

label?.addEventListener("click", () => {
  const windowWidth = window.innerWidth;
  windowWidth < 768 && search.style.display === "block"
    ? (search.style.display = "none")
    : (search.style.display = "block");
});
