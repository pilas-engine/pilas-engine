class EstadoEditor extends Phaser.State {
  entidades: any;
  sprites: any;
  texto: any;

  init(datos) {
    this.entidades = datos.entidades;
    this.cuando_termina_de_mover = datos.cuando_termina_de_mover;
    this.sprites = {};
    this.crear_texto_con_posicion_del_mouse();
  }

  crear_texto_con_posicion_del_mouse() {
    var style = {
      font: "16px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "top"
    };

    let texto = this.game.add.text(0, 5, "", style);
    texto.setShadow(1, 1, "rgba(0, 0, 0, 0.5)", 3);
    this.texto = texto;
  }

  create() {
    this.game.stage.backgroundColor = "5b5";
  }

  /**
   * Se encarga de mantener el cache de sprites acorde a
   * la lista de entidades.
   */
  update() {
    // Las entidades se leen para generar el cache, pero
    // también se actualiza en base a la posición de los sprites
    // que el usuario puede mover por la pantalla.

    this.entidades = this.entidades.map(e => {
      var sprite = null;

      // Si el sprite no tiene cache, se construye desde cero
      if (!this.sprites[e.id]) {
        sprite = new Sprite(this.game, 0, 0, e.imagen);
        sprite.iniciar(e);

        sprite.al_terminar_de_arrastrar = this.cuando_termina_de_mover;

        this.world.add(sprite);
        this.sprites[e.id] = sprite;
      } else {
        sprite = this.sprites[e.id];
      }

      // Una vez que el sprite existe, se toma su posición y se coloca
      // en la lista de entidades.
      e.x = sprite.x;
      e.y = sprite.y;

      return e;
    });

    this.actualizar_texto_con_posicion_del_mouse();
  }

  actualizar_texto_con_posicion_del_mouse() {
    let x = this.input.mousePointer.x;
    let y = this.input.mousePointer.y;

    if (x !== -1 && y !== -1) {
      this.texto.text = "  Mouse: (" + x + ", " + y + ") ";
    }
  }
}
