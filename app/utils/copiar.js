export default function copiar(dato) {
  // caso especial: se da cuando se quiere asignar fondo a un
  // actor de texto por primera vez.
  if (dato === undefined) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(dato));
}
