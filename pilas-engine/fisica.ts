class Fisica {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  get Matter() {
    return Phaser.Physics.Matter["Matter"];
  }

  get gravedad_x() {
    return this.pilas.escena.gravedad_x;
  }

  set gravedad_x(v: number) {
    this.pilas.escena.gravedad_x = v;
  }

  get gravedad_y() {
    return this.pilas.escena.gravedad_y;
  }

  set gravedad_y(v: number) {
    this.pilas.escena.gravedad_y = v;
  }
}
