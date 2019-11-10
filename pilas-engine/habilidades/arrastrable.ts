/// <reference path="-habilidad"/>

class Arrastrable extends Habilidad {
  valor_inicial_dinamico: any = null;

  iniciar() {
    let input = this.pilas.modo.input;

    this.actor.sprite.setInteractive();
    input.setDraggable(this.actor.sprite);

    input.on("dragstart", this.cuando_comienza_a_arrastrar, this);
    input.on("drag", this.cuando_mueve, this);
    input.on("dragend", this.cuando_suelta, this);
  }

  actualizar() {}

  eliminar() {
    let input = this.pilas.modo.input;
    input.setDraggable(this.actor.sprite, false);

    input.off("dragstart", this.cuando_comienza_a_arrastrar, this);
    input.off("drag", this.cuando_mueve, this);
    input.off("dragend", this.cuando_suelta, this);
  }

  private cuando_comienza_a_arrastrar(_, objeto) {
    if (this.actor !== objeto.actor) {
      return;
    }

    this.valor_inicial_dinamico = objeto.actor.dinamico;
    objeto.actor.dinamico = false;
  }

  private cuando_mueve(_, objeto, x, y) {
    objeto.x = x;
    objeto.y = y;
  }

  private cuando_suelta(_, objeto) {
    if (this.actor !== objeto.actor) {
      return;
    }

    objeto.actor.dinamico = this.valor_inicial_dinamico;
  }
}
