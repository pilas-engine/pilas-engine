class Control {
  pilas: Pilas;

  teclaIzquierda;
  teclaDerecha;
  teclaArriba;
  teclaAbajo;

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.teclaIzquierda = pilas.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.teclaDerecha = pilas.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.teclaArriba = pilas.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.teclaAbajo = pilas.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  }

  get izquierda(): boolean {
    return this.teclaIzquierda.isDown;
  }

  get derecha(): boolean {
    return this.teclaDerecha.isDown;
  }

  get arriba(): boolean {
    return this.teclaArriba.isDown;
  }

  get abajo(): boolean {
    return this.teclaAbajo.isDown;
  }
}
