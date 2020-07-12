class GamePad {
  gamepad: Phaser.input.GamePad;
  indice: number;
  umbral: number;

  constructor(gamepad, indice) {
    this.gamepad = gamepad;
    this.indice = indice;
    this.umbral = 0.3;
  }

  get control_interno() {
    return this.gamepad.gamepads[this.indice];
  }

  get analogico_izquierdo_x() {
    return this.obtener_stick("izquierdo").x;
  }

  get analogico_izquierdo_y() {
    return this.obtener_stick("izquierdo").y;
  }

  get analogico_derecho_x() {
    return this.obtener_stick("derecho").x;
  }

  get analogico_derecho_y() {
    return this.obtener_stick("derecho").y;
  }

  get izquierda() {
    return this.obtener_stick("izquierdo").x < -this.umbral;
  }

  get derecha() {
    return this.obtener_stick("izquierdo").x > this.umbral;
  }

  get arriba() {
    return this.obtener_stick("izquierdo").y > this.umbral;
  }

  get abajo() {
    return this.obtener_stick("izquierdo").y < -this.umbral;
  }

  get boton_x() {
    return this.obtener_boton(3);
  }

  get boton_y() {
    return this.obtener_boton(2);
  }

  get boton_a() {
    return this.obtener_boton(1);
  }

  get boton_b() {
    return this.obtener_boton(0);
  }

  get boton_lb() {
    return this.obtener_boton(4);
  }

  get boton_rb() {
    return this.obtener_boton(5);
  }

  obtener_boton(indice) {
    let control = this.gamepad.gamepads[this.indice];

    if (control) {
      if (indice < control.getButtonTotal()) {
        return control.getButtonValue(indice) !== 0;
      }
    }

    return false;
  }

  obtener_stick(tipo) {
    let control = this.gamepad.gamepads[this.indice];
    let stick = tipo === "izquierdo" ? "leftStick" : "rightStick";

    if (control && control[stick]) {
      let resultado = control[stick];
      return {
        x: resultado.x,
        y: -resultado.y
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
}

class Control {
  private pilas: Pilas;

  private _izquierda: any;
  private _derecha: any;
  private _arriba: any;
  private _abajo: any;
  private _espacio: any;

  private _simulaciones: any;
  private teclas: any;

  public gamepad_1: GamePad;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.vincular_gamepads();
    this.conectar_teclas();
  }

  terminar() {}

  desvincular_gamepad_del_control_principal() {}

  vincular_gamepads() {
    this.pilas.modo.input.gamepad.start();
    this.gamepad_1 = new GamePad(this.pilas.modo.input.gamepad, 0);
  }

  obtener_cantidad_de_gamepads_conectados() {
    return this.pilas.modo.input.gamepad.gamepads.length;
  }

  private conectar_teclas() {
    let keyboard = this.pilas.modo.input.keyboard;

    this.teclas = keyboard.addKeys("LEFT,RIGHT,UP,DOWN,SPACE,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,SEMICOLON");

    this._simulaciones = {
      izquierda: false,
      derecha: false,
      arriba: false,
      abajo: false,
      espacio: false
    };
  }

  private se_pulsa_tecla(nombre, simulacion = undefined) {
    if (simulacion) {
      return this.teclas[nombre].isDown || this._simulaciones[simulacion];
    } else {
      return this.teclas[nombre].isDown;
    }
  }

  get arriba(): boolean {
    return this.se_pulsa_tecla("UP", "arriba") || this.gamepad_1.arriba;
  }

  get abajo(): boolean {
    return this.se_pulsa_tecla("DOWN", "abajo") || this.gamepad_1.abajo;
  }

  get izquierda(): boolean {
    return this.se_pulsa_tecla("LEFT", "izquierda") || this.gamepad_1.izquierda;
  }

  get derecha(): boolean {
    return this.se_pulsa_tecla("RIGHT", "derecha") || this.gamepad_1.derecha;
  }

  get espacio(): boolean {
    return this.se_pulsa_tecla("SPACE", "espacio") || this.gamepad_1.boton_x;
  }

  get tecla_a() {
    return this.se_pulsa_tecla("A");
  }

  get tecla_b() {
    return this.se_pulsa_tecla("B");
  }

  get tecla_c() {
    return this.se_pulsa_tecla("C");
  }

  get tecla_d() {
    return this.se_pulsa_tecla("D");
  }

  get tecla_e() {
    return this.se_pulsa_tecla("E");
  }

  get tecla_f() {
    return this.se_pulsa_tecla("F");
  }

  get tecla_g() {
    return this.se_pulsa_tecla("G");
  }

  get tecla_h() {
    return this.se_pulsa_tecla("H");
  }

  get tecla_i() {
    return this.se_pulsa_tecla("I");
  }

  get tecla_j() {
    return this.se_pulsa_tecla("J");
  }

  get tecla_k() {
    return this.se_pulsa_tecla("K");
  }

  get tecla_l() {
    return this.se_pulsa_tecla("L");
  }

  get tecla_m() {
    return this.se_pulsa_tecla("M");
  }

  get tecla_n() {
    return this.se_pulsa_tecla("N");
  }

  get tecla_ñ() {
    return this.se_pulsa_tecla("SEMICOLON");
  }

  get tecla_o() {
    return this.se_pulsa_tecla("O");
  }

  get tecla_p() {
    return this.se_pulsa_tecla("P");
  }

  get tecla_q() {
    return this.se_pulsa_tecla("Q");
  }

  get tecla_r() {
    return this.se_pulsa_tecla("R");
  }

  get tecla_s() {
    return this.se_pulsa_tecla("S");
  }

  get tecla_t() {
    return this.se_pulsa_tecla("T");
  }

  get tecla_u() {
    return this.se_pulsa_tecla("U");
  }

  get tecla_v() {
    return this.se_pulsa_tecla("V");
  }

  get tecla_w() {
    return this.se_pulsa_tecla("W");
  }

  get tecla_x() {
    return this.se_pulsa_tecla("X");
  }

  get tecla_y() {
    return this.se_pulsa_tecla("Y");
  }

  get tecla_z() {
    return this.se_pulsa_tecla("Z");
  }

  get tecla_1() {
    return this.se_pulsa_tecla("1");
  }

  get tecla_2() {
    return this.se_pulsa_tecla("2");
  }

  get tecla_3() {
    return this.se_pulsa_tecla("3");
  }

  get tecla_4() {
    return this.se_pulsa_tecla("4");
  }

  get tecla_5() {
    return this.se_pulsa_tecla("5");
  }

  get tecla_6() {
    return this.se_pulsa_tecla("6");
  }

  get tecla_7() {
    return this.se_pulsa_tecla("7");
  }

  get tecla_8() {
    return this.se_pulsa_tecla("8");
  }

  get tecla_9() {
    return this.se_pulsa_tecla("9");
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
