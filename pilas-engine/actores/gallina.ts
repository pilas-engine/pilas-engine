class gallina extends Actor {
  propiedades = {
    x: 0,
    y: 0,
    imagen: "imagenes:gallina_vuela_3.png",

    figura: "circulo",
    figura_radio: 30,
    figura_sin_rotacion: true,
    figura_dinamica: true,
    figura_rebote: 0
  };

  iniciar() {
    this.crear_animacion(
      "gallina_vuela",
      [
        "imagenes:gallina_vuela_1.png",
        "imagenes:gallina_vuela_1.png",
        "imagenes:gallina_vuela_2.png",
        "imagenes:gallina_vuela_3.png",
        "imagenes:gallina_vuela_2.png"
      ],
      15
    );
    this.crear_animacion("gallina_muere", ["imagenes:gallina_muere.png"], 20);
    this.crear_animacion(
      "gallina_sin_piel",
      ["imagenes:gallina_sin_piel.png"],
      20
    );

    this.estado = "vuela";
  }

  actualizar() {}

  vuela_iniciar() {
    this.reproducir_animacion("gallina_vuela");
  }

  vuela_actualizar() {}

  // # TODO: Implementar este tipo de manejadores, para que desde los estados de autómata se puedan crear colisiones.
  vuela_cuando_comienza_una_colision(actor) {}
}
