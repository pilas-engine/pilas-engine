class EventosDeEscena {
  pilas: Pilas;
  conexiones: any;
  nombres_de_eventos: string[];

  constructor(pilas) {
    this.pilas = pilas;
    this.conexiones = [];
    this.nombres_de_eventos = [
      "mueve_mouse",
      "click_de_mouse",
      "termina_click"
    ];
  }

  /**
   * Permite conectar un evento a una función de respuesta.
   *
   * Los únicos tipos de eventos permitidos son los que se listan en
   * la variable `nombre_de_eventos`.
   */
  conectar(nombre_del_evento: string, funcion) {
    if (this.nombres_de_eventos.indexOf(nombre_del_evento) === -1) {
      console.warn(`No se puede conectar el evento ${nombre_del_evento}`);
      console.warn("Los eventos que existen son", this.nombres_de_eventos);
      return;
    }

    let id = this.generar_id(nombre_del_evento);

    this.conexiones.push({
      id,
      nombre_del_evento,
      funcion: funcion
    });

    return id;
  }

  /**
   * Desconecta un manejador de evento a partir de su identificador.
   *
   * El identificador de evento tiene que ser el mismo que retornó la
   * función `conectar` cuando se registró el evento.
   */
  desconectar(identificador_del_evento: string) {
    let indice = this.conexiones.findIndex(
      a => a.id === identificador_del_evento
    );

    if (indice > -1) {
      this.conexiones.splice(indice, 1);
    } else {
      console.warn(`No se encontró en evento ${identificador_del_evento}`);
    }
  }

  /**
   * Retorna un identificador único de evento a partir de su nombre.
   */
  private generar_id(nombre: string) {
    let id = this.pilas.utilidades.obtener_id_autoincremental();
    return `evento_conectado:${nombre}:${id}`;
  }

  /**
   * Avisa a todos los manejadores de eventos que se produjo un evento particular.
   */
  emitir_evento(identificador, datos) {
    this.conexiones.map(c => {
      if (c.nombre_del_evento === identificador) {
        c.funcion(datos);
      }
    });
  }
}
