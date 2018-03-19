class Conejo extends Actor {
  propiedades = {
    x: 0,
    y: 0,
    imagen: "salta",

    figura: "rectangulo",
    figura_ancho: 50,
    figura_alto: 100,
    figura_radio: 50,
    figura_sin_rotacion: true,
    figura_dinamica: true,
    figura_rebote: 0
  };

  toca_el_suelo = false;

  iniciar() {
    this.crear_animacion("conejo_parado", ["conejo_parado1", "conejo_parado2"], 2);
    this.crear_animacion("conejo_camina", ["conejo_camina1", "conejo_camina2"], 20);
    this.crear_animacion("conejo_salta", ["conejo_salta"], 20);
    this.crear_animacion("conejo_muere", ["conejo_muere"], 1);

    this.estado = "parado";
  }

  actualizar() {}

  parado_iniciar() {
    this.reproducir_animacion("conejo_parado");
  }

  parado_actualizar() {
    if (this.pilas.control.izquierda || this.pilas.control.derecha) {
      this.estado = "camina";
    }

    if (this.pilas.control.arriba) {
      if (this.velocidad_y < 1 && this.velocidad_y > -1) {
        this.estado = "salta";
      }
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
    }

    if (this.pilas.control.arriba) {
      if (this.velocidad_y < 1 && this.velocidad_y > -1) {
        this.estado = "salta";
      }
    }
  }

  salta_iniciar() {
    this.reproducir_animacion("conejo_salta");
    this.impulsar(0, 10);
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

  cuando_comienza_una_colision() {
    this.toca_el_suelo = true;
  }

  cuando_se_mantiene_una_colision() {
    this.toca_el_suelo = true;
  }

  cuando_termina_una_colision() {
    this.toca_el_suelo = false;
  }
}
