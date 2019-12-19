class explosion extends Actor {
  propiedades = {
    figura: "",
    imagen: "imagenes:explosion/explosion_001",
    etiqueta: "explosion"
  };

  iniciar() {
    this.animacion = "explosion";
    this.pilas.reproducir_sonido("explosion");
  }

  actualizar() {}

  cuando_finaliza_animacion(nombre: string) {
    this.eliminar();
  }
}
