/// <reference path="modo.ts"/>

class ModoEjecucionEnPausa extends Modo {
  pilas: Pilas;

  constructor() {
    super({ key: "ModoEjecucionEnPausa" });
  }

  preload() {}

  create(datos) {
    this.pilas = this.scene.manager.getScene("ModoCargador").pilas;
    let ancho = this.pilas._ancho;
    let alto = this.pilas._alto;

    let titulo = this.add.bitmapText(ancho / 2, 200, "color-blanco-con-sombra-medio", "PAUSA");
    let detalle = this.add.bitmapText(ancho / 2, 260, "color-blanco-con-sombra-chico", "Click o SPACE para reanudar");

    titulo.x -= titulo.getTextBounds().local.width / 2;
    detalle.x -= detalle.getTextBounds().local.width / 2;

    this.input.keyboard.once("keydown_W", this.reanudar, this);
    this.input.on("pointerdown", this.reanudar, this);
  }

  update() {}

  reanudar() {
    this.pilas.modo.scene.resume("ModoEjecucion");
    this.game.scene.stop("ModoEjecucionEnPausa");
  }
}
