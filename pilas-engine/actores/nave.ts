class nave extends Actor {
  propiedades = {
    imagen: "nave_en_reposo"
  };

  velocidad = 5;
  cuadros_desde_el_ultimo_disparo;

  iniciar() {
    this.crear_animacion("nave_en_reposo", ["nave_en_reposo"], 2);
    this.crear_animacion("nave_avanzando", ["nave_avanza_1", "nave_avanza_2"], 20);
    this.crear_animacion("nave_girando_a_la_izquierda", ["nave_izquierda_1", "nave_izquierda_2"], 20);
    this.crear_animacion("nave_girando_a_la_derecha", ["nave_derecha_1", "nave_derecha_2"], 20);

    this.animacion = "nave_en_reposo";
    this.cuadros_desde_el_ultimo_disparo = 0;
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

    if (this.pilas.control.espacio && this.cuadros_desde_el_ultimo_disparo > 5) {
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
