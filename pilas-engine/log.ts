/**
 * Permite emitir mensajes internos del motor en consola.
 *
 * El objetivo de este objeto es que los desarrolladores de un videojuego
 * puedan ver paso a paso todo lo que ocurre dentro del motor, por ejemplo
 * las señales que se emiten y los cambios en el arbol de entidades.
 *
 * Por omisión este objeto está deshabilitado, pero se puede activar con
 * una llamada así:
 *
 * ```
 * pilas.log.habilitar();
 * ```
 */
class Log {
  pilas: Pilas;
  habilitado: boolean = false;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  info(...args: any[]) {
    
    if (this.habilitado) {
      var args = <any[]>Array.prototype.slice.call(arguments);
      console.info.apply(console, args);
    }

  }

  habilitar() {
    this.habilitado = true;
  }

  deshabilitar() {
    this.habilitado = false;
  }

}
