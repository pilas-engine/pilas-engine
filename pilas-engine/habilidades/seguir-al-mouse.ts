/// <reference path="-habilidad"/>

class SeguirAlMouse extends Habilidad {
  iniciar() {}

  actualizar() {
    this.actor.x = this.pilas.cursor_x;
    this.actor.y = this.pilas.cursor_y;
  }
}
