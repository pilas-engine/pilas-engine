class Escenas {
  pilas: Pilas;
  escena_actual: Escena;
  pausa_habilitada: boolean = false;
  mouse: {x: number, y: number};

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.escena_actual = null;
    this.mouse = {x: 0, y: 0};
  }

  normal() {
    if (this.escena_actual) {
      this.escena_actual.terminar();
    }

    this.escena_actual = new EscenaNormal(this.pilas);
    this.escena_actual.iniciar();
  }


  actualizar() {
    if (!this.pausa_habilitada) {
      this.escena_actual.actualizar();
      this.mouse.x = this.pilas.game.input.x;
      this.mouse.y = this.pilas.game.input.y;
    }

  }

  /**
   * Detiene la actualización lógica del motor.
   */
  pausar() {
    if (this.pausa_habilitada) {
      console.warn("El modo pausa ya estába habilitado.");
    }

    this.pausa_habilitada = true;
  }

  /**
   * Reanuda la actualización lógica del motor.
   */
  continuar() {
    if (!this.pausa_habilitada) {
      console.warn("El modo pausa no estába habilitado.");
    }

    this.pausa_habilitada = false;
  }

  /**
   * Permite permutar el estado de pausa y ejecución.
   */
  alternar_pausa() {
    if (this.pausa_habilitada) {
      this.continuar();
    } else {
      this.pausar();
    }

  }
}
