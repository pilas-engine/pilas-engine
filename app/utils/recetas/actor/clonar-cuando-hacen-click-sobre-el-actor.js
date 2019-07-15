export default function recetasActorClonarCuandoHacenClickSobreElActor() {
  return {
    titulo: "Clonar cuando hacen click sobre este actor",
    icono: "receta_clonar",
    para: "actor",
    etiquetas: ["click", "clonar"],
    codigo: `
      cuando_hace_click(x: number, y: number, evento) {
        let clonacion = this.pilas.clonar(this.nombre);

        // Pone al actor clonado en una posición muy similar
        // a la del actor actual (del que se genera la clonación).
        clonacion.x = this.x + 5;
        clonacion.y = this.y;
      }
    `
  };
}
