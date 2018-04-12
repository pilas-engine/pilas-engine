export default function obtener_nombre_sin_repetir(todos_los_nombres, nombre) {
  let nombresQueColisionan = todos_los_nombres.filter(
    nombre => nombre.indexOf(nombre) > -1
  );

  nombre = nombre.replace(/[0-9]/g, "");

  if (nombresQueColisionan.length === 0) {
    return nombre;
  }

  let idPropuesto = 0;
  let nombrePropuesto = null;
  let colisiona = true;

  while (colisiona) {
    idPropuesto += 1;
    nombrePropuesto = nombre + idPropuesto;

    colisiona = nombresQueColisionan.includes(nombrePropuesto);
  }

  return nombrePropuesto;
}
