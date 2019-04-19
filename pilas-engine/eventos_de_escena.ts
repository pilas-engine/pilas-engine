class EventosDeEscena {
  pilas: Pilas;
  conexiones: any;

  constructor(pilas) {
    this.pilas = pilas;
    this.conexiones = [];
  }

  conectar(nombre_del_evento: string, funcion) {
    if (nombre_del_evento === "mueve_mouse") {
      let id = this.generar_id(nombre_del_evento);

      this.conexiones.push({
        id,
        nombre_del_evento,
        funcion: funcion
      });

      return id;
    }

    console.log("Debo conectar", nombre_del_evento, funcion);
  }

  desconectar(identificador_del_evento: string) {
    console.log(
      `TODO: Buscar el evento con id: ${identificador_del_evento} y eliminarlo.`
    );
  }

  generar_id(nombre) {
    let id = this.pilas.utilidades.obtener_id_autoincremental();
    return `evento_conectado:${nombre}:${id}`;
  }

  emitir_evento(identificador, datos) {
    this.conexiones.map(c => {
      if (c.nombre_del_evento === identificador) {
        c.funcion(datos);
      }
    });
  }
}
