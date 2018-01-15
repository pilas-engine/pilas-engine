class Control {
  pilas: Pilas;
  teclaIzquierda;
  teclaDerecha;
  teclaArriba;
  teclaAbajo;

  izquierda: Boolean;
  derecha: Boolean;
  arriba: Boolean;
  abajo: Boolean;

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.teclaIzquierda = pilas.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.teclaDerecha = pilas.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.teclaArriba = pilas.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.teclaAbajo = pilas.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  }

  get izquierda(): Boolean {
    return this.teclaIzquierda.isDown;
  }

  get derecha(): Boolean {
    return this.teclaDerecha.isDown;
  }

  get arriba(): Boolean {
    return this.teclaArriba.isDown;
  }

  get abajo(): Boolean {
    return this.teclaAbajo.isDown;
  }
}
