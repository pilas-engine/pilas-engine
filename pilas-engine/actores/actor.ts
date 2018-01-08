class Actor {
  tipo: String;
  sprite: Phaser.Sprite;
  pilas: Pilas;

  constructor(pilas, x, y, imagen) {
    this.pilas = pilas;
    this.sprite = new Phaser.Sprite(pilas.game, x, y, imagen);

    this.sprite.update = () => {
      try {
        this.actualizar();
      } catch (e) {
        this.pilas.emitir_error_y_detener(e);
      }
    };
  }

  iniciar() {
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
