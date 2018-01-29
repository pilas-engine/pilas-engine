class Camara {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  vibrar(intensidad: number = 1, tiempo: number = 1) {
    this.pilas.game.camera.shake(0.05 * intensidad, 250 * tiempo);
  }

  get x() {
    return this.pilas.game.camera.x;
  }

  set x(x) {
    this.pilas.game.camera.x = x;
  }

  get y() {
    return -this.pilas.game.camera.y;
  }

  set y(y) {
    this.pilas.game.camera.y = -y;
  }
}
