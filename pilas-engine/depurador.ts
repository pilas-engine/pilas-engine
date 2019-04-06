class Depurador {
  pilas: Pilas;
  modo_posicion_activado: boolean;
  mostrar_fps: boolean;
  mostrar_fisica: boolean;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.modo_posicion_activado = false;
    this.mostrar_fps = false;
    this.mostrar_fisica = false;
  }

  definir_estados_de_depuracion(datos: any) {
    this.mostrar_fps = datos.fps;
    this.modo_posicion_activado = datos.pos;
    this.mostrar_fisica = datos.fisica;
  }
}
