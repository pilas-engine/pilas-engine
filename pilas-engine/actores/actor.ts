class Actor {
  tipo: String;
  sprite: Phaser.Sprite;

  constructor(game, x, y, imagen) {
    this.sprite = new Phaser.Sprite(game, x, y, imagen);

    this.sprite.update = () => {
      this.actualizar();
    };
  }

  iniciar() {
    console.log("iniciando ...");
  }

  serializar() {
    return {
      tipo: this.tipo,
      x: this.sprite.x,
      y: this.sprite.y,
      centro_x: this.sprite.anchor.x,
      centro_y: this.sprite.anchor.y,
      imagen: this.sprite.key,
      rotacion: this.sprite.angle
    };
  }

  actualizar() {
    this.sprite.x += 1;
  }
}
