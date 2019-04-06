/// <reference path="-habilidad"/>

class Arrastrable extends Habilidad {
  iniciar() {
    let input = this.pilas.modo.input;
    this.actor.sprite.setInteractive();

    input.setDraggable(this.actor.sprite);

    input.on("drag", function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
  }

  actualizar() {}
}
