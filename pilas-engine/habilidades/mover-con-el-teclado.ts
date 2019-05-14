/// <reference path="-habilidad"/>

class MoverConElTeclado extends Habilidad {
  iniciar() {}

  actualizar() {
    let velocidad = 5;

    if (this.pilas.control.izquierda) {
      this.actor.x -= velocidad;
    }

    if (this.pilas.control.derecha) {
      this.actor.x += velocidad;
    }

    if (this.pilas.control.arriba) {
      this.actor.y += velocidad;
    }

    if (this.pilas.control.abajo) {
      this.actor.y -= velocidad;
    }
  }
}
