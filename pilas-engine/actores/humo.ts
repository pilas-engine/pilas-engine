class humo extends Actor {
  propiedades = {
    figura: "",
    imagen: "imagenes:efectos/humo-03",
    etiqueta: "humo"
  };

  iniciar() {
    this.animacion = "humo";
  }

  actualizar() {}

  cuando_finaliza_animacion(nombre: string) {
    this.eliminar();
  }
}
