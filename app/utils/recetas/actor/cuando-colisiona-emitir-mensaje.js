export default function recetasActorCuandoColisionaEmitirMensaje() {
  return {
    titulo: "Cuando colisiona emitir un mensaje y eliminar si es enemigo",
    icono: "receta_colision",
    para: "actor",
    etiquetas: ["colisión", "toca", "golpea"],
    codigo: `
            // Se invoca si entran en contacto dos actores con figuras dinámicas
            // o uno con figura dinámica y otro con figura no dinámica.
            cuando_comienza_una_colision(otro_actor: Actor) {

              this.decir("He colisionado con actor de etiqueta: " + otro_actor.etiqueta);

              if (otro_actor.etiqueta == "enemigo") {
                this.eliminar();
              }
            }
        `
  };
}
