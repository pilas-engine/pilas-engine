class Camara {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  get camara_principal() {
    return this.pilas.modo.cameras.main;
  }

  vibrar(intensidad: number = 1, tiempo: number = 1) {
    this.pilas.game.camera.shake(0.05 * intensidad, 250 * tiempo);
  }

  get x() {
    return this.camara_principal.x;
  }

  set x(x) {
    this.pilas.utilidades.validar_numero(x);
    this.camara_principal.x = x;
  }

  get y() {
    return -this.camara_principal.y;
  }

  set y(y) {
    this.pilas.utilidades.validar_numero(y);
    this.camara_principal.y = -y;
  }
}
