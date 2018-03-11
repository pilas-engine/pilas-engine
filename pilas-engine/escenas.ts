class Escenas {
  pilas: Pilas;
  escena_actual: Escena = null;

  constructor(pilas) {
    this.pilas = pilas;
  }

  Normal() {
    return new Normal(this.pilas);
  }

  vincular(escena) {
    this[escena.name] = () => {
      this.escena_actual = new escena(this.pilas);
      return this.escena_actual;
    };
  }

  definir_escena_actual(escena) {
    this.escena_actual = escena;
  }
}
