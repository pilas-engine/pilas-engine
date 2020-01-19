"use strict";
var fs = require("fs");

async function corregir_grilla_de_imagenes() {
  let css = "public/grilla-imagenes.css";
  let contenido = fs.readFileSync(css).toString();
  contenido = contenido.replace(".sprite {", ".sprite-grilla-de-imagenes {");

  fs.writeFileSync(css, contenido);
}

async function corregir_grilla_de_ejemplos() {
  let css = "public/ejemplos.css";
  let contenido = fs.readFileSync(css).toString();
  contenido = contenido.replace(".sprite {", ".sprite-ejemplos {");

  fs.writeFileSync(css, contenido);
}

corregir_grilla_de_imagenes();
corregir_grilla_de_ejemplos();
