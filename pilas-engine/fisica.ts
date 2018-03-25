class Fisica {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  get Matter() {
    return Phaser.Physics.Matter["Matter"];
  }
}
