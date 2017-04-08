class ActorFondo extends Actor {

  protected _crear_sprite_interno(galeria: string, imagen: string) {
    let ancho = this.pilas.opciones.ancho;
    let alto = this.pilas.opciones.alto;

    if (galeria) {
      this._sprite = this.pilas.game.add.tileSprite(0, 0, ancho, alto, galeria, imagen);
    } else {
      this._sprite = this.pilas.game.add.tileSprite(0, 0, ancho, alto, imagen);
    }

    this._sprite.sendToBack();
  }

}
