class puntaje extends ActorTextoBase {
  propiedades = {
    imagen: "imagenes:basicos/invisible",
    texto: "PUNTAJE: 0",
    color: "white",
    es_texto: true,
    z: -10
  };
  puntaje: number = 0;

  iniciar() {
    this._texto.setFontSize(20);
    this._texto.setStroke("#fff", 1);
    this._texto.setShadow(1, 1, "#333333", 2, true, true);
    this.actualizar_texto();
  }

  aumentar(cantidad: number = 1) {
    this.puntaje += cantidad;
    this.actualizar_texto();
  }

  actualizar_texto() {
    this.texto = `PUNTAJE: ${this.puntaje}`;
  }
}
