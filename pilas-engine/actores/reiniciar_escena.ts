class reiniciar_escena extends ActorTextoBase {
  propiedades = {
    imagen: "imagenes:basicos/invisible",
    fondo: "imagenes:redimensionables/gris",
    texto: "Reiniciar escena",
    es_texto: true,
    z: -10,
    fuente: "color-negro"
  };

  cuando_hace_click() {
    this.pilas.reiniciar_escena();
  }

  cuando_mueve() {
    this.pilas.definir_cursor("pointer");
  }

  cuando_sale() {
    this.pilas.definir_cursor("normal");
  }
}
