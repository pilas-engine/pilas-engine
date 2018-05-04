class globo extends Actor {
  propiedades = {
    imagen: "aceituna",
    figura: "circulo",
    texto: "hola mundo!"
  };

  iniciar() {
    this.definir_texto("Hola mundo!");
  }

  actualizar() {}
}
