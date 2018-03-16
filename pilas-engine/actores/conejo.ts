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

  iniciar() {
    this.crear_animacion("camina", ["camina1", "camina2"], 20);
    this.reproducir_animacion("camina");
  }

  actualizar() {
    if (this.pilas.control.izquierda) {
      this.x -= 5;
      this.espejado = true;
    }

    if (this.pilas.control.derecha) {
      this.x += 5;
      this.espejado = false;
    }

    if (this.pilas.control.arriba) {
      if (this.velocidad_y < 1 && this.velocidad_y > -1) {
        this.impulsar(0, 10);
      }
    }
  }
}
