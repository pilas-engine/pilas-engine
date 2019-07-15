export default function recetasEscenaCrearActoresCadaDeterminadoTiempoEnSegundos() {
  return {
    titulo: "Crear actores cada determinado tiempo en segundos",
    icono: "receta_tiempo",
    para: "escena",
    etiquetas: ["tiempo", "crear", "contar", "temporizado", "paso", "segundos"],
    codigo: `
          cada_segundo(segundos) {
              this.pilas.observar("Segundos transcurridos", segundos);

              // Crea un actor Caja cada 5 segundos.
              if (this.pilas.es_multiplo(segundos, 5)) {
                  this.pilas.actores.caja();
              }

              // Crea un actor Pelota cada 3 segundos.
              if (this.pilas.es_multiplo(segundos, 3)) {
                  this.pilas.actores.pelota()
              }
          }
      `
  };
}
