class Escena extends EscenaBase {
  cuadro: number = 0;

  iniciar() {}

  pre_actualizar() {
    this.cuadro += 1;

    if (this.cuadro % 60 === 0) {
      let segundos_transcurridos = Math.floor(this.cuadro / 60);
      this.cada_segundo(segundos_transcurridos);

      this.actores.map(actor => {
        actor.cada_segundo(segundos_transcurridos);
      });
    }
  }

  obtener_oscilacion(velocidad, intensidad) {
    return Math.sin(this.cuadro * velocidad * 0.1) * intensidad;
  }
}
