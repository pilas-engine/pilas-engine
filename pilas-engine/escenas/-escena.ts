class Escena extends EscenaBase {
  cuadro: number = 0;

  iniciar() {}

  actualizar() {
    this.cuadro += 1;

    if (this.cuadro % 60 === 0) {
      this.actores.map(actor => {
        actor.cada_segundo();
      });
    }
  }

  obtener_oscilacion(velocidad, intensidad) {
    return Math.sin(this.cuadro * velocidad * 0.1) * intensidad;
  }
}
