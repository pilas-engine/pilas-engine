class boton_de_control_espacio extends Actor {
  propiedades = {
    imagen: "imagenes:botones/botones_a",
    z: -100
  };

  pulsado: boolean = false;

  iniciar() {}

  actualizar() {
    if (this.pulsado) {
      this.transparencia = 0;
    } else {
      this.transparencia = 50;
    }

    this.pilas.control.simular_pulsacion("espacio", this.pulsado);
  }

  cuando_hace_click() {
    this.pulsado = true;
  }

  cuando_sale() {
    this.pulsado = false;
  }

  cuando_termina_de_hacer_click() {
    this.pulsado = false;
  }
}
