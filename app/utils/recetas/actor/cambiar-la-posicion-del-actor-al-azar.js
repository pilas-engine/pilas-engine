export default function recetasActorCambiarLaPosicionDelActorAlAzar() {
  return {
    titulo: "Cambiar la posición del actor al azar cuando comienza",
    icono: "receta_azar",
    para: "actor",
    etiquetas: ["azar"],
    codigo: `
          iniciar() {
            this.x = this.pilas.azar(-200, 200);
            this.y = this.pilas.azar(-230, 230);
          }
      `
  };
}
