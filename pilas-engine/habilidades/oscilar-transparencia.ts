/// <reference path="-habilidad"/>

class OscilarTransparencia extends Habilidad {
  contador: number = 0;

  iniciar() {}

  actualizar() {
    this.contador++;
    this.actor.transparencia = 50 + Math.cos(this.contador / 10.0) * 50;
  }
}
