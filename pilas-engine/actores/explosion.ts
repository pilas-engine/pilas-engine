class explosion extends Actor {
  propiedades = {
    figura: "",
    imagen: "imagenes:explosion/explosion_001",
    etiqueta: "explosion"
  };

  iniciar() {
    this.cargar_animacion();
    this.reproducir_animacion("explosion");
    this.pilas.reproducir_sonido("explosion");
  }

  cargar_animacion() {
    this.crear_animacion(
      "explosion",
      [
        "imagenes:explosion/explosion_001",
        "imagenes:explosion/explosion_002",
        "imagenes:explosion/explosion_003",
        "imagenes:explosion/explosion_004",
        "imagenes:explosion/explosion_005",
        "imagenes:explosion/explosion_006",
        "imagenes:explosion/explosion_007",
        "imagenes:explosion/explosion_008",
        "imagenes:explosion/explosion_009",
        "imagenes:explosion/explosion_010",
        "imagenes:explosion/explosion_011",
        "imagenes:explosion/explosion_012",
        "imagenes:explosion/explosion_013",
        "imagenes:explosion/explosion_014",
        "imagenes:explosion/explosion_015"
      ],
      30
    );
    this.reproducir_animacion("explosion");
  }

  actualizar() {}

  cuando_finaliza_animacion(nombre: string) {
    this.eliminar();
  }
}
