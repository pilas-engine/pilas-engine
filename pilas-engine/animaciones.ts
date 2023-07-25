class Animaciones {
  pilas: Pilas;
  animaciones = {};

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  crear_animacion(nombre: string, cuadros: any[], velocidad: number) {
    let frames = this.crear_frames_de_animacion(cuadros, nombre);

    if (!this.animaciones[nombre]) {
      this.pilas.modo.anims.remove(nombre);
    }

    let animacion = this.pilas.modo.anims.create({
      key: nombre,
      frames: frames,
      frameRate: velocidad,
      repeat: -1
    });

    this.animaciones[nombre] = animacion;
  }

  public reemplazar_todas_las_animaciones(animaciones: any) {

    // borra todas las animaciones.
    for (let animacion in this.animaciones) {
      this.pilas.modo.anims.remove(animacion);
    }

    // limpia el array de animaciones.
    this.animaciones = {};

    // carga todas las animaciones de nuevo.
    for (let i = 0; i < animaciones.length; i++) {
      let animación = animaciones[i];
      let cuadros_de_animacion = animación.cuadros.map(e => e.nombre);
      this.crear_animacion(animación.nombre, cuadros_de_animacion, animación.velocidad);
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
