function mostrarProductos(productos) {
  productos.forEach((producto) => {
    const { nombre, precio, tipo, id } = producto;
    const imprimirProducto = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title rbno"><span class="fw-bold">Nombre:</span> <span id="nombre">${nombre}</span></h5>
                    <p class="card-title rbno"><span class="fw-bold">Tipo:</span> ${tipo}</p>
                        <p class="card-text rbno"><span class="fw-bold">Precio:</span> $ <span  id="precio">${precio}</span></p>
                        <a href="#" class="btn btn-compra rbno" data-id="${id}">Comprar</a>
                    </div>
                </div>
            </div>
        `;
    document.querySelector("#productos").innerHTML += imprimirProducto;
  });
}

mostrarProductos(productos);

const carrito = document.querySelector("#carrito");
const item = document.querySelector("#productos");
const carritoContainer = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const terminarCompra = document.querySelector("#terminar-carrito");
const totalSpan = document.querySelector("#total");
let productosCarrito = [];

function agregarProducto(e) {
  e.preventDefault();
  const producto = e.target.parentElement.parentElement;
  if (e.target.classList.contains("btn-compra")) {
    registrarProducto(producto);
  }
  sumarTotal();
}

function registrarProducto(producto) {
  console.log(producto);

  // create obj

  const productoObj = {
    img: producto.querySelector("img").src,
    nombre: producto.querySelector("#nombre").textContent,
    precio: producto.querySelector("#precio").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const yaEsta = productosCarrito.some(
    (producto) => producto.id === productoObj.id
  );

  if (yaEsta) {
    const productos = productosCarrito.map((producto) => {
      if (producto.id === productoObj.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    productosCarrito = [...productos];
  } else {
    productosCarrito = [...productosCarrito, productoObj];
  }

  console.log(productosCarrito);

  imprimirProducto();
}

function imprimirProducto() {
  carritoContainer.innerHTML = "";
  productosCarrito.forEach((producto) => {
    carritoContainer.innerHTML += `
            <tr>
                <td><img src="${producto.img}" width="70"></td>
                <td class="text-center">${producto.nombre}</td>
                <td class="text-center"> $ ${producto.precio}  </td>
                <td class="text-center"> ${producto.cantidad} </td>
                <td class="text-center"> <a href="#" data-id="${producto.id}" class="unset" ><i class="bi bi-x-circle-fill x"></i></a> </td>
            </tr>`;
  });
}


function sumarTotal() {
  let total = 0;
  productosCarrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
    totalSpan.innerText = total ? total : "0";
  });
  return total;
}

function eliminarProducto(e) {
    // console.log(e.target.classList);
    e.preventDefault();
    if (e.target.classList.contains("x")) {
      const producto = e.target.parentElement.parentElement;
      const id = producto.querySelector("a").getAttribute("data-id");
      const productos = productosCarrito.filter((producto) => producto.id !== id);
      productosCarrito = [...productos];
      totalSpan.innerText = "";
      imprimirProducto();
      sumarTotal();
    }
  }
  

vaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  productosCarrito = [];
  imprimirProducto();
  totalSpan.innerText = "";
});

item.addEventListener("click", agregarProducto);

carrito.addEventListener("click", eliminarProducto);