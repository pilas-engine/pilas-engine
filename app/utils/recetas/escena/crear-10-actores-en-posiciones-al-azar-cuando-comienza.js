export default function recetasEscenaCrear10ActoresEnPosicionesAlAzarCuandoComienza() {
  return {
    titulo: "Crear 10 actores en posiciones al azar cuando comienza",
    icono: "receta_azar",
    para: "escena",
    etiquetas: ["azar", "crear"],
    codigo: `
        iniciar() {
          for (i=0; i<10; i++) {
            let actor: Actor = this.pilas.actores.aceituna();
            actor.x = this.pilas.azar(-200, 200);
            actor.y = this.pilas.azar(-230, 230);
          }
        }
    `
  };
}
