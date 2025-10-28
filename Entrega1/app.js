// // Ejemplo basico de simulador de tienda de ropa: Entrada/Procesamiento/Salida de datos
// console.log("Bienvenido a la tienda");
// // array de productos
// const productos = [
//     {id: 1, nombre: "polera básica", precio: 14000 },
//     {id: 2, nombre: "jockey solarpunk", precio: 18000 },
//     {id: 3, nombre: "polera edicion limitada", precio:20000}
// ];


// // Funciones flecha con alerts
// const mostrarProductos = () => {
//     let listaProductos = "Productos disponibles:\n"; //se muestran como un string concatenado
//     for (let producto of productos) {
//         listaProductos += producto.nombre + ": $" + producto.precio + "\n";
//     }
//     alert(listaProductos);
// }

// mostrarProductos();

// // Funcion para consultar los precios de los productos
// const consultarprecio = {} => {
//     let productobuscado = prompt ("Ingrese producto a buscar").toLowerCase();
// }

const divProductos = document.querySelector(".productos");

console.log(divProductos);

divProductos.innerHTML = "<h2>Hola mundo</h2>";