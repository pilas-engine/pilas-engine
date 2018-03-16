class Depurador {
  pilas: Pilas;
  modo_posicion_activado: boolean;
  mostrar_fps: boolean;
  mostrar_fisica: boolean;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.modo_posicion_activado = false;
    this.mostrar_fps = true;
    this.mostrar_fisica = true;
  }

  definir_estados_de_depuracion(datos) {
    this.mostrar_fps = datos.fps;
    this.modo_posicion_activado = datos.pos;
    this.mostrar_fisica = datos.fisica;
  }
}
