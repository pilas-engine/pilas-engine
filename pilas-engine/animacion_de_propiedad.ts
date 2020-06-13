enum Tipo {
  lineal = "Linear",
  suave = "Cubic",
  elastico = "Elastic",
  rebote = "Bounce",
  desborde = "Back"
}

class AnimacionDePropiedad {
  timeline: Phaser.Tweens.Timeline;
  actor: Actor;
  pilas: Pilas;
  tipo_de_animacion: Tipo;
  data: [any?];
  veces_que_ejecuto: number = 0;
  repeticiones: number;

  constructor(pilas: Pilas, actor: Actor, tipo: Tipo = Tipo.lineal, repeticiones: number) {
    this.data = [];
    this.pilas = pilas;
    this.actor = actor;
    this.tipo_de_animacion = tipo;
    this.repeticiones = repeticiones;

    if (repeticiones < -1 || repeticiones === 0) {
      throw Error(`La cantidad de repeticiones tiene que ser -1 o un número mayor a 0. Se envió el valor ${repeticiones}`);
    }
  }

  repetir() {
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

  mover(x: number, y: number, segundos: number = 1) {
    this.data.push({
      x: "+=" + x,
      y: "+=" + y,
      duration: segundos * 1000
    });

    return this;
  }

  mover_hasta(x: number, y: number, segundos: number = 1) {
    this.data.push({
      x: x,
      y: y,
      duration: segundos * 1000
    });

    return this;
  }

  rotar(angulo: number, segundos: number = 1) {
    this.data.push({
      rotacion: "+=" + angulo,
      duration: segundos * 1000
    });

    return this;
  }

  rotar_hasta(angulo: number, segundos: number = 1) {
    this.data.push({
      rotacion: angulo,
      duration: segundos * 1000
    });

    return this;
  }

  eliminar() {
    if (this.timeline) {
      this.timeline.destroy();
    }

    this.data = [];

    this.timeline = null;
  }

  ejecutar() {
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

      if (this.veces_que_ejecuto == this.repeticiones) {
        this.cuando_finaliza();
      } else {
        this.repetir();
      }
    });

    this.timeline.play();
    return this;
  }

  funcion(funcion_a_ejecutar: any) {
    this.data.push({
      demo: 0,
      duration: 1,
      onStart: function() {
        funcion_a_ejecutar.call(this);
      }
    });

    return this;
  }

  decir(mensaje) {
    this.funcion(() => {
      this.actor.decir(mensaje);
    });

    return this;
  }

  esperar(segundos: number) {
    this.data.push({
      demo: 0,
      duration: segundos * 1000
    });

    return this;
  }

  escalar_x(escala: number, segundos: number = 1) {
    this.data.push({
      escala_x: escala,
      duration: segundos * 1000
    });

    return this;
  }

  escalar_y(escala: number, segundos: number = 1) {
    this.data.push({
      escala_y: escala,
      duration: segundos * 1000
    });

    return this;
  }

  escalar(escala: number, segundos: number = 1) {
    this.data.push({
      escala_x: escala,
      escala_y: escala,
      duration: segundos * 1000
    });

    return this;
  }

  transparencia(valor: number, segundos: number = 1) {
    this.data.push({
      transparencia: valor,
      duration: segundos * 1000
    });

    return this;
  }

  ocultar(segundos: number = 1) {
    return this.transparencia(100, segundos);
  }

  mostrar(segundos: number = 1) {
    return this.transparencia(0, segundos);
  }
}
