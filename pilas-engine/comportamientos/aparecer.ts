/// <reference path="-comportamiento"/>

class ComportamientoAparecer extends Comportamiento {
  velocidad: number = 1;

  iniciar(argumentos) {
    if (argumentos) {
      this.velocidad = argumentos.velocidad || 1;
    } else {
      this.velocidad = 1;
    }
  }

  actualizar() {
    this.actor.transparencia -= this.velocidad;

    if (this.actor.transparencia <= 0) {
      return true;
    }
  }

  terminar() {}
}
