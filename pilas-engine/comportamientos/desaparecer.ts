/// <reference path="-comportamiento"/>

class ComportamientoDesaparecer extends Comportamiento {
  velocidad: number = 1;

  iniciar(argumentos) {
    if (argumentos) {
      this.velocidad = argumentos.velocidad || 1;
    } else {
      this.velocidad = 1;
    }
  }

  actualizar() {
    this.actor.transparencia += this.velocidad;

    if (this.actor.transparencia >= 100) {
      return true;
    }
  }

  terminar() {}
}
