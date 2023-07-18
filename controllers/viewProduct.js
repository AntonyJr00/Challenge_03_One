import { productosServicios } from "../servicios/productos-servicios.js";
import { nuevoProducto } from "./productsController.js";

const imgProduct = document.querySelector("[data-img]");
const nameProduct = document.querySelector("[data-name]");
const priceProduct = document.querySelector("[data-price]");
const descProduct = document.querySelector("[data-descripcion]");

const url = new URL(window.location);
const id = url.searchParams.get("id");

const getInfo = async (id, screenWidth = undefined) => {
  console.log(screenWidth);
  try {
    const product = await productosServicios.detalleProducto(id);

    imgProduct.src = product.imageUrl;
    nameProduct.textContent = product.name;
    priceProduct.textContent = `precio: ${product.price}`;
    descProduct.textContent = `Descripción del producto: ${product.description}`;

    const products = await productosServicios.listaProductos();
    const allProducts = document.querySelector("[data-products]");

    allProducts.innerHTML = "";
    products
      .filter((p) => p.categoria === product.categoria)
      .forEach((elemento, index) => {
        if (screenWidth < 768) {
          if (index < 4)
            allProducts.appendChild(
              nuevoProducto(
                elemento.name,
                elemento.price,
                elemento.imageUrl,
                elemento.id
              )
            );
        } else {
          allProducts.appendChild(
            nuevoProducto(
              elemento.name,
              elemento.price,
              elemento.imageUrl,
              elemento.id
            )
          );
        }
      });
  } catch (error) {
    console.error("Hubo un Error", error);
  }
};

if (id) {
  const screenWidth = window.innerWidth;
  getInfo(id, screenWidth);
}

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth;
  if (id) {
    getInfo(id, screenWidth);
  }
});
