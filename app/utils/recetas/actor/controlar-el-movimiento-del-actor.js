export default function recetasActorControlarElMovimientoDelActor() {
  return {
    titulo: "Controlar el movimiento del actor",
    icono: "receta_pad",
    para: "actor",
    etiquetas: ["mover"],
    codigo: `
      actualizar() {
        let velocidad = 5;

        if (this.pilas.control.izquierda) {
          this.x -= velocidad;
        }

        if (this.pilas.control.derecha) {
          this.x += velocidad;
        }

        if (this.pilas.control.arriba) {
          this.y += velocidad;
        }

        if (this.pilas.control.abajo) {
          this.y -= velocidad;
        }
      }
    `
  };
}
