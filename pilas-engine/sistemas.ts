class Sistemas {
  pilas: Pilas;
  sistemas: Array<Sistema> = [];

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.inicializar_sistema(Depurable);
    this.inicializar_sistema(Apariencia);
    this.inicializar_sistema(SistemaHabilidades);
  }

  inicializar_sistema(clase) {
    try {
      this.sistemas.push(new clase(this.pilas));
    } catch(e) {
      let nombre = clase.name;
      console.warn(`No se puede iniciar el sistema ${nombre} a causa de un error, se evitará vincular al motor.`);
      console.error(e);
    }
  }

  procesar_sobre_entidades(entidades: Entidades) {
    this.sistemas.map((sistema) => {
      try {
        sistema.procesar(entidades);
      } catch(e) {
        let nombre = sistema.constructor['name'];
        console.warn(`No se puede procesar el sistema '${nombre}', se eliminará de la lista de sistemas.`);
        console.error(e);
        this.sistemas = this.sistemas.splice(<any>sistema, 1);
      }
    });
  }

}
