// @ts-ignore
class barra_de_energia extends PizarraBase {
  propiedades = {
    imagen: "imagenes:basicos/barra_de_energia"
  };

  barra_largo: number = 200;
  barra_alto: number = 15;
  vida_actual: number = 100; // valor entre 0 y 100

  private vida_anterior: number = 0;

  iniciar() {
    super.iniciar();
    this.imagen = "imagenes:basicos/invisible";
  }

  actualizar() {
    this.dibujar();
    //this.vida_actual -= 0.2;
  }

  dibujar() {
    if (this.vida_actual === this.vida_anterior) {
      return;
    }

    this.vida_actual = Math.max(0, this.vida_actual);
    this.vida_actual = Math.min(100, this.vida_actual);
    this.vida_anterior = this.vida_actual;
    this.dibujar_barra();
  }

  private dibujar_barra() {
    let vida = this.vida_actual;
    let largo = this.barra_largo;
    let alto = this.barra_alto;
    let x = -largo / 2;
    let y = +alto / 2;

    this.limpiar();
    this.dibujar_borde_de_rectangulo(x, y, largo, alto, "blanco", 4);
    this.dibujar_rectangulo(x, y, largo, alto, "rojo");

    this.dibujar_rectangulo(x, y, (largo / 100) * vida, alto, "amarillo");
  }
}
