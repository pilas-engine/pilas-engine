class Escena extends EscenaBase {
  cuadro: number = 0;

  iniciar() {}

  actualizar() {
    this.cuadro += 1;
  }

  obtener_oscilacion(velocidad, intensidad) {
    return Math.sin(this.cuadro * velocidad * 0.1) * intensidad;
  }
}
