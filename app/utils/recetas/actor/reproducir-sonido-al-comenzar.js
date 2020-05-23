export default function recetasActorReproducirSonidoAlComenzar() {
  return {
    titulo: "Reproducir sonido al comenzar",
    icono: "receta_sonido",
    para: "actor",
    etiquetas: ["sonido"],
    codigo: `
          iniciar() {
            this.reproducir_sonido("moneda");

            // Otras opciones:

            //this.reproducir_sonido("laser");
            //this.reproducir_sonido("salto-largo");
            //this.reproducir_sonido("salto-corto");
          }
      `
  };
}
