class PizarraBase extends Actor {
  propiedades = {
    imagen: "imagenes:basicos/sin_imagen"
  };

  _canvas: any;

  iniciar() {
    this._canvas = this.pilas.modo.add.graphics();
  }

  dibujar_circulo(x: number = 0, y: number = 0, radio: number = 20, color: any = "negro") {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.fillStyle(colorHexa, 1);
    this._canvas.fillCircle(x, -y, radio);
  }

  dibujar_borde_de_circulo(x: number = 0, y: number = 0, radio: number = 20, color: any = "negro", grosor: number = 1) {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.lineStyle(grosor, colorHexa, 1);
    this._canvas.strokeCircle(x, -y, radio);
  }

  dibujar_rectangulo(x: number = 0, y: number = 0, ancho: number = 20, alto: number = 20, color: any = "negro") {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.fillStyle(colorHexa, 1);
    this._canvas.fillRect(x, -y, ancho, alto);
  }

  dibujar_borde_de_rectangulo(x: number = 0, y: number = 0, ancho: number = 20, alto: number = 20, color: any = "negro", grosor: number = 1) {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.lineStyle(grosor, colorHexa, 1);
    this._canvas.strokeRect(x, -y, ancho, alto);
  }

  dibujar_linea(x: number = 0, y: number = 0, x1: number = 100, y1: number = 100, color: any = "negro", grosor: number = 1) {
    let colorHexa = this.pilas.colores.convertir_a_hexa(color);

    this._canvas.lineStyle(grosor, colorHexa, 1);
    this._canvas.lineBetween(x, -y, x1, -y1);
  }

  limpiar() {
    this._canvas.clear();
  }

  actualizar() {}

  pre_actualizar() {
    this.pilas.utilidades.sincronizar_contenedor(this._canvas, this.sprite);
  }
}
