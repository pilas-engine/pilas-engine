class nave extends Actor {
  propiedades = {
    imagen: "imagenes:nave/nave_reposo"
  };

  velocidad = 5;
  cuadros_desde_el_ultimo_disparo;

  iniciar() {
    this.crear_animaciones();
    this.animacion = "nave_en_reposo";
    this.cuadros_desde_el_ultimo_disparo = 0;
  }

  crear_animaciones() {
    this.crear_animacion("nave_en_reposo", ["imagenes:nave/nave_reposo"], 2);

    this.crear_animacion(
      "nave_avanzando",
      ["imagenes:nave/nave_avanza_1", "imagenes:nave/nave_avanza_2"],
      20
    );

    this.crear_animacion(
      "nave_girando_a_la_izquierda",
      ["imagenes:nave/nave_izquierda_1", "imagenes:nave/nave_izquierda_2"],
      20
    );
    this.crear_animacion(
      "nave_girando_a_la_derecha",
      ["imagenes:nave/nave_derecha_1", "imagenes:nave/nave_derecha_2"],
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
