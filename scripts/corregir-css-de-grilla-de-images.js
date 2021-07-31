"use strict";
var fs = require("fs");

async function corregir_grilla(archivo, clase) {
  let contenido = fs.readFileSync(archivo).toString();
  contenido = contenido.replace(".sprite {", clase + " {");

  fs.writeFileSync(archivo, contenido);
}

corregir_grilla("public/iniciar-proyecto.css", ".sprite-iniciar-proyecto");
corregir_grilla("public/ejemplos.css", ".sprite-ejemplos");
corregir_grilla("public/grilla-imagenes.css", ".sprite-grilla-de-imagenes");
