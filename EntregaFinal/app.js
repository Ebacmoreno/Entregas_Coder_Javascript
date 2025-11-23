// Definición de clase Producto
class Producto {
  constructor(id, nombre, precio, atributos, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.atributos = atributos; // array con distintas palabras/ tags como: género, tipo, subtipo,...
    this.imagen = imagen;
  }
}

// Array de productos usando la clase Producto
const productos = [
  new Producto(1, "Polera básica", 29.99, ["unisex", "top", "polera"], "imgs/polera.webp"),
  new Producto(2, "Camisa formal", 39.99, ["hombre", "top", "camisa"], "imgs/camisa.jpeg"),
  new Producto(3, "Vestido elegante", 49.99, ["mujer", "dress", "vestido"], "imgs/vestidoelegante.jpeg"),
  new Producto(4, "Jeans clásicos", 34.99, ["unisex", "bottom", "jeans"], "imgs/jeans.webp"),
  new Producto(5, "Abrigo de invierno", 44.99, ["unisex", "coat"], "imgs/abrigo.webp"),
  new Producto(6, "Remera estampada", 24.99, ["mujer", "top", "polera"], "imgs/poleraestampada.jpg"),
  new Producto(7, "Vestido casual", 54.99, ["mujer", "dress", "vestido"], "imgs/vestidocausal.jpeg"),
  new Producto(8, "Gorra deportiva", 19.99, ["unisex", "accesorio"], "imgs/cap.avif")
];

// Array del carrito
let carrito = [];

// Obtener todos los atributos únicos de los productos
function obtenerAtributosUnicos() {
  const setAtributos = new Set();
  productos.forEach(p => p.atributos.forEach(a => setAtributos.add(a)));
  return Array.from(setAtributos).sort();
}

// Renderizar los filtros de atributos
function renderizarFiltrosAtributos() {
  const atributos = obtenerAtributosUnicos();
  const contenedorFiltros = document.getElementById("filtros-atributos");
  contenedorFiltros.innerHTML = "";
  atributos.forEach(attr => {
    const label = document.createElement("label");
    label.style.marginRight = "10px";
    label.innerHTML = `<input type="checkbox" value="${attr}" class="filtro-atributo"> ${attr}`;
    contenedorFiltros.appendChild(label);
  });
}

// Obtener los atributos seleccionados
function obtenerAtributosSeleccionados() {
  return Array.from(document.querySelectorAll('.filtro-atributo:checked')).map(cb => cb.value);
}

// Guardar filtros en sessionStorage
function guardarFiltrosEnSession() {
  const seleccionados = obtenerAtributosSeleccionados();
  sessionStorage.setItem('filtrosSeleccionados', JSON.stringify(seleccionados));
}

// Recuperar filtros de sessionStorage
function recuperarFiltrosDeSession() {
  const data = sessionStorage.getItem('filtrosSeleccionados');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

// Renderizar productos filtrados
function renderizarProductos() {
  const contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = "";
  const atributosSeleccionados = obtenerAtributosSeleccionados();
  let productosFiltrados = productos;
  if (atributosSeleccionados.length > 0) {
    productosFiltrados = productos.filter(producto =>
      atributosSeleccionados.every(attr => producto.atributos.includes(attr))
    );
  }
  if (productosFiltrados.length === 0) {
    contenedorProductos.innerHTML = "<p>No hay productos que coincidan con los filtros seleccionados.</p>";
    return;
  }
  productosFiltrados.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.innerHTML = `
      <div class="imagen"><img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" width="400" height="400"></div>
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
    Swal.fire({
      title: "El carrito está vacío",
      icon: "info"
    });
    return;
  }

  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, comprar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
    // Guardar en localStorage
    localStorage.setItem("ultimaCompra", JSON.stringify(carrito));
    
    // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: "¡Compra realizada!",
        text: "Tu compra ha sido registrada.",
      icon: "success"
    }).then(() => {
      // Limpiar carrito y reiniciar página
      carrito = [];
      location.reload();
      // Limpiar filtros después de la compra
         sessionStorage.removeItem('filtrosSeleccionados');
       });
    }
  });
}

// Guardar el carrito en localStorage al cerrar la ventana
window.addEventListener("beforeunload", () => {
  localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
});

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
  // Recuperar carrito guardado si existe
  const carritoGuardado = localStorage.getItem("carritoGuardado");
  if (carritoGuardado) {
    try {
      carrito = JSON.parse(carritoGuardado);
    } catch (e) {
      carrito = [];
    }
  }
  renderizarFiltrosAtributos();
  // Recuperar filtros seleccionados y marcarlos
  const seleccionados = recuperarFiltrosDeSession();
  if (seleccionados.length > 0) {
    setTimeout(() => {
      document.querySelectorAll('.filtro-atributo').forEach(cb => {
        if (seleccionados.includes(cb.value)) cb.checked = true;
      });
      renderizarProductos();
    }, 0);
  } else {
    renderizarProductos();
  }
  renderizarCarrito();
  mostrarUltimaCompra();
  // Escuchar cambios en los filtros
  document.getElementById("filtros-atributos").addEventListener("change", () => {
    guardarFiltrosEnSession();
    renderizarProductos();
  });
  // Botón limpiar filtros
  document.getElementById("btn-limpiar-filtros").addEventListener("click", () => {
    document.querySelectorAll('.filtro-atributo:checked').forEach(cb => cb.checked = false);
    guardarFiltrosEnSession();
    renderizarProductos();
  });
});
