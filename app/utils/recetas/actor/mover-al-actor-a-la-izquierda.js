export default function recetasActorMoverAlActorALaIzquierda() {
  return {
    titulo: "Mover al actor hacia la izquierda y eliminar si sale de la pantalla",
    icono: "receta_mover_izquierda",
    para: "actor",
    etiquetas: ["mover"],
    codigo: `
        actualizar() {
          let velocidad = 5;
          this.x -= velocidad;

          if (this.x < -250) {
            this.eliminar();
          }
        }
      `
  };
}
