class Escenas {
  pilas: Pilas;
  escena_actual: Escena = null;

  constructor(pilas) {
    this.pilas = pilas;
  }

  Normal() {
    this.escena_actual = new Normal(this.pilas);
    return this.escena_actual;
  }
}
