class Sistema {
  requisitos: Array<string> = [];
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.iniciar();
  }

  /**
   * Método virtual.
   */
  iniciar() {
    this.requisitos = [];
  }

  /**
   * Método virtual.
   */
  procesar(entidades: Entidades) {
  }

}
