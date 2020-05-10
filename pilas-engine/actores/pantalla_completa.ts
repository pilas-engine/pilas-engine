class pantalla_completa extends Actor {
  propiedades = {
    imagen: "imagenes:botones/pantalla-completa",
    es_texto: false,
    z: -10,
    transparencia: 50
  };

  iniciar() {
    this.transparencia = 50;
  }

  cuando_hace_click() {
    this.pilas.alternar_modo_pantalla_completa();
  }

  cuando_mueve() {
    this.transparencia = 0;
  }

  cuando_sale() {
    this.transparencia = 0;
  }
}
