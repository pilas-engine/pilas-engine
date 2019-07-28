class pizarra extends PizarraBase {
  propiedades = {
    imagen: "imagenes:basicos/sin_imagen"
  };

  iniciar() {
    super.iniciar();
    this.imagen = "imagenes:basicos/invisible";

    this.limpiar();

    // Los colores se puede especificar por componentes (rojo, verde, azul)
    let color = this.pilas.colores.generar(255, 100, 0);
    this.dibujar_circulo(100, 0, 40, color);
    this.dibujar_borde_de_circulo(100, 0, 40, "negro", 2);

    // O bien usando nombres.
    this.dibujar_circulo(100, 100, 20, "amarillo");
    this.dibujar_borde_de_circulo(100, 100, 20, "negro", 2);

    // También se pueden dibujar rectángulos, con borde:
    this.dibujar_rectangulo(-50, -50, 40, 90, "verde");
    this.dibujar_borde_de_rectangulo(-50, -50, 40, 90, "negro", 2);

    this.dibujar_linea(-100, 0, 200, 200, "rojo", 6);
  }

  actualizar() {}
}
