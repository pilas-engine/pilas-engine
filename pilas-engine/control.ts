class Control {
  pilas: Pilas;

  _izquierda;
  _derecha;
  _arriba;
  _abajo;

  constructor(pilas: Pilas) {
    const codigos = Phaser.Input.Keyboard.KeyCodes;
    this.pilas = pilas;

    this._izquierda = pilas.game.input.keyboard.addKey(codigos.LEFT);
    this._derecha = pilas.game.input.keyboard.addKey(codigos.RIGHT);
    this._arriba = pilas.game.input.keyboard.addKey(codigos.UP);
    this._abajo = pilas.game.input.keyboard.addKey(codigos.DOWN);
  }

  get izquierda() {
    return this._izquierda.isDown;
  }

  set izquierda(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }

  get derecha() {
    return this._derecha.isDown;
  }

  set derecha(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }

  get arriba() {
    return this._arriba.isDown;
  }

  set arriba(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }

  get abajo() {
    return this._abajo.isDown;
  }

  set abajo(v) {
    this.pilas.utilidades.acceso_incorrecto(v);
  }
}
