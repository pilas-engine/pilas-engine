class ActorTextoBase extends ActorBase {
  propiedades = {
    imagen: "invisible",
    texto: "Hola mundo",
    es_texto: true
  };

  margen_interno: number = 30;

  iniciar() {
    // TODO: convertir en una propiedad y llevar al método pre_iniciar didDestroyElement() {
    // actor base
    this.color = "black";
  }

  pre_actualizar() {
    super.pre_actualizar();

    this.copiar_atributos_de_sprite(this.sprite, this._texto);

    if (this._fondo) {
      this.copiar_atributos_de_sprite(this.sprite, this._fondo);
      this._texto.depth = this._texto.depth + 1;
      this._fondo.x +=
        this.margen_interno * this.sprite.originX - this.margen_interno * 0.5;
      this._fondo.y +=
        this.margen_interno * this.sprite.originY - this.margen_interno * 0.5;
    }
  }

  actualizar() {}

  set sombra(valor: boolean) {
    if (valor) {
      this._texto.setShadow(1, 1, "white", 2);
    } else {
      this._texto.setShadow();
    }
  }

  set texto(texto: string) {
    if (!this._texto) {
      this._texto = this.pilas.modo.add.text(0, 0, texto);
      this._texto.setFontFamily("verdana");
    } else {
      this._texto.setText(texto);
    }

    this.actualizar_tamano_del_fondo();
  }

  get texto() {
    return this._texto.text;
  }

  set fondo(fondo: string) {
    this._fondo_imagen = fondo;

    if (!this._fondo) {
      this.crear_fondo(fondo);
    } else {
      this._fondo.destroy();
      this.crear_fondo(fondo);
    }
  }

  private crear_fondo(fondo) {
    this._fondo = this.pilas.modo.add["nineslice"](0, 0, 30, 20, fondo, 10, 10);
    this.actualizar_tamano_del_fondo();
  }

  private actualizar_tamano_del_fondo() {
    this.definir_area_de_interactividad(this._texto.width, this._texto.height);

    if (!this._fondo) {
      return;
    }

    let ancho = this._texto.width + this.margen_interno;
    let alto = this._texto.height + this.margen_interno;

    this._fondo.resize(ancho, alto);
    this.definir_area_de_interactividad(ancho, alto);
  }

  set magnitud(numero: number) {
    this._texto.setFontSize(numero);
    this.actualizar_tamano_del_fondo();
  }

  set color(color: string) {
    this._texto.setColor(color);
  }

  eliminar() {
    super.eliminar();
  }
}
