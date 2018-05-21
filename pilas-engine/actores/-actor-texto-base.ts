class ActorTextoBase extends ActorBase {
  propiedades = {
    imagen: "invisible",
    texto: "Hola mundo",
    es_texto: true
  };

  _texto: any = null;

  iniciar() {}

  pre_actualizar() {
    super.pre_actualizar();

    this.copiar_atributos_de_sprite(this.sprite, this._texto);
  }

  actualizar() {}

  set sombra(valor: boolean) {
    if (valor) {
      this._texto.setShadow(2, 2, "black", 4);
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
  }

  set magnitud(numero: number) {
    this._texto.setFontSize(numero);
  }

  set color(color: string) {
    this._texto.setColor(color);
  }
}
