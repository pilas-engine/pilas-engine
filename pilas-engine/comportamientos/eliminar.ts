/// <reference path="-comportamiento"/>

class ComportamientoEliminar extends Comportamiento {
  iniciar() {}

  actualizar() {
    this.actor.eliminar();
    return true;
  }

  terminar() {}
}
