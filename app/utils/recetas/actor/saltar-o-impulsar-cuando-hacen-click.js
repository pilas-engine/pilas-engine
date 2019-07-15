export default function recetasActorSaltarOImpulsarCuandoHacenClick() {
  return {
    titulo: "Saltar o impulsar cuando hacen click",
    icono: "receta_saltar",
    para: "actor",
    etiquetas: ["fisica", "impulsar", "saltar"],
    codigo: `
          cuando_hace_click(x: number, y: number, evento) {
            this.impulsar(0, 10);
            this.pilas.reproducir_sonido("salto-corto");
          }
      `
  };
}
