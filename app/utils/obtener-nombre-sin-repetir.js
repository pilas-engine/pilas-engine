export default function obtenerNombreSinRepetir(nombres, tipo) {
  let nombresQueColisionan = nombres.filter(nombre => nombre.indexOf(tipo) > -1);

  if (nombresQueColisionan.length === 0) {
    return tipo;
  }

  let idPropuesto = 0;
  let nombrePropuesto = null;
  let colisiona = true;

  while (colisiona) {
    idPropuesto += 1;
    nombrePropuesto = tipo + idPropuesto;

    colisiona = nombresQueColisionan.includes(nombrePropuesto);
  }

  return nombrePropuesto;
}
