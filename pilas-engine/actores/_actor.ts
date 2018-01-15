class Actor {
  tipo: String;
  sprite: Phaser.Sprite;
  pilas: Pilas;
  _rotacion: number;

  x: number;
  y: number;
  rotacion: number;

  constructor(pilas, x, y, imagen = "sin_imagen") {
    this.pilas = pilas;
    this.sprite = new Phaser.Sprite(pilas.game, 0, 0, imagen);
    this.x = x;
    this.y = y;
    this.rotacion = 0;
    this.iniciar();

    this.sprite.update = () => {
      try {
        this.actualizar();
      } catch (e) {
        this.pilas.emitir_error_y_detener(e);
      }
    };
  }

  iniciar() {}

  serializar() {
    return {
      tipo: this.tipo,
      x: this.sprite.x,
      y: this.sprite.y,
      centro_x: this.sprite.anchor.x,
      centro_y: this.sprite.anchor.y,
      imagen: this.sprite.key,
      rotacion: this.sprite.angle
    };
  }

  actualizar() {
    //this.sprite.x += 1;
  }

  get imagen(): string {
    return this.sprite.frameName;
  }

  set imagen(nombre: string) {
    this.sprite.loadTexture(nombre);
  }

  set x(x: number) {
    // TODO: Pasar a coordenadas de phaser.
    this.sprite.x = x + 300;
  }

  get x() {
    // TODO: Convertir desde coordenadas phaser.
    return this.sprite.x - 300;
  }

  set y(y: number) {
    // TODO: Pasar a coordenadas de phaser.
    this.sprite.y = 300 - y;
  }

  get y() {
    // TODO: Convertir desde coordenadas phaser.
    return this.sprite.y - 300;
  }

  set rotacion(angulo: number) {
    this._rotacion = angulo % 360;
    this.sprite.angle = -this._rotacion;
  }

  get rotacion() {
    return this._rotacion;
  }
}
