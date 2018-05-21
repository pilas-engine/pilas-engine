class Animaciones {
  pilas: Pilas;
  animaciones = {};

  constructor(pilas) {
    this.pilas = pilas;
  }

  crear_animacion(actor, nombre_de_la_animacion, cuadros, velocidad) {
    let nombre = `${actor.id}-${nombre_de_la_animacion}`;

    if (!this.animaciones[nombre]) {
      let frames = cuadros.map(nombre => {
        if (nombre.indexOf(".") > -1) {
          return {
            key: nombre.split(".")[1],
            frame: nombre.split(".")[0]
          };
        } else {
          return { key: nombre };
        }
      });

      let animacion = pilas.modo.anims.create({
        key: nombre.split(".")[0],
        frames: frames,
        frameRate: velocidad,
        repeat: -1
      });

      this.animaciones[nombre] = animacion;
    }
  }
}
