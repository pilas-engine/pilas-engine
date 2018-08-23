class Control {
  private pilas: Pilas;

  private _izquierda: any;
  private _derecha: any;
  private _arriba: any;
  private _abajo: any;
  private _espacio: any;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.conectar_teclas();
  }

  terminar() {
    this.desconectar_teclas();
  }

  private conectar_teclas() {
    let keyboard = this.pilas.modo.input.keyboard;

    this._izquierda = keyboard.addKey("LEFT");
    this._derecha = keyboard.addKey("RIGHT");
    this._arriba = keyboard.addKey("UP");
    this._abajo = keyboard.addKey("DOWN");
    this._espacio = keyboard.addKey("SPACE");
  }

  private desconectar_teclas() {
    let keyboard = this.pilas.modo.input.keyboard;

    keyboard.removeKey(this.espacio);
    keyboard.removeKey(this._izquierda);
    keyboard.removeKey(this._derecha);
    keyboard.removeKey(this._arriba);
    keyboard.removeKey(this._abajo);
    keyboard.removeKey(this._espacio);
  }

  get izquierda(): boolean {
    return this._izquierda.isDown;
  }

  set izquierda(v) {
    this.pilas.utilidades.acceso_incorrecto("izquierda");
  }

  get derecha(): boolean {
    return this._derecha.isDown;
  }

  set derecha(v) {
    this.pilas.utilidades.acceso_incorrecto("derecha");
  }

  get arriba(): boolean {
    return this._arriba.isDown;
  }

  set arriba(v) {
    this.pilas.utilidades.acceso_incorrecto("arriba");
  }

  get abajo(): boolean {
    return this._abajo.isDown;
  }

  set abajo(v) {
    this.pilas.utilidades.acceso_incorrecto("abajo");
  }

  get espacio(): boolean {
    return this._espacio.isDown;
  }

  set espacio(v) {
    this.pilas.utilidades.acceso_incorrecto("espacio");
  }
}
