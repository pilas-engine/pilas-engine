class Fisica {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  get Matter() {
    return Phaser.Physics.Matter["Matter"];
  }
}
