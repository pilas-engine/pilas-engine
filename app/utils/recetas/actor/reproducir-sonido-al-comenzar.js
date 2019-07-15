export default function recetasActorReproducirSonidoAlComenzar() {
  return {
    titulo: "Reproducir sonido al comenzar",
    icono: "receta_sonido",
    para: "actor",
    etiquetas: ["sonido"],
    codigo: `
          iniciar() {
            this.pilas.reproducir_sonido("moneda");

            // Otras opciones:

            //this.pilas.reproducir_sonido("laser");
            //this.pilas.reproducir_sonido("salto-largo");
            //this.pilas.reproducir_sonido("salto-corto");
          }
      `
  };
}
