// Array de productos
const productos = [
  { id: 1, nombre: "Producto 1", precio: 29.99, imagen: "👕" },
  { id: 2, nombre: "Producto 2", precio: 39.99, imagen: "👔" },
  { id: 3, nombre: "Producto 3", precio: 49.99, imagen: "👗" },
  { id: 4, nombre: "Producto 4", precio: 34.99, imagen: "👖" },
  { id: 5, nombre: "Producto 5", precio: 44.99, imagen: "🧥" },
  { id: 6, nombre: "Producto 6", precio: 24.99, imagen: "👕" },
  { id: 7, nombre: "Producto 7", precio: 54.99, imagen: "👗" },
  { id: 8, nombre: "Producto 8", precio: 19.99, imagen: "🧢" }
];

// Array del carrito
let carrito = [];

// Función para renderizar productos
function renderizarProductos() {
  const contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = "";

  productos.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.innerHTML = `
      <div class="imagen">${producto.imagen}</div>
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(divProducto);
  });
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const productoEnCarrito = carrito.find(p => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  renderizarCarrito();
}

// Función para modificar cantidad
function modificarCantidad(id, cantidad) {
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad = parseInt(cantidad);
    if (producto.cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      renderizarCarrito();
    }
  }
}

// Función para eliminar del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  renderizarCarrito();
}

// Función para renderizar carrito
function renderizarCarrito() {
  const contenedorCarrito = document.getElementById("carrito-items");
  const totalCarrito = document.getElementById("total-carrito");
  
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    totalCarrito.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const divItem = document.createElement("div");
    divItem.classList.add("carrito-item");
    divItem.innerHTML = `
      <div class="item-info">
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio.toFixed(2)} x</p>
      </div>
      <input type="number" min="1" value="${producto.cantidad}" onchange="modificarCantidad(${producto.id}, this.value)">
      <p class="subtotal">$${subtotal.toFixed(2)}</p>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${producto.id})">❌</button>
    `;
    contenedorCarrito.appendChild(divItem);
  });

  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para comprar
function comprar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  if (confirm("¿Estás seguro de que deseas realizar esta compra?")) {
    // Guardar en localStorage
    localStorage.setItem("ultimaCompra", JSON.stringify(carrito));
    
    // Mostrar mensaje de éxito
    alert("¡Compra realizada con éxito!");
    
    // Limpiar carrito y reiniciar página
    carrito = [];
    location.reload();
  }
}

// Función para mostrar última compra
function mostrarUltimaCompra() {
  const ultimaCompra = localStorage.getItem("ultimaCompra");
  if (ultimaCompra) {
    const compra = JSON.parse(ultimaCompra);
    console.log("Última compra realizada:", compra);
  }
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
  mostrarUltimaCompra();
});