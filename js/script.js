// Capturamos los elementos del formulario
const form = document.getElementById("simuladorForm");
const resultadoDiv = document.getElementById("resultado");

// Cargar datos guardados en localStorage
window.onload = () => {
    const datosGuardados = JSON.parse(localStorage.getItem("simuladorData"));
    if (datosGuardados) {
        document.getElementById("nombre").value = datosGuardados.nombreProducto;
        document.getElementById("precio").value = datosGuardados.precioProducto;
        document.getElementById("descuento").value = datosGuardados.porcentajeDescuento * 100;
        document.getElementById("presupuesto").value = datosGuardados.presupuesto;
        mostrarResultados(datosGuardados, calcularPrecioFinal(datosGuardados.precioProducto, datosGuardados.porcentajeDescuento));
    }
};

// Función para calcular el precio con descuento
function calcularPrecioFinal(precio, descuento) {
    return precio * (1 - descuento);
}

// Función para mostrar los resultados en el DOM
function mostrarResultados(datos, precioFinal) {
    const precioRedondeado = Math.round(precioFinal * 100) / 100;

    resultadoDiv.innerHTML = `
        <h3>Resultados:</h3>
        <p>Producto: <strong>${datos.nombreProducto}</strong></p>
        <p>Precio con descuento: <strong>$${precioRedondeado}</strong></p>
        <p>Presupuesto disponible: <strong>$${datos.presupuesto}</strong></p>
    `;

    // Creamos un nuevo párrafo para el mensaje final
    const mensajeFinal = document.createElement("p");

    if (precioRedondeado <= datos.presupuesto) {
        mensajeFinal.textContent = "¡Puedes comprarlo!";
        mensajeFinal.classList.add("resultado-exito"); // Agrega la clase para color verde
    } else {
        mensajeFinal.textContent = "No tienes suficiente presupuesto.";
        mensajeFinal.classList.add("resultado-error"); // Agrega la clase para color rojo
    }

    // Agregamos el mensaje final al `resultadoDiv`
    resultadoDiv.appendChild(mensajeFinal);
}

// Evento para capturar el envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el refresco de la página

    // Capturar los valores del formulario
    const nombreProducto = document.getElementById("nombre").value;
    const precioProducto = parseFloat(document.getElementById("precio").value);
    const porcentajeDescuento = parseFloat(document.getElementById("descuento").value) / 100;
    const presupuesto = parseFloat(document.getElementById("presupuesto").value);

    if (isNaN(precioProducto) || isNaN(porcentajeDescuento) || isNaN(presupuesto)) {
        resultadoDiv.innerHTML = "<p style='color: red;'>Por favor, ingresa valores numéricos válidos.</p>";
        return;
    }

    // Guardar datos en localStorage
    const datos = { nombreProducto, precioProducto, porcentajeDescuento, presupuesto };
    localStorage.setItem("simuladorData", JSON.stringify(datos));

    // Calcular el precio final y mostrar los resultados
    const precioFinal = calcularPrecioFinal(precioProducto, porcentajeDescuento);
    mostrarResultados(datos, precioFinal);
});
