class Actores {
  pilas: Pilas;

  // Metodos que se generan en tiempo de ejecución.
  Actor: any;
  Nave: any;
  Patito: any;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this._vincular_métodos_de_creación();
  }

  protected _vincular_métodos_de_creación() {
    this.vincular(Actor);
    this.vincular(Nave);
    this.vincular(Patito);
  }

  eliminar_actor(actor: Actor) {
    this.pilas.escena_actual.eliminar_actor(actor);
  }

  /**
   * Permite vincular una clase para generar un actor personalizado.
   *
   * El actor puede ser cualquier tipo de clase, pero tiene que tener
   * definida una función llamada "iniciar" que espere un argumento opciones
   * (tipo diccionario).
   */
  vincular(clase: any) {

    if (!clase || !clase.name) {
      throw Error("Solo se admiten clases como parámetro.");
    }

    // Genera el método que servirá para instaciar la
    // clase del actor, agregarlo a la escena e inicializarlo
    // con el estado inicial.
    this[clase.name] = (opciones: any) => {

      let nuevo = new clase(this.pilas);
      this.pilas.escena_actual.agregar_actor(nuevo);

      nuevo.iniciar(opciones);

      nuevo.pre_actualizar();
      nuevo.actualizar();
      nuevo.post_actualizar();

      return nuevo;
    };


    // Si el nombre de la clase es camelcase, también permite
    // crear el actor usando solamente minúsculas.
    if (clase.name !== clase.name.toLocaleLowerCase()) {
      this[clase.name.toLocaleLowerCase()] = this[clase.name];
    }

  }

}
