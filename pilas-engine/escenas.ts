class Escenas {
  pilas: Pilas;
  escena_actual: Escena = null;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  Normal() {
    return new Normal(this.pilas);
  }

  vincular(escena: Escena) {
    console.log(escena.name, "ESCENA");
    this[escena.name] = () => {
      this.escena_actual = new escena(this.pilas);
      return this.escena_actual;
    };
  }

  definir_escena_actual(escena: Escena) {
    this.escena_actual = escena;
  }
}
