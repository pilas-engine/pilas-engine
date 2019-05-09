/// <reference path="-habilidad"/>

class RotarConstantemente extends Habilidad {
  iniciar() {}

  actualizar() {
    this.actor.rotacion += 10;
  }
}
