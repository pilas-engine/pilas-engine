class Actor extends Phaser.Sprite {
  tipo: String;

  iniciar() {}

  serializar() {
    return {
      tipo: this.tipo,
      x: this.x,
      y: this.y,
      centro_x: this.anchor.x,
      centro_y: this.anchor.y,
      imagen: this.key,
      rotacion: this.angle
    };
  }

  update() {
    this.actualizar();
  }

  actualizar() {}
}
