class Escena extends EscenaBase {
  cuadro: number = -1;

  iniciar() {}

  pre_actualizar() {
    this.cuadro += 1;

    if (this.cuadro > 0 && this.cuadro % 60 === 0) {
      let segundos_transcurridos = Math.floor(this.cuadro / 60);
      this.cada_segundo(segundos_transcurridos);
      this.cuando_transcurre_un_segundo(segundos_transcurridos);

      this.actores.map(actor => {
        actor.cada_segundo(segundos_transcurridos);
        actor.cuando_transcurre_un_segundo(segundos_transcurridos);
      });
    }
  }

  obtener_oscilacion(velocidad: number, intensidad: number) {
    return Math.sin(this.cuadro * velocidad * 0.1) * intensidad;
  }
}
