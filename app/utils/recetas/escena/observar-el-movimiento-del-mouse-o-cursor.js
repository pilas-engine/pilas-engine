export default function recetasEscenaObservarElMovimientoDelMouseOCursor() {
  return {
    titulo: "Observar el movimiento del mouse o cursor",
    icono: "receta_mueve",
    para: "escena",
    etiquetas: ["mouse", "cursor", "mover", "observar"],
    codigo: `
        cuando_mueve(x: number, y: number, evento: any) {
          this.pilas.observar("Posición x", x);
          this.pilas.observar("Posición y", y);
        }
      `
  };
}
