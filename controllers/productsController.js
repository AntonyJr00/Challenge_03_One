import { productosServicios } from "../servicios/productos-servicios.js";

export const nuevoProducto = (name, price, imageUrl, id) => {
  const contenido = `
            <div class="product__card__imgContainer">
                <img class="product__card__img" src = "${imageUrl}" alt = "imagen_del_producto">
                  <div class="product__card-edit hidden ">
                    <button class="product__card__btnDelete" type="button">
                      <img src="https://res.cloudinary.com/dqxk1p1vp/image/upload/v1689639058/E-comerce-products/icons/delete_mqfr3d.svg" alt="dlt_icon" class="iconEdit" data-delete>
                    </button>
                    <a href="../screens/edit-product.html?id=${id}">
                      <img src="https://res.cloudinary.com/dqxk1p1vp/image/upload/v1689639047/E-comerce-products/icons/edit_uhh75j.svg" alt="edit_icon" class="iconEdit" data-edit>
                    </a>
                  </div>
            </div>
            <div class="product__card__info">
                <p class="product__card__title">${name}</p>
                <p class="product__card__price">${price}</p>
                <a href="../screens/viewProducts.html?id=${id}" class="product__card__boton" data-verProducto> #verproducto </a>
            </div>
    `;

  const card = document.createElement("div");
  card.setAttribute("data-product", name);
  card.innerHTML = contenido;
  card.classList.add("product__card");

  const deleteBtn = card.querySelector(".product__card__btnDelete");
  deleteBtn.addEventListener("click", () => {
    productosServicios
      .deleteItem(id)
      .then(() => {
        render();
      })
      .catch((err) => console.error("hubo un error", err));
  });

  return card;
};

//para el index--------------------------------------------
//--------------------------------------------

const shownuevoProducto = (name, price, imageUrl, id) => {
  const contenido = `
            <div class="product__card__imgContainer">
                <img class="product__card__img" src = "${imageUrl}" alt = "imagen_del_producto">
            </div>
            <div class="product__card__info">
                <p class="product__card__title">${name}</p>
                <p class="product__card__price">${price}</p>
                <a href="./screens/viewProducts.html?id=${id}" class="product__card__boton" data-verProducto> #verproducto </a>
            </div>
    `;

  const card = document.createElement("div");
  card.setAttribute("data-product", name);
  card.innerHTML = contenido;
  card.classList.add("product__card");

  return card;
};

//--------------------------------------------
//para el index--------------------------------------------

const productos = document.querySelector("[data-starWarsCategory]");
const productos2 = document.querySelector("[data-consolasCategoria]");
const productos3 = document.querySelector("[data-diversosCategoria]");
const consoleProduct = document.querySelector("[data-allConsolas]");
const adminProducts = document.querySelector("[data-adminProducts]");

const render = async () => {
  try {
    const allProducts = await productosServicios.listaProductos();

    if (adminProducts) {
      adminProducts.innerHTML = "";
      allProducts.forEach((elemento) => {
        adminProducts.appendChild(
          nuevoProducto(
            elemento.name,
            elemento.price,
            elemento.imageUrl,
            elemento.id
          )
        );
      });
    }
    if (productos) {
      productos.innerHTML = "";
      allProducts
        .filter((product) => product.categoria === "StarWars")
        .forEach((elemento, index) => {
          if (index < 6) {
            productos.appendChild(
              shownuevoProducto(
                elemento.name,
                elemento.price,
                elemento.imageUrl,
                elemento.id
              )
            );
          }
        });
    }
    if (productos2) {
      productos2.innerHTML = "";
      allProducts
        .filter((product) => product.categoria === "Consolas")
        .forEach((elemento, index) => {
          if (index < 6) {
            productos2.appendChild(
              shownuevoProducto(
                elemento.name,
                elemento.price,
                elemento.imageUrl,
                elemento.id
              )
            );
          }
        });
    }
    if (productos3) {
      productos3.innerHTML = "";
      allProducts
        .filter((product) => product.categoria === "Diversos")
        .forEach((elemento, index) => {
          if (index < 6) {
            productos3.appendChild(
              shownuevoProducto(
                elemento.name,
                elemento.price,
                elemento.imageUrl,
                elemento.id
              )
            );
          }
        });
    }
    if (consoleProduct) {
      consoleProduct.innerHTML = "";
      allProducts
        .filter((product) => product.categoria === "Consolas")
        .forEach((elemento) => {
          consoleProduct.appendChild(
            nuevoProducto(
              elemento.name,
              elemento.price,
              elemento.imageUrl,
              elemento.id
            )
          );
        });
    }
  } catch (err) {
    console.error("Ocurrió un error", err);
  }
};

render();
