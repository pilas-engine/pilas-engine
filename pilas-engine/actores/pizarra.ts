class pizarra extends Actor {
  propiedades = {
    imagen: "invisible"
  };

  canvas: any = null;

  iniciar() {
    this.canvas = this.pilas.modo.add.graphics();
  }

  pre_actualizar() {
    super.pre_actualizar();
    this.copiar_atributos_de_sprite(this.sprite, this.canvas);
  }

  actualizar() {}

  linea(desde_x, desde_y, hasta_x, hasta_y) {
    this.canvas.beginPath();
    this.canvas.moveTo(desde_x, -desde_y);
    this.canvas.lineTo(hasta_x, -hasta_y);

    this.canvas.closePath();
    this.canvas.strokePath();
    this.pilas.canvas = this.canvas;
    this.pilas.pizarra = this;
  }

  limpiar() {
    this.pilas.canvas.clear();
  }
}
