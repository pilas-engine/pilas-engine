class Control {
  pilas: Pilas;
  teclaIzquierda;
  teclaDerecha;

  izquierda: Boolean;
  derecha: Boolean;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.teclaIzquierda = pilas.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.teclaDerecha = pilas.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  }

  get izquierda(): Boolean {
    return this.teclaIzquierda.isDown;
  }

  get derecha(): Boolean {
    return this.teclaDerecha.isDown;
  }
}
