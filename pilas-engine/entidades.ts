class Entidades {
  entidades: Array<any> = [];
  pilas: Pilas;

  /**
   * Construye el subsistema de entidades.
   */
  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  /**
   * Permite crear una entidad y agregarla al arbol de entidades del escenario.
   *
   * Esta función generará la entidad y retornará el identificador asignado
   * para la entidad.
   */
  crear_entidad(nombre: string) {
    let id = this.generarID();
    let datos = {
      id: id,
      nombre: nombre,
      componentes: {
      }
    };

    this.entidades.push(datos);

    this.pilas.eventos.cuando_agrega_entidad.emitir(datos);

    return id;
  }


  /**
   * Retorna una lista con todas las entidades instanciadas.
   */
  obtener_entidades() {
    return this.entidades;
  }

  /**
   * Genera un identificador interno único para cada entidad.
   */
  private generarID() {
    return this.entidades.length + 1;
  }

  /**
   * Dada una lista de componentes, como ['posicion', 'apariencia'], retornará
   * una lista de todas las entidades que cumplan con esos requisitos.
   *
   * Esto nos permite asegurar que una habilidad diseñada para ciertas
   * entidades no trabaje sobre otro tipo de entidades.
   */
  obtener_entidades_con(componentes: Array<string>) {

    return this.entidades.filter((e) => {

      /* Genera una lista con el cumplimiento de
       * componentes.
       * Algo como [true, true, false] por ejemplo. */
      let lista_de_cumplimientos_de_requisito = componentes.map(requisito => {
        return e.componentes.hasOwnProperty(requisito);
      });

      /**
       * Para saber si una entidad cumple con todos los requisitos, todos los
       * valores tienen que ser true o la lista debería estar vacía.
       */
      return (lista_de_cumplimientos_de_requisito.indexOf(false) === -1);

    });
  }
}
