
"use strict";

// ===== COPIAR EL VERSÍCULO =====

const versiculo =
  "Salmos 119:105 — “Lámpara es a mis pies tu palabra, y lumbrera a mi camino.” (Reina-Valera 1960)";

const botonCopiar = document.querySelector("#copiar-versiculo");

botonCopiar.addEventListener("click", async () => {
  const estado = document.querySelector("#estado-copia");

  try {
    await navigator.clipboard.writeText(versiculo);
    estado.textContent = "Versículo copiado correctamente.";
  } catch (error) {
    estado.textContent =
      "No se pudo copiar automáticamente. Selecciona y copia el versículo manualmente.";
  }
});

// ===== BUSCADOR BÍBLICO =====

const formulario = document.querySelector("#form-busqueda");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const campo = document.querySelector("#referencia");
  const resultado = document.querySelector("#resultado-busqueda");
  const referencia = campo.value.trim();

  if (!referencia) {
    resultado.textContent =
      "Escribe una referencia, por ejemplo: Juan 3:16.";

    campo.focus();
    return;
  }

  resultado.textContent =
    `Abriendo la búsqueda para: ${referencia}`;

  const url =
    "https://www.biblegateway.com/quicksearch/?quicksearch=" +
    encodeURIComponent(referencia);

  window.open(url, "_blank", "noopener,noreferrer");
});

// ===== SUGERENCIAS DE LECTURA =====

const sugerencias = {
  "Génesis": {
    referencia: "Génesis 1",
    descripcion:
      "Lee el relato de la creación y reflexiona sobre el comienzo de la historia bíblica."
  },

  "Salmos": {
    referencia: "Salmos 23",
    descripcion:
      "Lee este poema sobre la confianza y el cuidado de Dios."
  },

  "Proverbios": {
    referencia: "Proverbios 3:1-12",
    descripcion:
      "Reflexiona sobre la sabiduría, la confianza y las decisiones cotidianas."
  },

  "Mateo": {
    referencia: "Mateo 5–7",
    descripcion:
      "Explora el Sermón del Monte y las enseñanzas de Jesús."
  },

  "Juan": {
    referencia: "Juan 1",
    descripcion:
      "Lee la introducción del Evangelio de Juan y su mensaje sobre la Palabra y la luz."
  },

  "Romanos": {
    referencia: "Romanos 12",
    descripcion:
      "Reflexiona sobre el servicio, la humildad y el amor hacia los demás."
  }
};

// Seleccionar un libro bíblico

const botonesLibros = document.querySelectorAll("[data-book]");

botonesLibros.forEach((boton) => {
  boton.addEventListener("click", () => {
    const libro = boton.dataset.book;
    const sugerencia = sugerencias[libro];

    if (!sugerencia) {
      return;
    }

    // Actualizar el estado accesible de los botones
    botonesLibros.forEach((otroBoton) => {
      otroBoton.setAttribute(
        "aria-pressed",
        String(otroBoton === boton)
      );
    });

    // Mostrar la recomendación
    document.querySelector("#titulo-lectura").textContent =
      `Sugerencia: ${sugerencia.referencia}`;

    document.querySelector("#texto-lectura").textContent =
      sugerencia.descripcion;

    // Actualizar el enlace para abrir el pasaje
    const enlace = document.querySelector("#enlace-lectura");

    enlace.href =
      "https://www.biblegateway.com/quicksearch/?quicksearch=" +
      encodeURIComponent(sugerencia.referencia);

    enlace.textContent =
      `Leer ${sugerencia.referencia} en línea ↗`;
  });
});
