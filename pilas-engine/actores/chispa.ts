class chispa extends Actor {
  propiedades = {
    figura: "",
    imagen: "imagenes:efectos/chispa-3",
    etiqueta: "chispa"
  };

  iniciar() {
    this.animacion = "chispa";
  }

  actualizar() {}

  cuando_finaliza_animacion(nombre: string) {
    this.eliminar();
  }
}
