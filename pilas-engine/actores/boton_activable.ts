class boton_activable extends ActorTextoBase {
  propiedades = {
    imagen: "imagenes:basicos/invisible",
    fondo: "imagenes:redimensionables/gris",
    texto: "Botón",
    es_texto: true,
    z: -10,
    color: "black",
    fuente: "color-negro"
  };

  habilitado: boolean = true;

  cuando_hace_click() {
    if (this.habilitado) {
      this.decir("¡has hecho click!");
      this.realizar_animacion_de_pulsacion();
    }
  }

  realizar_animacion_de_pulsacion() {
    this.y -= 2;

    this.pilas.luego(0.2, () => {
      this.y += 2;
    });
  }

  cuando_mueve() {
    if (this.habilitado) {
      this.pilas.definir_cursor("pointer");
    }
  }

  cuando_sale() {
    if (this.habilitado) {
      this.pilas.definir_cursor("normal");
    }
  }

  habilitar() {
    this.habilitado = true;
    this.transparencia = 0;
  }

  deshabilitar() {
    this.habilitado = false;
    this.transparencia = 30;
    this.pilas.definir_cursor("normal");
  }

  activar() {
    this.habilitar();
  }

  desactivar() {
    this.deshabilitar();
  }
}
