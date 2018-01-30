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

  get izquierda() {
    return this.teclaIzquierda.isDown;
  }

  set izquierda(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }

  get derecha() {
    return this.teclaDerecha.isDown;
  }

  set derecha(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }

  get arriba() {
    return this.teclaArriba.isDown;
  }

  set arriba(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }

  get abajo() {
    return this.teclaAbajo.isDown;
  }

  set abajo(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }
}
