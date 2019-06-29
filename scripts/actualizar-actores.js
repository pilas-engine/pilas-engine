"use strict";
var fs = require("fs");
var path = require("path");
const src = "./pilas-engine/actores/";

fs.readdir(src, (err, files) => {
  let actores = [];

  console.log(`Obteniendo ${files.length} archivos de actores.`);

  files.forEach(file => {
    let contenido = fs.readFileSync(path.join(src, file), "utf8");
    let archivo = file;
    let nombre = path.basename(file, ".ts");

    actores.push({
      nombre: nombre,
      codigo: contenido,
      archivo: file
    });
  });

  fs.writeFile("public/actores.json", JSON.stringify({ actores: actores }, null, 2), err => {
    if (err) {
      throw err;
    }

    console.log("Generando el archivo public/actores.json");
  });
});
