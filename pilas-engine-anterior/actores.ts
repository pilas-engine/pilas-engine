class Actores {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  Caja(x, y) {
    return new Caja(this.pilas, x, y, "caja");
  }

  Aceituna(x: number = 0, y: number = 0) {
    return new Aceituna(this.pilas, x, y);
  }
}
