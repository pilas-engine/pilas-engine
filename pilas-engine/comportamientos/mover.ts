/// <reference path="-comportamiento"/>

class ComportamientoMover extends Comportamiento {
  demora: number = 1;
  destino_x: number = 0;
  destino_y: number = 0;

  dx: number;
  dy: number;

  tiempo: number;

  iniciar(argumentos) {
    if (!argumentos) {
      argumentos = {};
    }

    this.destino_x = argumentos.x || 0;
    this.destino_y = argumentos.y || 0;
    this.demora = argumentos.demora || 1;

    let pixels_x = this.destino_x - this.actor.x;
    let pixels_y = this.destino_y - this.actor.y;

    this.dx = pixels_x / 60 / this.demora;
    this.dy = pixels_y / 60 / this.demora;
    this.tiempo = 0;
  }

  actualizar() {
    this.tiempo += 1;
    this.actor.x += this.dx;
    this.actor.y += this.dy;

    if (this.tiempo >= this.demora * 60) {
      this.actor.x = this.destino_x;
      this.actor.y = this.destino_y;

      return true;
    }
  }

  terminar() {}
}
