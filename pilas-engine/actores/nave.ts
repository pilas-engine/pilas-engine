class nave extends Actor {
  velocidad = 5;

  iniciar() {
    this.crear_animacion("nave_en_reposo", ["nave_en_reposo"], 2);
    this.crear_animacion("nave_avanzando", ["nave_avanza_1", "nave_avanza_2"], 20);
    this.crear_animacion("nave_girando_a_la_izquierda", ["nave_izquierda_1", "nave_izquierda_2"], 20);
    this.crear_animacion("nave_girando_a_la_derecha", ["nave_derecha_1", "nave_derecha_2"], 20);

    this.animacion = "nave_en_reposo";
  }

  actualizar() {
    if (this.pilas.control.izquierda) {
      this.rotacion += this.velocidad;
      this.animacion = "nave_girando_a_la_izquierda";
    }

    if (this.pilas.control.derecha) {
      this.rotacion -= this.velocidad;
      this.animacion = "nave_girando_a_la_derecha";
    }

    if (this.pilas.control.arriba) {
      this.avanzar(this.rotacion + 90, this.velocidad);
      this.animacion = "nave_avanzando";
    } else {
      if (!this.pilas.control.izquierda && !this.pilas.control.derecha) {
        this.animacion = "nave_en_reposo";
      }
    }
  }
}
