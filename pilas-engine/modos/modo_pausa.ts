/// <reference path="modo.ts"/>

class ModoPausa extends Modo {
  pilas: Pilas;

  graphics_modo_pausa: any;
  fps: any;

  posicion: number;
  sprites: any;
  texto: any;
  total: number;

  tecla_izquierda: any;
  tecla_derecha: any;

  constructor() {
    super({ key: "ModoPausa" });
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.pilas._ancho, datos.pilas._alto);
    this.pilas = datos.pilas;
    this.posicion = this.pilas.historia.obtener_cantidad_de_posiciones();
    this.total = this.pilas.historia.obtener_cantidad_de_posiciones();
    this.sprites = [];

    let foto = this.pilas.historia.obtener_foto(1);
    this.crear_fondo(foto.escena.fondo);

    this.crear_sprites_desde_historia(this.posicion);

    this.crear_canvas_de_depuracion_modo_pausa();
    this.matter.systems.matterPhysics.world.createDebugGraphic();

    this.tecla_izquierda = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.tecla_derecha = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    let t = this.pilas.historia.obtener_cantidad_de_posiciones();
    let datos_para_el_editor = { minimo: 0, posicion: t, maximo: t };
    this.pilas.mensajes.emitir_mensaje_al_editor(
      "comienza_a_depurar_en_modo_pausa",
      datos_para_el_editor
    );
  }

  private crear_sprites_desde_historia(posicion) {
    let foto = this.pilas.historia.obtener_foto(posicion);

    this.sprites.map(sprite => {
      if (sprite.figura) {
        this.pilas.Phaser.Physics.Matter.Matter.World.remove(
          this.pilas.modo.matter.world.localWorld,
          sprite.figura
        );
      }

      if (sprite["texto"]) {
        sprite["texto"].destroy();
      }

      sprite.destroy();
    });

    this.posicionar_la_camara(foto.escena);

    this.fondo.setAlpha(0.6);

    this.sprites = foto.actores.map(entidad => {
      return this.crear_sprite_desde_entidad(entidad);
    });
  }

  update() {
    this.graphics.clear();

    if (this.fps) {
      this.fps.alpha = 0;
      this.fps_extra.alpha = 0;
    }

    if (this.pilas.depurador.mostrar_fisica) {
      this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(1);
    } else {
      this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(0);
    }

    if (this.pilas.depurador.modo_posicion_activado) {
      let foto = this.pilas.historia.obtener_foto(this.posicion);
      foto.actores.map(sprite => {
        let {
          x,
          y
        } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
          sprite.x,
          sprite.y
        );

        this.dibujar_punto_de_control(this.graphics, x, y);
      });
    }

    if (this.tecla_derecha.isDown) {
      this.avanzar_posicion();
    }

    if (this.tecla_izquierda.isDown) {
      this.retroceder_posicion();
    }

    this.posicionar_fondo();
  }

  crear_sprite_desde_entidad(entidad) {
    let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      entidad.x,
      entidad.y
    );
    let sprite = this.add.sprite(x, y, entidad.imagen);

    sprite.angle = -entidad.rotacion;
    sprite.setOrigin(entidad.centro_x, entidad.centro_y);
    sprite.scaleX = entidad.escala_x;
    sprite.scaleY = entidad.escala_y;
    sprite.alpha = 1 - entidad.transparencia / 100;
    sprite.setFlipX(entidad.espejado);
    sprite.setFlipY(entidad.espejado_vertical);
    sprite.depth = -entidad.z;

    if (entidad.texto) {
      sprite["texto"] = this.pilas.modo.add.text(0, 0, entidad.texto);
      sprite["texto"].setFontFamily("verdana");
      this.copiar_valores_de_sprite_a_texto(sprite);
    }

    if (entidad.figura) {
      sprite["figura"] = this.crear_figura_estatica_para(entidad);
    }

    return sprite;
  }

  actualizar_posicion(posicion) {
    this.posicion = posicion;
    this.posicion = Math.min(this.posicion, this.total);
    this.posicion = Math.max(this.posicion, 0);

    this.crear_sprites_desde_historia(this.posicion);
  }

  avanzar_posicion() {
    this.posicion += 1;
    this.actualizar_posicion(this.posicion);
    this.pilas.mensajes.emitir_mensaje_al_editor(
      "cambia_posicion_dentro_del_modo_pausa",
      { posicion: this.posicion }
    );
  }

  retroceder_posicion() {
    this.posicion -= 1;
    this.actualizar_posicion(this.posicion);
    this.pilas.mensajes.emitir_mensaje_al_editor(
      "cambia_posicion_dentro_del_modo_pausa",
      { posicion: this.posicion }
    );
  }

  crear_canvas_de_depuracion_modo_pausa() {
    let graphics_modo_pausa = this.add.graphics();
    graphics_modo_pausa.depth = 190;
    this.graphics_modo_pausa = graphics_modo_pausa;

    this.pilas.historia.dibujar_puntos_de_las_posiciones_recorridas(
      graphics_modo_pausa
    );
  }
}
