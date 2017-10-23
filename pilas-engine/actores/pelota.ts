class Pelota extends Actor {
  vy;

  iniciar() {
    this.vy = 0;
  }
  update() {
    this.y += this.vy;
    this.vy += 0.1;
  }
}
