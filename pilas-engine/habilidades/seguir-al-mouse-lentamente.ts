/// <reference path="-habilidad"/>

class SeguirAlMouseLentamente extends Habilidad {
  iniciar() {}

  actualizar() {
    let destino_x = this.pilas.cursor_x;
    let destino_y = this.pilas.cursor_y;

    this.actor.x += (destino_x - this.actor.x) / 10;
    this.actor.y += (destino_y - this.actor.y) / 10;
  }
}
