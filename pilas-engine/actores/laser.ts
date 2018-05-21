class laser extends Actor {
  propiedades = {
    imagen: "laser"
  };

  velocidad;

  iniciar() {
    this.centro_x = 0.3;
    this.velocidad = 10;
    this.pilas.reproducir_sonido("laser");
  }

  actualizar() {
    this.avanzar(this.rotacion, this.velocidad);

    // TODO: reemplazar por un chequeo tipo fuera_de_pantalla = true
    if (this.x > 400 || this.x < -400 || this.y > 400 || this.y < -400) {
      this.eliminar();
    }
  }
}
