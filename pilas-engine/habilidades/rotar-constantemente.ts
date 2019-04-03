/// <reference path="-habilidad"/>

class RotarConstantemente extends Habilidad {
  iniciar() {
    console.log("iniciando rotarConstantemente");
  }

  actualizar() {
    this.actor.rotacion += 10;
  }
}
