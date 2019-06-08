/// <reference path="-habilidad"/>

class OscilarRotacion extends Habilidad {
  contador: number = 0;

  iniciar() {}

  actualizar() {
    this.contador++;
    this.actor.rotacion += Math.cos(this.contador / 20.0) / 2;
  }
}
