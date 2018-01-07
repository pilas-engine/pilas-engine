class Control {
  pilas: Pilas;
  teclaIzquierda;
  teclaDerecha;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.teclaIzquierda = pilas.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.teclaDerecha = pilas.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  }

  get izquierda() {
    return this.teclaIzquierda.isDown;
  }

  get derecha() {
    return this.teclaDerecha.isDown;
  }
}
