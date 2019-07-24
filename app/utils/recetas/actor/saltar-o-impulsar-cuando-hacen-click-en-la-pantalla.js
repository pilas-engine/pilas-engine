export default function recetasActorSaltarOImpulsarCuandoHacenClickEnLaPantalla() {
  return {
    titulo: "Saltar o impulsar cuando hacen click en la pantalla",
    icono: "receta_saltar",
    para: "actor",
    etiquetas: ["fisica", "impulsar", "saltar"],
    codigo: `
          cuando_hace_click_en_la_pantalla(x: number, y: number, evento) {
            this.impulsar(0, 10);
            this.pilas.reproducir_sonido("salto-corto");
          }
      `
  };
}
