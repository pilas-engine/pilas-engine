class Depurador {
  pilas: Pilas;
  modo_posicion_activado: boolean;
  mostrar_fps: boolean;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.modo_posicion_activado = false;
    this.mostrar_fps = true;
  }
}
