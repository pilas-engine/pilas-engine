/// <reference path="-habilidad"/>

class Arrastrable extends Habilidad {
  iniciar() {
    let input = this.pilas.modo.input;
    let valor_inicial_dinamico = null;

    this.actor.sprite.setInteractive();

    input.setDraggable(this.actor.sprite);

    input.on("dragstart", (_, objeto) => {
      if (this.actor !== objeto.actor) {
        return;
      }

      valor_inicial_dinamico = objeto.actor.dinamico;
      objeto.actor.dinamico = false;
    });

    input.on("drag", (_, objeto, x, y) => {
      objeto.x = x;
      objeto.y = y;
    });

    input.on("dragend", (_, objeto) => {
      if (this.actor !== objeto.actor) {
        return;
      }

      objeto.actor.dinamico = valor_inicial_dinamico;
    });
  }

  actualizar() {}
}
