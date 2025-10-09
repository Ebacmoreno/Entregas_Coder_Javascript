// Variables y constantes
const MESES = 12;
let nombre = prompt("¡Bienvenido! ¿Cuál es tu nombre?");
let ahorroMensual = parseFloat(prompt("¿Cuánto dinero ahorrarás cada mes?"));

// Función 1: Validar el monto ingresado
function validarMonto(monto) {
  if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingresa un número válido mayor a 0.");
    return false;
  } else {
    return true;
  }
}

// Función 2: Calcular ahorro anual
function calcularAhorro(monto) {
  let total = 0;
  for (let i = 1; i <= MESES; i++) {
    total += monto;
    console.log(`Mes ${i}: ahorro acumulado = $${total}`);
  }
  return total;
}

// Función 3: Mostrar resultado final
function mostrarResultado(total) {
  alert(
    nombre + ", tu ahorro total al cabo de un año será de $" + total +
    "\n¡Felicitaciones por tu compromiso!"
  );
}

// Lógica principal del simulador
if (validarMonto(ahorroMensual)) {
  let confirmacion = confirm("¿Deseas simular tu ahorro anual?");
  if (confirmacion) {
    let totalAhorro = calcularAhorro(ahorroMensual);
    mostrarResultado(totalAhorro);
  } else {
    alert("Simulación cancelada. ¡Vuelve pronto!");
  }
}