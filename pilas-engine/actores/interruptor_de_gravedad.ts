class interruptor_de_gravedad extends Actor {
  propiedades = {
    imagen: "imagenes:botones/interruptor-si",
    rotacion: -90,
    z: -100
  };

  actualizar() {}

  cuando_hace_click() {
    this.pilas.fisica.gravedad_y *= -1;

    if (this.imagen == "imagenes:botones/interruptor-no") {
      this.imagen = "imagenes:botones/interruptor-si";
    } else {
      this.imagen = "imagenes:botones/interruptor-no";
    }
  }
}
