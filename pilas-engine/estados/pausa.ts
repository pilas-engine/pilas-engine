/// <reference path="estado.ts"/>

class EstadoPausa extends Estado {
  historia: any;
  posicion: number;
  sprites: any;
  texto: any;
  total: number;

  izquierda: any;
  derecha: any;

  canvas: any;

  init(datos) {
    this.pilas = datos.pilas;
    this.historia = datos.historia;
    this.posicion = this.historia.length - 1;
    this.total = this.historia.length - 1;
    this.sprites = [];
    this.cuando_cambia_posicion = datos.cuando_cambia_posicion;

    this.izquierda = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.derecha = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.crear_texto();
  }

  cuando_cambia_posicion: any;

  create() {
    this.game.stage.backgroundColor = "555";
    this.crear_sprites_desde_historia(this.posicion);
    this.actualizar_texto();

    this.canvas = this.game.add.graphics(0, 0);
    this.dibujarLineaDeCoordenadasRecorridas();
  }

  private crear_texto() {
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

  private crear_sprites_desde_historia(posicion) {
    let entidades = this.historia[posicion];

    this.sprites.map(sprite => sprite.destroy());

    this.sprites = entidades.map(entidad => {
      return this.crear_sprite_desde_entidad(entidad);
    });
  }

  update() {
    let debeActualizar = false;

    if (this.izquierda.isDown) {
      this.posicion -= 1;
      debeActualizar = true;
    }

    if (this.derecha.isDown) {
      this.posicion += 1;
      debeActualizar = true;
    }

    if (debeActualizar) {
      this.posicion = Math.min(this.posicion, this.total);
      this.posicion = Math.max(this.posicion, 0);

      this.cuando_cambia_posicion({ posicion: this.posicion });

      this.crear_sprites_desde_historia(this.posicion);

      this.actualizar_texto();
    }
  }

  actualizarPosicionDeFormaExterna(posicion) {
    this.posicion = posicion;
    this.posicion = Math.min(this.posicion, this.total);
    this.posicion = Math.max(this.posicion, 0);

    this.crear_sprites_desde_historia(this.posicion);
    this.actualizar_texto();
    this.game.world.bringToTop(this.canvas);
  }

  private actualizar_texto() {
    let ayuda = "Cambiar con las teclas izquierda y derecha";
    let texto = ` Posición ${this.posicion}/${this.total} - ${ayuda}`;
    this.texto.text = texto;
  }

  crear_sprite_desde_entidad(entidad) {
    let sprite = new SpriteSimple(this.game, entidad.x, entidad.y, entidad.imagen);

    sprite.angle = entidad.rotacion;
    sprite.anchor.set(entidad.centro_x, entidad.centro_y);
    sprite["depurable"] = true;

    this.world.add(sprite);
    return sprite;
  }

  render() {
    super.render();
  }

  dibujarLineaDeCoordenadasRecorridas() {
    this.canvas.beginFill(0xffffff, 1);

    this.historia.map(historia => {
      historia.map(entidad => {
        this.canvas.drawCircle(entidad.x, entidad.y, 1);
      });
    });
  }
}
