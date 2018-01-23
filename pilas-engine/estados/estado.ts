class Estado extends Phaser.State {
  pilas: Pilas;
  historia: any;
  canvas: any;

  render() {
    var debug = this.game.debug;

    function dibujarPuntoDeControl(debug, x, y) {
      let rect = new Phaser.Rectangle(x - 3, y - 3, 7, 7);
      let line1 = new Phaser.Line(x - 2, y - 2, x + 2, y + 2);
      let line2 = new Phaser.Line(x - 2, y + 2, x + 2, y - 2);

      debug.geom(rect, "black", true);
      debug.geom(line1, "white", false);
      debug.geom(line2, "white", false);
    }

    this.game.world.children.forEach(sprite => {
      if (sprite["depurable"]) {
        let _x = Math.round(sprite.x);
        let _y = Math.round(sprite.y);
        let { x, y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(_x, _y);

        //debug.spriteBounds(sprite, "white", false);
        debug.text(`(${x}, ${y})`, _x + 5, _y + 15, "white");

        dibujarPuntoDeControl(debug, sprite.x, sprite.y);
      }
    });
  }

  create() {
    this.canvas = this.game.add.graphics(0, 0);
  }

  obtener_sprites() {
    return this.sprites;
  }

  actualizarPosicionDeFormaExterna(pos: any) {}

  dibujarLineaDeCoordenadasRecorridas() {
    this.canvas.clear();
    this.canvas.beginFill(0xffffff, 1);

    this.historia.map(historia => {
      historia.map(entidad => {
        let { x, y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);
        this.canvas.drawRect(x, y, 2, 2);
      });
    });
  }
}
