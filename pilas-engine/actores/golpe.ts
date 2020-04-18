class golpe extends Actor {
  propiedades = {
    figura: "",
    imagen: "imagenes:efectos/golpe-3",
    etiqueta: "golpe"
  };

  iniciar() {
    this.animacion = "golpe";
  }

  actualizar() {}

  cuando_finaliza_animacion(nombre: string) {
    this.eliminar();
  }
}
