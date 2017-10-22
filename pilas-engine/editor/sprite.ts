class Sprite extends Phaser.Sprite {
  rotateSpeed: number;
  shadow: Phaser.Sprite;

  iniciar(entidad) {
    this.image = entidad.imagen;
    this.x = entidad.x;
    this.y = entidad.y;

    this.pivot.x = entidad.centro_x;
    this.pivot.y = entidad.centro_y;

    this.inputEnabled = true;
    this.input.enableDrag();

    this.crear_sombra();

    this.conectar_eventos_arrastrar_y_soltar();
  }

  conectar_eventos_arrastrar_y_soltar() {
    this.events.onDragStart.add(this.activar_sombra, this);
    this.events.onDragStop.add(this.ocultar_sombra, this);
  }

  activar_sombra() {
    this.shadow.alpha = 0.3;
  }

  ocultar_sombra() {
    this.shadow.alpha = 0.0;
  }

  update() {
    this.shadow.image = this.image;
    this.shadow.pivot.x = this.pivot.x;
    this.shadow.pivot.y = this.pivot.y;
    this.shadow.x = this.x + 5;
    this.shadow.y = this.y + 5;
  }

  crear_sombra() {
    this.shadow = this.game.add.sprite(10, 10, this.image);
    this.shadow.tint = 0x000000;
    this.ocultar_sombra();
  }
}
