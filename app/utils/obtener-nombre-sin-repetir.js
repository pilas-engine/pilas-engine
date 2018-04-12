export default function obtener_nombre_sin_repetir(todos_los_nombres, nombre) {
  let nombres_que_podrian_colisionar = todos_los_nombres.filter(
    nombre => nombre.indexOf(nombre) > -1
  );

  nombre = nombre.replace(/[0-9]/g, "");

  if (nombres_que_podrian_colisionar.length === 0) {
    return nombre;
  }

  colisiona = nombres_que_podrian_colisionar.includes(nombre);

  if (!colisiona) {
    return nombre;
  }

  let idPropuesto = 0;
  let nombrePropuesto = null;
  let colisiona = true;

  while (colisiona) {
    idPropuesto += 1;
    nombrePropuesto = nombre + idPropuesto;

    colisiona = nombres_que_podrian_colisionar.includes(nombrePropuesto);
  }

  return nombrePropuesto;
}
