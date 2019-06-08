/// <reference path="-habilidad"/>

class OscilarVerticalmente extends Habilidad {
  contador: number = 0;

  iniciar() {}

  actualizar() {
    this.contador++;
    this.actor.y += Math.sin(this.contador / 20.0) / 4.0;
  }
}
