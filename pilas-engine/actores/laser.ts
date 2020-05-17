class laser extends Actor {
  propiedades = {
    imagen: "imagenes:disparos/laser"
  };

  velocidad;

  iniciar() {
    this.centro_x = 0.3;
    this.velocidad = 10;
    this.pilas.reproducir_sonido("laser");
  }

  actualizar() {
    this.avanzar(this.rotacion, this.velocidad);
    this.eliminar_si_sale_de_la_pantalla();
  }

  eliminar_si_sale_de_la_pantalla() {
    let izquierda = this.pilas.camara.borde_izquierdo;
    let derecha = this.pilas.camara.borde_derecho;
    let arriba = this.pilas.camara.borde_arriba;
    let abajo = this.pilas.camara.borde_abajo;

    if (this.x > derecha || this.x < izquierda || this.y > arriba || this.y < abajo) {
      this.eliminar();
    }
  }
}
