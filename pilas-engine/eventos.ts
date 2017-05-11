class Eventos {
  pilas: Pilas;

  _eventos: Array<any> = [];

  cuando_agrega_entidad: Evento;
  cuando_actualiza: Evento;

    /**
     * El evento `cuando_carga` se dispara cuando se termina de realizar
     * la carga inicial de pilas. Se dispara una sola vez, y solo a partir
     * de ese momento se puede comenzar a usar la biblioteca.
     *
     * Ejemplo:
     *
     * ```
     *  pilas.eventos.cuando_carga.conectar(function() {
     *    alert("Terminó de cargar pilas!");
     * });
     * ```
     *
     */
  cuando_carga: Evento;
  cuando_agrega_componente: Evento;
  cuando_vincula_habilidad: Evento;

  cuando_hace_click: Evento;

  /**
   * Inicializa el sistema de eventos.
   * @param pilas  Una referencia a la instancia de pilas-engine.
   */
  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.cuando_carga = new Evento(pilas, 'cuando_carga');

    this.cuando_actualiza = new Evento(pilas, 'cuando_actualiza');
    this.cuando_actualiza.emitir_log = false; // Como es un evento que se emite muy seguido se deshabilita por omisión.

    this.cuando_agrega_entidad = new Evento(pilas, 'cuando_agrega_entidad');
    this.cuando_agrega_componente = new Evento(pilas, 'cuando_agrega_componente');

    this.cuando_vincula_habilidad = new Evento(pilas, 'cuando_vincula_habilidad');
    this.cuando_hace_click = new Evento(pilas, 'cuando_hace_click');


    this.cuando_carga.conectar(() => {
      this._conectar_eventos();
    })

  }

  private _conectar_eventos() {

    this.pilas.game.input.onDown.add((pointer) => {

      this._eventos.push({tipo: 'cuando_hace_click', x: pointer.x, y: pointer.y});

      /*
      this.cuando_hace_click.emitir({
        x: 100,
        y: 100,
        boton: pointer.button + 1
      });
      */
    });

  }


  /**
   * Limpia todos los eventos pendientes.
   *
   * Este método se suele llamar automáticamente por pilas al finalizar
   * una iteración del main loop.
   */
  limpiar() {

    if (this._eventos.length > 0) {
      let cantidad = this._eventos.length;

      if (cantidad === 1) {
        this.pilas.log.info(`Limpiando eventos, se eliminará un solo evento.`);
      } else {
        this.pilas.log.info(`Limpiando eventos, se eliminarán ${cantidad} eventos.`);
      }

    }

    this._eventos = [];
  }

}
