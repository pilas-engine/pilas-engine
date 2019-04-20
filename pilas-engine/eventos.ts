class Eventos {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  conectar(nombre_del_evento: string, funcion) {
    return this.pilas.escena.eventos.conectar(nombre_del_evento, funcion);
  }

  desconectar(identificador_del_evento: string) {
    return this.pilas.escena.eventos.desconectar(identificador_del_evento);
  }

  /**
   * Lo invoca pilas de forma interna, aunque también se puede llamar
   * desde tests para simular un evento externo.
   */
  emitir_evento(identificador, datos) {
    return this.pilas.escena.eventos.emitir_evento(identificador, datos);
  }
}
