class nave extends Actor {
  propiedades = {
    imagen: "imagenes:nave_reposo.png"
  };

  velocidad = 5;
  cuadros_desde_el_ultimo_disparo;

  iniciar() {
    this.crear_animaciones();
    this.animacion = "nave_en_reposo";
    this.cuadros_desde_el_ultimo_disparo = 0;
  }

  crear_animaciones() {
    this.crear_animacion("nave_en_reposo", ["imagenes:nave_reposo.png"], 2);

    this.crear_animacion(
      "nave_avanzando",
      ["imagenes:nave_avanza_1.png", "imagenes:nave_avanza_2.png"],
      20
    );

    this.crear_animacion(
      "nave_girando_a_la_izquierda",
      ["imagenes:nave_izquierda_1.png", "imagenes:nave_izquierda_2.png"],
      20
    );
    this.crear_animacion(
      "nave_girando_a_la_derecha",
      ["imagenes:nave_derecha_1.png", "imagenes:nave_derecha_2.png"],
      20
    );
  }

  actualizar() {
    this.cuadros_desde_el_ultimo_disparo += 1;

    if (this.pilas.control.izquierda) {
      this.rotacion += this.velocidad;
      this.animacion = "nave_girando_a_la_izquierda";
    }

    if (this.pilas.control.derecha) {
      this.rotacion -= this.velocidad;
      this.animacion = "nave_girando_a_la_derecha";
    }

    if (
      this.pilas.control.espacio &&
      this.cuadros_desde_el_ultimo_disparo > 5
    ) {
      let laser = this.pilas.actores.laser();
      laser.x = this.x;
      laser.y = this.y;
      laser.rotacion = this.rotacion;
      laser.z = this.z + 1;
      this.cuadros_desde_el_ultimo_disparo = 0;
    }

    if (this.pilas.control.arriba) {
      this.avanzar(this.rotacion, this.velocidad);
      this.animacion = "nave_avanzando";
    } else {
      if (!this.pilas.control.izquierda && !this.pilas.control.derecha) {
        this.animacion = "nave_en_reposo";
      }
    }
  }
}
