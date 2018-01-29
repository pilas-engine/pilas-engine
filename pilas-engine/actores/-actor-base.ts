class ActorBase {
  tipo: String;
  sprite: Phaser.Sprite;
  pilas: Pilas;
  _rotacion: number;

  constructor(pilas, x, y, imagen = "sin_imagen") {
    this.pilas = pilas;
    this.sprite = new Phaser.Sprite(pilas.game, 0, 0, imagen);
    this.x = x;
    this.y = y;
    this.rotacion = 0;

    this.pilas.game.world.add(this.sprite);
    //this.pilas.escena_actual.agregar_actor(this);
    this.sprite["actor"] = this;

    this.iniciar();

    this.sprite.update = () => {
      try {
        this.actualizar();
      } catch (e) {
        this.pilas.emitir_error_y_detener(e);
      }
    };

    this.pilas.escena_actual().agregar_actor(this);
  }

  iniciar() {}

  serializar() {
    return {
      tipo: this.tipo,
      x: Math.round(this.x),
      y: Math.round(this.y),
      centro_x: this.sprite.anchor.x,
      centro_y: this.sprite.anchor.y,
      imagen: this.sprite.key,
      rotacion: this.sprite.angle
    };
  }

  actualizar() {}

  get imagen(): string {
    return this.sprite.frameName;
  }

  set imagen(nombre: string) {
    this.sprite.loadTexture(nombre);
  }

  set x(_x: number) {
    let { x } = this.pilas.convertir_coordenada_de_pilas_a_phaser(_x, 0);
    this.sprite.x = x;
  }

  get x() {
    let { x } = this.pilas.convertir_coordenada_de_phaser_a_pilas(this.sprite.x, 0);
    return x;
  }

  set y(_y: number) {
    let { y } = this.pilas.convertir_coordenada_de_pilas_a_phaser(0, _y);
    this.sprite.y = y;
  }

  get y() {
    let { y } = this.pilas.convertir_coordenada_de_phaser_a_pilas(0, this.sprite.y);
    return y;
  }

  set rotacion(angulo: number) {
    this._rotacion = angulo % 360;
    this.sprite.angle = -this._rotacion;
  }

  get rotacion() {
    return this._rotacion;
  }

  toString() {
    let clase = this.constructor["name"];
    return `<${clase} en (${this.x}, ${this.y})>`;
  }
}
