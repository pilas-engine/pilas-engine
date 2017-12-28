class Pelota extends Actor {
  vy;

  iniciar() {
    this.vy = 0;
    this.game.physics.p2.enable([this], true);
    this.body.setCircle(25);
  }

  update() {
    //this.y += this.vy;
    //this.vy += 0.1;
  }
}
