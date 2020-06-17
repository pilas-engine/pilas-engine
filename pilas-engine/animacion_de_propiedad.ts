enum Tipo {
  lineal = "Linear",
  suave = "Cubic",
  elastico = "Elastic",
  rebote = "Bounce",
  desborde = "Back"
}

class AnimacionDePropiedad {
  private timeline: Phaser.Tweens.Timeline;
  private actor: Actor;
  private pilas: Pilas;
  private tipo_de_animacion: Tipo;
  private data: [any?];
  private veces_que_ejecuto: number = 0;
  private veces: number;
  private duración: number;

  constructor(pilas: Pilas, actor: Actor, tipo: Tipo = Tipo.lineal, veces: number, duración: number) {
    this.data = [];
    this.pilas = pilas;
    this.actor = actor;
    this.tipo_de_animacion = tipo;
    this.veces = veces;
    this.duración = duración;

    if (veces < -1 || veces === 0) {
      throw Error(`La cantidad de veces tiene que ser -1 o un número mayor a 0. Se envió el valor ${veces}`);
    }
  }

  private repetir() {
    this.ejecutar();
    return this;
  }

  cuando_finaliza() {}

  explotar() {
    this.funcion(() => {
      let explosion = this.pilas.actores.explosion();
      explosion.x = this.actor.x;
      explosion.y = this.actor.y;
      this.actor.eliminar();
      this.eliminar();
    });

    return this;
  }

  private agregar(datos: any) {
    let duración = datos["duración"];

    if (duración === 0) {
      duración = this.duración;
    }

    datos["duration"] = duración * 1000;
    datos["duración"] = undefined;

    this.data.push(datos);
    return this;
  }

  mover(x: number, y: number, duración: number = 0) {
    return this.agregar({
      x: "+=" + x,
      y: "+=" + y,
      duración
    });
  }

  mover_x(x: number, duración: number = 0) {
    return this.agregar({
      x: "+=" + x,
      duración
    });
  }

  mover_y(y: number, duración: number = 0) {
    return this.agregar({
      y: "+=" + y,
      duración
    });
  }

  mover_hasta(x: number, y: number, duración: number = 0) {
    return this.agregar({
      x: x,
      y: y,
      duración
    });
  }

  mover_x_hasta(x: number, duración: number = 0) {
    return this.agregar({
      x: x,
      duración
    });
  }

  mover_y_hasta(y: number, duración: number = 0) {
    return this.agregar({
      y: y,
      duración
    });
  }

  rotar(angulo: number, duración: number = 0) {
    return this.agregar({
      rotacion: "+=" + angulo,
      duración
    });
  }

  rotar_hasta(angulo: number, duración: number = 0) {
    return this.agregar({
      rotacion: angulo,
      duración
    });
  }

  eliminar() {
    if (this.timeline) {
      this.timeline.destroy();
    }

    this.data = [];
    this.timeline = null;
  }

  private ejecutar() {
    if (this.timeline) {
      this.timeline.destroy();
    }

    this.timeline = this.pilas.modo.tweens.createTimeline();

    this.data.map(d => {
      let item = JSON.parse(JSON.stringify(d));
      item.targets = this.actor;
      item.ease = this.tipo_de_animacion;

      if (d.onStart) {
        item.onStart = d.onStart;
      }

      this.timeline.add(item);
    });

    this.timeline.on("complete", () => {
      this.veces_que_ejecuto += 1;

      if (this.veces_que_ejecuto == this.veces) {
        this.cuando_finaliza();
      } else {
        this.repetir();
      }
    });

    this.timeline.play();
    return this;
  }

  funcion(funcion_a_ejecutar: any) {
    let animacion = this;
    return this.agregar({
      demo: 0,
      duración: 0.001,
      onStart: function() {
        try {
          funcion_a_ejecutar.call(this);
        } catch (e) {
          animacion.pilas.mensajes.emitir_excepcion_al_editor(e, "animación de propiedad");
        }
      }
    });
  }

  decir(mensaje: string) {
    this.funcion(() => {
      this.actor.decir(mensaje);
    });

    return this;
  }

  esperar(duración: number) {
    return this.agregar({
      demo: 0,
      duración
    });
  }

  escalar_x(escala: number, duración: number = 0) {
    return this.agregar({
      escala_x: "+=" + escala,
      duración
    });
  }

  escalar_y(escala: number, duración: number = 0) {
    return this.agregar({
      escala_y: "+=" + escala,
      duración
    });
  }

  escalar(escala: number, duración: number = 0) {
    return this.agregar({
      escala: "+=" + escala,
      duración
    });
  }

  escalar_x_hasta(escala: number, duración: number = 0) {
    return this.agregar({
      escala_x: escala,
      duración
    });
  }

  escalar_y_hasta(escala: number, duración: number = 0) {
    return this.agregar({
      escala_y: escala,
      duración
    });
  }

  escalar_hasta(escala: number, duración: number = 0) {
    return this.agregar({
      escala: escala,
      duración
    });
  }

  transparencia_hasta(valor: number, duración: number = 0) {
    return this.agregar({
      transparencia: valor,
      duración
    });
  }

  ocultar(duración: number = 0) {
    return this.transparencia_hasta(100, duración);
  }

  mostrar(duración: number = 0) {
    return this.transparencia_hasta(0, duración);
  }
}
