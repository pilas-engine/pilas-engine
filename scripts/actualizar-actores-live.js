const fs = require("fs");
const util = require("util");
const ruta_a_observar = "public/pilas-engine.js";
const exec = require("child_process").exec;

function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds));
}

function obtener_modificacion() {
  return new Promise(resolve => {
    fs.stat(ruta_a_observar, function(err, stats) {
      var mtime = new Date(util.inspect(stats.mtime));
      resolve(mtime.toString());
    });
  });
}

function actualizar_actores() {
  console.log("Actualizando actores...");
  exec("make actualizar_actores");
}

async function mirar(groups) {
  actualizar_actores();

  console.log(`Comenzando a observar cambios en ${ruta_a_observar}...`);
  console.log(`Si el archivo cambia, se generará nuevamente actores.json`);
  let mtime_anterior = await obtener_modificacion();

  while (true) {
    await wait(3000);
    let mtime = await obtener_modificacion();

    if (mtime != mtime_anterior) {
      mtime_anterior = mtime;
      console.log("Se han detectado cambios...");
      await wait(200);
      actualizar_actores();
    }
  }
}

mirar();
