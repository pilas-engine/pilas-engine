class Caja extends Actor {
  iniciar() {
    this.sprite.game.physics.p2.enable([this.sprite], true);
    this.sprite.body.static = false;
  }
}
