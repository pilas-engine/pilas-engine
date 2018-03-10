/// <reference path="escena.ts"/>

class EscenaEjecucion extends Escena {
  pilas: Pilas;
  fondo: Phaser.GameObjects.TileSprite;

  ancho: number;
  alto: number;

  actores: any;
  graphics: any;
  fps: any;

  preload() {}

  create(datos) {
    this.actores = [];
    this.pilas = datos.pilas;
    this.ancho = datos.proyecto.ancho;
    this.alto = datos.proyecto.alto;
    this.crear_fondo();
  }

  crear_fondo() {
    this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
    this.fondo.depth = -1000;
    this.fondo.setOrigin(0);
  }

  update() {}
}
