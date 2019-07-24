class pizarra extends Actor {
  propiedades = {
    imagen: "imagenes:basicos/invisible"
  };

  _canvas: any;

  iniciar() {
    this._canvas = this.pilas.modo.add.graphics();

    this.limpiar();
    this.dibujar_circulo(0, 0, 40, "rojo");
    this.dibujar_circulo(50, 50, 30, "verde");
    this.dibujar_circulo(100, 100, 20, "azul");

    this.dibujar_borde_de_circulo(0, 0, 40, "negro", 3);
  }

  dibujar_circulo(x: number = 0, y: number = 0, radio: number = 20, color: string = "negro") {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.fillStyle(colorHexa, 1);
    this._canvas.fillCircle(x, y, radio);
  }

  dibujar_borde_de_circulo(x: number = 0, y: number = 0, radio: number = 20, color: string = "negro", grosor: number = 1) {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.lineStyle(grosor, colorHexa, 1);
    this._canvas.strokeCircle(x, y, radio);
  }

  limpiar() {
    this._canvas.clear();
  }

  actualizar() {}

  pre_actualizar() {
    this.pilas.utilidades.sincronizar_contenedor(this._canvas, this.sprite);
  }
}
