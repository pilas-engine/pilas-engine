class Animaciones {
  pilas: Pilas;
  animaciones = {};

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  crear_animacion(actor: Actor, nombre_de_la_animacion: string, cuadros: any[], velocidad: number) {
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
