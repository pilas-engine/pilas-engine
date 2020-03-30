class ActorTextoBase extends ActorBase {
  propiedades = {
    imagen: "imagenes:basicos/invisible",
    texto: "Hola mundo",
    es_texto: true
  };

  margen_interno: number = 30;

  iniciar() {}

  set con_borde(con_borde: boolean) {
    this._texto_con_borde = con_borde;

    if (con_borde) {
      this._texto.setStroke("#fff", 1);
      this._texto.setShadow(1, 1, "#333333", 2, true, true);
    }
  }

  get con_borde() {
    return this._texto_con_borde;
  }

  pre_actualizar() {
    super.pre_actualizar();

    this.copiar_atributos_de_sprite(this.sprite, this._texto);

    if (this._fondo) {
      this.copiar_atributos_de_sprite(this.sprite, this._fondo);
      this._texto.depth = this._texto.depth + 1;
      this._fondo.x += this.margen_interno * this.sprite.originX - this.margen_interno * 0.5;
      this._fondo.y += this.margen_interno * this.sprite.originY - this.margen_interno * 0.5;
    }

    if (this.fijo) {
      this._fondo.setScrollFactor(0, 0);
    } else {
      this._fondo.setScrollFactor(1, 1);
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
    let imagen = null;

    if (fondo.indexOf(":") > -1) {
      let partes = fondo.split(":");
      imagen = { key: partes[0], frame: partes[1] };
    } else {
      imagen = fondo;
    }

    this._fondo = this.pilas.modo.add["nineslice"](0, 0, 30, 20, imagen, 10, 10);
    this.pre_actualizar();
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
    this._magnitud = numero;
    this.actualizar_tamano_del_fondo();
  }

  get magnitud() {
    return this._magnitud;
  }

  set color(color: string) {
    this._texto.setColor(color);
    this._color_de_texto = color;
  }

  eliminar() {
    super.eliminar();
  }
}
