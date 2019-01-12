class Modo extends Phaser.Scene {
  matter: any;
  actores: any;
  pilas: Pilas;
  fps: any;
  fps_extra: any;
  graphics: any;
  fondo: any;
  _nombre_del_fondo: string = "";
  ancho: number;
  alto: number;

  constructor(data) {
    super(data);
  }

  create(datos, ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;

    this.fps = this.add.bitmapText(5, 10, "impact", "FPS");
    this.fps.scrollFactorX = 0;
    this.fps.scrollFactorY = 0;

    this.fps_extra = this.add.bitmapText(5, 34, "mini-impact", "ACTORES:");
    this.fps_extra.scrollFactorX = 0;
    this.fps_extra.scrollFactorY = 0;

    this.crear_canvas_de_depuracion();
    this.pilas = datos.pilas;
  }

  destacar_actor_por_id(id) {
    let actor = this.obtener_actor_por_id(id);

    if (actor) {
      actor.destacar();
    }
  }

  crear_canvas_de_depuracion() {
    let graphics = this.add.graphics();
    graphics.depth = 20000;
    this.graphics = graphics;
  }

  update(actores) {
    this.graphics.clear();

    actores = actores || this.actores;

    if (this.pilas.depurador.modo_posicion_activado) {
      actores.map(sprite => {
        this.dibujar_punto_de_control(this.graphics, sprite.x, sprite.y);
      });
    }

    if (this.fps) {
      if (this.pilas.depurador.mostrar_fps) {
        this.fps.alpha = 1;
        this.fps.text = "FPS: " + Math.round(this.pilas.game.loop["actualFps"]);

        let x = this.pilas.cursor_x;
        let y = this.pilas.cursor_y;

        this.fps_extra.alpha = 1;
        this.fps_extra.text = [
          `ACTORES: ${actores.length}`,
          `CURSOR X: ${x}`,
          `CURSOR Y: ${y}`
        ].join("\n");
      } else {
        this.fps.alpha = 0;
        this.fps_extra.alpha = 0;
      }
    }

    this.posicionar_fondo();
  }

  posicionar_fondo() {
    let posicion_de_la_camara = this.obtener_posicion_de_la_camara();
    this.fondo.x = posicion_de_la_camara.x;
    this.fondo.y = posicion_de_la_camara.y;

    this.fondo.tilePositionX = posicion_de_la_camara.x;
    this.fondo.tilePositionY = posicion_de_la_camara.y;
  }

  obtener_posicion_de_la_camara() {
    let x = pilas.modo.cameras.cameras[0].scrollX;
    let y = pilas.modo.cameras.cameras[0].scrollY;
    return { x, y };
  }

  crear_fondo(fondo) {
    this._nombre_del_fondo = fondo;
    this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, fondo);
    this.fondo.depth = -20000;
    this.fondo.setOrigin(0);
  }

  cambiar_fondo(fondo) {
    if (fondo !== this._nombre_del_fondo) {
      this.fondo.destroy();
      this.fondo = null;
      this.crear_fondo(fondo);
    }
  }

  obtener_actor_por_id(id) {
    return this.pilas.modo.actores.filter(e => e.id === id)[0];
  }

  actualizar_sprite_desde_datos(sprite, actor) {
    let coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      actor.x,
      actor.y
    );
    sprite.setTexture(actor.imagen);

    sprite.id = actor.id;
    sprite.x = coordenada.x;
    sprite.y = coordenada.y;
    sprite.angle = -actor.rotacion;
    sprite.scaleX = actor.escala_x;
    sprite.scaleY = actor.escala_y;
    sprite.depth = -actor.z || 0;
    sprite.setOrigin(actor.centro_x, actor.centro_y);
    sprite.alpha = 1 - actor.transparencia / 100;

    if (sprite.figura) {
      this.pilas.Phaser.Physics.Matter.Matter.World.remove(
        this.pilas.modo.matter.world.localWorld,
        sprite.figura
      );
    }

    if (actor.figura) {
      sprite.figura = this.crear_figura_estatica_para(actor);
    }

    sprite.setFlipX(actor.espejado);
    sprite.setFlipY(actor.espejado_vertical);

    if (actor.es_texto) {
      if (!sprite["texto"]) {
        sprite["texto"] = this.add.text(0, 0, actor.texto);
        sprite["texto"].setFontFamily("verdana");

        sprite.update = () => {
          this.copiar_valores_de_sprite_a_texto(sprite);
        };
      }

      sprite["texto"].setText(actor.texto);
      this.copiar_valores_de_sprite_a_texto(sprite);
    }
  }

  copiar_valores_de_sprite_a_texto(sprite) {
    sprite["texto"].x = sprite.x;
    sprite["texto"].y = sprite.y;
    sprite["texto"].angle = sprite.angle;
    sprite["texto"].scaleX = sprite.scaleX;
    sprite["texto"].scaleY = sprite.scaleY;

    sprite["texto"].alpha = sprite.alpha;
    sprite["texto"].flipX = sprite.flipX;
    sprite["texto"].flipY = sprite.flipY;
    sprite["texto"].setOrigin(sprite.originX, sprite.originY);
  }

  crear_figura_estatica_para(actor) {
    let coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      actor.x,
      actor.y
    );
    let angulo = this.pilas.utilidades.convertir_angulo_a_radianes(
      -actor.rotacion
    );

    if (actor.figura === "rectangulo") {
      return this.matter.add.rectangle(
        coordenada.x,
        coordenada.y,
        actor.figura_ancho,
        actor.figura_alto,
        {
          isStatic: true,
          angle: angulo
        }
      );
    }

    if (actor.figura === "circulo") {
      return this.matter.add.circle(
        coordenada.x,
        coordenada.y,
        actor.figura_radio,
        { isStatic: true }
      );
    }

    throw Error(`No se reconoce la figura ${actor.figura} en este modo.`);
  }

  posicionar_la_camara(datos_de_la_escena) {
    this.cameras.cameras[0].setScroll(
      datos_de_la_escena.camara_x,
      -datos_de_la_escena.camara_y
    );
  }

  actualizar_posicion(posicion: any = null) {
    throw Error(
      "No se puede actualizar posicion en este modo. Solo se puede en el modo pausa."
    );
  }

  dibujar_punto_de_control(graphics, x, y) {
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }
}
