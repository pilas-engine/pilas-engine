export default function recetasActorDetectaElPasoDelTiempoEnSegundos() {
  return {
    titulo: "Detecta el paso del tiempo en segundos",
    icono: "receta_tiempo",
    para: "actor",
    etiquetas: ["tiempo", "crear", "contar", "temporizado", "paso", "segundos"],
    codigo: `
            cada_segundo(segundos) {
                this.decir("Pasaron " + segundos + " segundos")

                // cada 5 segundos cambia el mensaje
                if (this.pilas.es_multiplo(segundos, 5)) {
                    this.decir("Múltiplo de 5 !!!")
                }
            }
        `
  };
}
