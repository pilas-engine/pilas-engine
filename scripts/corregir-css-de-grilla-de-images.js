"use strict";
var fs = require("fs");
let css = "public/grilla-imagenes.css";

async function main() {
  let contenido = fs.readFileSync(css).toString();
  contenido = contenido.replace(".sprite {", ".sprite-grilla-de-imagenes {");

  fs.writeFileSync(css, contenido);
}

main();
