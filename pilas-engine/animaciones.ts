class Animaciones {
  pilas: Pilas;
  animaciones = {};

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  crear_animacion(nombre: string, cuadros: any[], velocidad: number) {
    let frames = this.crear_frames_de_animacion(cuadros, nombre);

    if (!this.animaciones[nombre]) {
      let animacion = this.pilas.modo.anims.create({
        key: nombre,
        frames: frames,
        frameRate: velocidad
        //repeat: -1,
      });

      this.animaciones[nombre] = animacion;
    } else {
      let animacion = this.pilas.modo.anims.get(nombre);

      // limpia todos los cuadros de animación
      let cantidad = animacion.frames.length;
      for (let i = 0; i < cantidad; i++) {
        animacion.removeFrameAt(0);
      }

      animacion.addFrame(frames);
      animacion.msPerFrame = 1000 / velocidad;
    }
  }

  private crear_frames_de_animacion(cuadros: any[], nombre_de_la_animacion: string) {
    let frames = cuadros.map(cuadro => {
      if (this.pilas.imagenes_precargadas.indexOf(cuadro) === -1) {
        let titulo = `No se puede crear la animación "${nombre_de_la_animacion}"`;
        let detalle = `El cuadro ${cuadro} no existe.`;

        throw Error(`${titulo}\n${detalle}`);
      }

      if (cuadro.indexOf(":") > -1) {
        return {
          key: cuadro.split(":")[0],
          frame: cuadro.split(":")[1]
        };
      } else {
        return { key: cuadro };
      }
    });

    return frames;
  }

  existe_animacion(nombre: string) {
    return this.animaciones[nombre] !== undefined;
  }
}
