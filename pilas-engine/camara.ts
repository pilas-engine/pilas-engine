class Camara {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  get camara_principal() {
    return this.pilas.modo.cameras.main;
  }

  vibrar(intensidad: number = 1, tiempo: number = 1) {
    this.camara_principal.shake(250 * tiempo, 0.05 * intensidad);
  }

  get x() {
    return this.camara_principal.scrollX;
  }

  set x(x: number) {
    this.pilas.utilidades.validar_numero(x);
    this.camara_principal.setScroll(x, -this.y);
  }

  get y() {
    return -this.camara_principal.scrollY;
  }

  set y(y: number) {
    this.pilas.utilidades.validar_numero(y);
    this.camara_principal.setScroll(this.x, -y);
  }
}
