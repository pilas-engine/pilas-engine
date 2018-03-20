class Animaciones {
  pilas: Pilas;
  animaciones = {};

  constructor(pilas) {
    this.pilas = pilas;
  }

  crear_o_sustituir(nombre, cuadros, velocidad) {
    if (!this.animaciones[nombre]) {
      let frames = cuadros.map(nombre => {
        return { key: nombre };
      });

      let animacion = pilas.modo.anims.create({
        key: nombre,
        frames: frames,
        frameRate: velocidad,
        repeat: -1
      });

      this.animaciones[nombre] = animacion;
    }
  }
}
