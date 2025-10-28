// Definición de clase productos, función constructora y métodos

class Producto{
    constructor(id, nombre, precio, categoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
    aplicarDcto(dcto){
        // descuento en porcentaje, i.e. 10 para 10%
        this.precio = this.precio * (1-dcto/100);
    }
}

// creación de los productos

const productos =[
    new Producto(1, 'polera básica', 14000, 'poleras y camisetas'),
    new Producto(2, 'polera estampada', 16000, 'poleras y camisetas'),
    new Producto(3, 'jean clásico', 35000, 'pantalones'),
    new Producto(4, 'shorts', 30000, 'pantalones'),
    new Producto(5, 'jockey', 15000, 'gorros'),
];

// DOM

const contenedorProductos = document.querySelector(".productos");

// function renderProductos() {
//   contenedorProductos.innerHTML = productos.map(producto => `
//     <div class="producto-card" data-id="${producto.id}">
//       <h3>${producto.nombre}</h3>
//       <p>Categoria: ${producto.categoria}</p>
//       <p>Precio: $${producto.precio}</p>
//       <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
//     </div>
//   `).join("");
// }

// renderProductos();

// ---- Eventos --- //
