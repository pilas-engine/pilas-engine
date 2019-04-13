class gallina extends Actor {
  propiedades = {
    x: 0,
    y: 0,
    imagen: "gallina_vuela_3",

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
        "gallina_vuela_1",
        "gallina_vuela_1",
        "gallina_vuela_2",
        "gallina_vuela_3",
        "gallina_vuela_2"
      ],
      15
    );
    this.crear_animacion("gallina_muere", ["gallina_muere"], 20);
    this.crear_animacion("gallina_sin_piel", ["gallina_sin_piel"], 20);

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
