/// <reference path="-habilidad"/>

class Arrastrable extends Habilidad {
  iniciar() {
    let input = this.pilas.modo.input;
    let valor_inicial_dinamico = this.actor.dinamico;

    this.actor.sprite.setInteractive();

    input.setDraggable(this.actor.sprite);

    input.on("dragstart", (_, objeto, x, y) => {
      this.actor.dinamico = false;
    });

    input.on("drag", (_, objeto, x, y) => {
      objeto.x = x;
      objeto.y = y;
    });

    input.on("dragend", () => {
      this.actor.dinamico = valor_inicial_dinamico;
    });
  }

  actualizar() {}
}
