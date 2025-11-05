// Definición de clase productos, función constructora y métodos

class Producto{
    constructor(id, nombre, precio, categoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
    // este método modifica el precio original, por lo que se descarta su uso
    // aplicarDcto(dcto){
    //     // descuento en porcentaje, i.e. 10 para 10%
    //     this.precio = this.precio * (1-dcto/100);
    // }
}

// creación de los productos

const productos =[
    new Producto(1, 'polera básica', 14000, 'poleras y camisetas'),
    new Producto(2, 'polera estampada', 16000, 'poleras y camisetas'),
    new Producto(3, 'jean clásico', 35000, 'pantalones'),
    new Producto(4, 'shorts', 30000, 'pantalones'),
    new Producto(5, 'jockey', 15000, 'gorros'),
];

// Uso de función map para aplicar descuento del 10% a todos los productos
function aplicarDcto(productos, dcto) {
  const productosconDcto = productos.map(producto => {
      return {
          ...producto,
          precio: Number(producto.precio *(1- dcto/100)).toFixed(0)
      };
  });
  console.log(`Productos con ${dcto}% de descuento aplicado:`); 
  console.log(productosconDcto);
  return productosconDcto;
// Colocar un try para que el dcto esté entre 0 y 100
}

//Probamos la función con disintos dctos:
aplicarDcto(productos, 10);
aplicarDcto(productos, 25);
aplicarDcto(productos, 50);


// DOM

const contenedorProductos = document.querySelector(".productos");

 function mostrarProductos() {
   contenedorProductos.innerHTML = productos.map(producto => `
     <div class="producto-card" data-id="${producto.id}">
       <h3>${producto.nombre}</h3>
       <p>Categoria: ${producto.categoria}</p>
       <p>Precio: $${producto.precio}</p>
       <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
     </div>
   `).join("");
}

mostrarProductos();

//Carrito de compras

// ---- Eventos --- //
const botonesAgregar = document.querySelectorAll('.btn-agregar');

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', ()=>{
    console.log('Producto agregado al carrito');
  });
});
