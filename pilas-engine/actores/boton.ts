class boton extends ActorTextoBase {
  propiedades = {
    imagen: "imagenes:basicos/invisible",
    fondo: "imagenes:redimensionables/gris",
    texto: "Botón",
    es_texto: true,
    z: -10,
    color: "black",
    fuente: "color-negro"
  };

  cuando_hace_click() {
    this.decir("¡has hecho click!");
    this.realizar_animacion_de_pulsacion();
  }

  realizar_animacion_de_pulsacion() {
    this.y -= 2;

    this.pilas.luego(0.2, () => {
      this.y += 2;
    });
  }

  cuando_mueve() {
    this.pilas.definir_cursor("pointer");
  }

  cuando_sale() {
    this.pilas.definir_cursor("normal");
  }
}
