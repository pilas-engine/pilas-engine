export default function recetasEscenaCrearCopiasDeUnActorCadaDeterminadoTiempo() {
  return {
    titulo: "Crear copias (o clones) de un actor cada determinado tiempo",
    icono: "receta_tiempo",
    para: "escena",
    etiquetas: ["tiempo", "crear", "contar", "temporizado", "paso", "segundos"],
    codigo: `
          cada_segundo(segundos) {
              // Crea un clon del actor nombre "actor" cada 5 segundos
              if (this.pilas.es_multiplo(segundos, 5)) {
                  this.pilas.clonar("actor");
              }
          }
      `
  };
}
