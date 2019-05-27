class deslizador extends Actor {
  propiedades = {
    x: 0,
    y: 0,
    imagen: "imagenes:interfaz/interfaz_linea",
    etiqueta: "deslizador",
    figura: ""
  };

  valor: number = 0;
  marca: Actor;
  esta_arrastrando_el_deslizador;

  iniciar() {
    this.imagen = "imagenes:interfaz/interfaz_linea";
    this.esta_arrastrando_el_deslizador = false;
    this.crear_marca();
    this.conectar_eventos();
  }

  conectar_eventos() {
    this.pilas.eventos.conectar("mueve_mouse", datos => {
      this.cuando_mueve_el_mouse(datos);
    });

    this.pilas.eventos.conectar("termina_click", () => {
      this.cuando_termina_de_hacer_click();
    });
  }

  crear_marca() {
    this.marca = this.pilas.actores.actor();
    this.marca.imagen = "imagenes:interfaz/interfaz_deslizador";

    // Hacer que la marca del deslizador ignore clicks.
    this.marca.interactivo = false;
  }

  cuando_hace_click(x, y) {
    this.esta_arrastrando_el_deslizador = true;
    this.ajustar_marca(x);
  }

  private cuando_mueve_el_mouse(datos) {
    if (this.esta_arrastrando_el_deslizador) {
      this.ajustar_marca(datos.x);
    }
  }

  cuando_termina_de_hacer_click() {
    this.esta_arrastrando_el_deslizador = false;
  }

  actualizar() {
    this.marca.x = this.x - 90 + 1.8 * this.valor;
    this.marca.y = this.y;
  }

  private ajustar_marca(x) {
    let dx = x - this.x;

    // aplica límites porque el deslizador es de unos 180 píxeles.
    dx = Math.max(dx, -90);
    dx = Math.min(dx, 90);

    this.valor = (dx + 90) / 1.8;
  }
}
