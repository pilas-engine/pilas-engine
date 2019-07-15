export default function recetasEscenaCrearActorEnLaPosicionEnDondeSeHaceClick() {
  return {
    titulo: "Crear un actor en la posición en donde se hace click",
    icono: "receta_click",
    para: "escena",
    etiquetas: ["mouse", "cursor", "crear", "actor", "click"],
    codigo: `
          cuando_hace_click(x: number, y: number, evento) {
            let actor = this.pilas.actores.pelota();
            actor.x = x;
            actor.y = y;
        }
      `
  };
}
