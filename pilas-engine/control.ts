class Control {
  private pilas: Pilas;

  private _izquierda: any;
  private _derecha: any;
  private _arriba: any;
  private _abajo: any;
  private _espacio: any;

  private _simulaciones: any;

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

    this._simulaciones = {
      izquierda: false,
      derecha: false,
      arriba: false,
      abajo: false,
      espacio: false
    };
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
    return this._izquierda.isDown || this._simulaciones["izquierda"];
  }

  set izquierda(v) {
    this.pilas.utilidades.acceso_incorrecto("izquierda");
  }

  get derecha(): boolean {
    return this._derecha.isDown || this._simulaciones["derecha"];
  }

  set derecha(v) {
    this.pilas.utilidades.acceso_incorrecto("derecha");
  }

  get arriba(): boolean {
    return this._arriba.isDown || this._simulaciones["arriba"];
  }

  set arriba(v) {
    this.pilas.utilidades.acceso_incorrecto("arriba");
  }

  get abajo(): boolean {
    return this._abajo.isDown || this._simulaciones["abajo"];
  }

  set abajo(v) {
    this.pilas.utilidades.acceso_incorrecto("abajo");
  }

  get espacio(): boolean {
    return this._espacio.isDown || this._simulaciones["espacio"];
  }

  set espacio(v) {
    this.pilas.utilidades.acceso_incorrecto("espacio");
  }

  /**
   * Permite simular la pulsación de una tecla como si lo hiciera el usuario.
   *
   * Esta función es útil para generar eventos de teclado desde una pantalla
   * touch o simulación de juego.
   *
   * Por ejemplo, si se quiere simular que el usuario pulsa la tecla arriba
   * durante medio segundo y luego se suelta se puede hacer algo así:
   *
   * ```
   * this.pilas.control.simular_pulsacion('arriba', true);
   *
   * this.pilas.luego(0.5, () => {
   *    this.pilas.control.simular_pulsacion('arriba', false);
   * });
   * ```
   */
  simular_pulsacion(nombre: string, pulsacion: boolean) {
    if (this._simulaciones[nombre] === undefined) {
      throw Error(`No se puede simular la tecla ${nombre}`);
    }

    this._simulaciones[nombre] = pulsacion;
  }
}
