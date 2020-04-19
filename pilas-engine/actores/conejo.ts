class conejo extends Actor {
  propiedades = {
    x: 0,
    y: 0,
    imagen: "imagenes:conejo/conejo_parado1",

    figura: "rectangulo",
    figura_ancho: 50,
    figura_alto: 100,
    figura_radio: 50,
    figura_sin_rotacion: true,
    figura_dinamica: true,
    figura_rebote: 0,
    sensores: [
      {
        x: 0,
        y: -51,
        ancho: 64,
        alto: 10,
        nombre: "pies"
      }
    ]
  };

  toca_el_suelo = false;
  pies = null;

  iniciar() {
    this.estado = "parado";
    this.pies = this.obtener_sensor("pies");
  }

  actualizar() {
    if (this.pies.colisiones.length > 0) {
      this.toca_el_suelo = true;
    } else {
      this.toca_el_suelo = false;
    }
  }

  parado_iniciar() {
    this.reproducir_animacion("conejo_parado");
  }

  parado_actualizar() {
    if (this.pilas.control.izquierda || this.pilas.control.derecha) {
      this.estado = "camina";
    }

    if (this.pilas.control.arriba && this.toca_el_suelo) {
      this.impulsar(0, 10);
      this.estado = "salta";
    }

    if (!this.toca_el_suelo) {
      this.estado = "salta";
    }
  }

  camina_iniciar() {
    this.reproducir_animacion("conejo_camina");
  }

  camina_actualizar() {
    if (this.pilas.control.izquierda) {
      this.x -= 5;
      this.espejado = true;
    }

    if (this.pilas.control.derecha) {
      this.x += 5;
      this.espejado = false;
    }

    if (!this.pilas.control.derecha && !this.pilas.control.izquierda) {
      this.estado = "parado";
      return;
    }

    if (this.pilas.control.arriba && this.toca_el_suelo) {
      this.impulsar(0, 10);
      this.estado = "salta";
    }

    if (!this.toca_el_suelo) {
      this.estado = "salta";
    }
  }

  salta_iniciar() {
    this.reproducir_animacion("conejo_salta");
  }

  salta_actualizar() {
    if (this.pilas.control.izquierda) {
      this.x -= 5;
    }

    if (this.pilas.control.derecha) {
      this.x += 5;
    }

    if (this.toca_el_suelo) {
      this.estado = "parado";
    }
  }

  cuando_comienza_una_colision(actor) {
    if (actor.etiqueta === "moneda") {
      this.pilas.reproducir_sonido("moneda");
      actor.eliminar();
    }

    if (actor.etiqueta === "plataforma") {
      if (this.velocidad_y > 0.1) {
        return true;
      }
    }
  }

  cuando_se_mantiene_una_colision(actor) {}

  cuando_termina_una_colision(actor) {}
}
