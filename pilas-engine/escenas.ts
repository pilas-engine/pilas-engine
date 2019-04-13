class Escenas {
  pilas: Pilas;
  escena_actual: EscenaBase = null;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  Normal() {
    return new Normal(this.pilas);
  }

  vincular(escena: Escena) {
    this[escena.name] = () => {
      //@ts-ignore
      this.escena_actual = new escena(this.pilas);
      return this.escena_actual;
    };
  }

  definir_escena_actual(escena: EscenaBase) {
    this.escena_actual = escena;
  }
}
