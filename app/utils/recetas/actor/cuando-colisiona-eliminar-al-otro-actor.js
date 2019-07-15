export default function recetasActorCuandoColisionaEliminarAlOtroActor() {
  return {
    titulo: "Cuando colisiona eliminar al otro actor",
    icono: "receta_colision",
    para: "actor",
    etiquetas: ["colisión", "toca", "golpea"],
    codigo: `
          // Se invoca si entran en contacto dos actores con figuras dinámicas
          // o uno con figura dinámica y otro con figura no dinámica.
          cuando_comienza_una_colision(otro_actor: Actor) {
            otro_actor.eliminar();
          }
      `
  };
}
