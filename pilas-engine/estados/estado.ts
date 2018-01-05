class Estado extends Phaser.State {
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
        let x = Math.round(sprite.x);
        let y = Math.round(sprite.y);

        //debug.spriteBounds(sprite, "white", false);
        debug.text(`(${x}, ${y})`, x + 5, y + 15, "white");

        dibujarPuntoDeControl(debug, sprite.x, sprite.y);
      }
    });
  }

  actualizarPosicionDeFormaExterna(pos: any) {}
}
