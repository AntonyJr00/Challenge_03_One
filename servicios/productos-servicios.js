const listaProductos = () =>
  fetch("https://64b5c351f3dbab5a95c7a487.mockapi.io/producto").then(
    (respuesta) => respuesta.json()
  );

const crearProducto = (imageUrl, name, price, categoria, description) => {
  return fetch("https://64b5c351f3dbab5a95c7a487.mockapi.io/producto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrl,
      name,
      price,
      categoria,
      description,
      id: uuid.v4(),
    }),
  }).then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.body;
    }
    throw new Error("No fue posible crear un producto");
  });
};

const detalleProducto = async (id) => {
  const respuesta = await fetch(
    `https://64b5c351f3dbab5a95c7a487.mockapi.io/producto/${id}`
  );
  return respuesta.json();
};

const deleteItem = (id) => {
  return fetch(`https://64b5c351f3dbab5a95c7a487.mockapi.io/producto${id}`, {
    method: "DELETE",
  });
};

const updateItem = (imageUrl, name, price, categoria, description, id) => {
  return fetch(`https://64b5c351f3dbab5a95c7a487.mockapi.io/producto${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrl,
      name,
      price,
      categoria,
      description,
    }),
  })
    .then((response) => response)
    .catch((error) => console.error("error al editar", error));
};

export const productosServicios = {
  listaProductos,
  crearProducto,
  detalleProducto,
  updateItem,
  deleteItem,
};
