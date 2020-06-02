export default function recetasActorCuandoColisionaEliminarAlOtroActor() {
  return {
    titulo: "Cuando colisiona explotar",
    icono: "receta_colision",
    para: "actor",
    etiquetas: ["colisión", "toca", "golpea", "explosion"],
    codigo: `
          // Se invoca cuando colisiona con un sensor. Si lo que buscas es hacer
          // que la colisión sea entre figuras no sensores usá la función
          // "cuando_comienza_una_colision".
          cuando_colisiona(actor: Actor) {
            this.eliminar();

            let explosion = this.pilas.actores.explosion();
            explosion.x = this.x;
            explosion.y = this.y;
          }
      `
  };
}
