class Nave extends Actor {
  velocidad = 5;

  iniciar() {
    this.imagen = "nave";
    this.pilas.reproducir_sonido("moneda");
  }

  actualizar() {
    if (this.pilas.control.izquierda) {
      this.rotacion += this.velocidad;
    }

    if (this.pilas.control.derecha) {
      this.rotacion -= this.velocidad;
    }

    if (this.pilas.control.arriba) {
      this.avanzar(this.rotacion + 90, this.velocidad);
    }
  }
}
