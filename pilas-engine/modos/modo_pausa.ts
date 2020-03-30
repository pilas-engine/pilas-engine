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
  fondo_anterior: any = null;

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

    this.crear_fondo(foto.escena.fondo, foto.escena.ancho, foto.escena.alto);

    this.crear_sprites_desde_historia(this.posicion);

    this.crear_canvas_de_depuracion_modo_pausa();
    this.matter.world.createDebugGraphic();

    this.tecla_izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.tecla_derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    let t = this.pilas.historia.obtener_cantidad_de_posiciones();
    let datos_para_el_editor = { minimo: 0, posicion: t, maximo: t };
    this.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_depurar_en_modo_pausa", datos_para_el_editor);
  }

  private crear_sprites_desde_historia(posicion) {
    let foto = this.pilas.historia.obtener_foto(posicion);

    this.sprites.map(sprite => {
      if (sprite.figura) {
        this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, sprite.figura);
      }

      if (sprite["texto"]) {
        sprite["texto"].destroy();
      }

      if (sprite["fondo"]) {
        sprite["fondo"].destroy();
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
      this.matter.world.debugGraphic.setAlpha(1);
    } else {
      this.matter.world.debugGraphic.setAlpha(0);
    }

    if (this.pilas.depurador.modo_posicion_activado) {
      let foto = this.pilas.historia.obtener_foto(this.posicion);
      foto.actores.map(sprite => {
        let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(sprite.x, sprite.y);

        this.dibujar_punto_de_control(this.graphics, x, y);
      });
    }

    if (this.tecla_derecha.isDown) {
      this.avanzar_posicion();
    }

    if (this.tecla_izquierda.isDown) {
      this.retroceder_posicion();
    }
  }

  crear_sprite_desde_entidad(entidad) {
    let nombre = entidad.imagen;
    let sprite = null;
    let galeria = null;
    let imagen = null;
    let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);

    if (nombre.indexOf(":") > -1) {
      galeria = nombre.split(":")[0];
      imagen = nombre.split(":")[1];
    } else {
      galeria = null;
      imagen = nombre;
    }

    if (galeria) {
      sprite = this.add.sprite(x, y, galeria, imagen);
    } else {
      sprite = this.add.sprite(x, y, imagen);
    }

    sprite.angle = -entidad.rotacion;
    sprite.setOrigin(entidad.centro_x, entidad.centro_y);
    sprite.scaleX = entidad.escala_x;
    sprite.scaleY = entidad.escala_y;
    sprite.alpha = 1 - entidad.transparencia / 100;
    sprite.setFlipX(entidad.espejado);
    sprite.setFlipY(entidad.espejado_vertical);
    sprite.depth = -entidad.z;

    if (entidad.fijo) {
      sprite.setScrollFactor(0, 0);
    }

    if (entidad.texto) {
      sprite["texto"] = this.pilas.modo.add.text(0, 0, entidad.texto);
      sprite["texto"].setFontFamily("verdana");
      sprite["texto"].setFontSize(entidad.magnitud);
      sprite["texto"].setColor(entidad.color_de_texto);

      if (entidad.texto_con_borde) {
        sprite["texto"].setStroke("#fff", 1);
        sprite["texto"].setShadow(1, 1, "#333333", 2, true, true);
      }

      sprite["texto"].depth = sprite.depth;

      if (entidad.fondo) {
        let imagen = this.obtener_imagen_para_nineslice(entidad.fondo);
        let f = this.pilas.modo.add.nineslice(40, 0, 30, 20, imagen, 10, 10);
        sprite["fondo"] = f;
        sprite["fondo_imagen"] = entidad.fondo;
      }

      this.copiar_valores_de_sprite_a_texto(sprite);

      if (sprite["fondo"]) {
        sprite["fondo"].depth = sprite["texto"].depth - 1;
        sprite["fondo"].x = sprite["texto"].x;
        sprite["fondo"].y = sprite["texto"].y;

        sprite["fondo"].x += 30 * sprite["texto"].originX - 30 * 0.5;
        sprite["fondo"].y += 30 * sprite["texto"].originY - 30 * 0.5;
        sprite["fondo"].setOrigin(sprite["texto"].originX, sprite["texto"].originY);

        if (entidad.fijo) {
          sprite["fondo"].setScrollFactor(0, 0);
        }
      }

      if (entidad.fijo) {
        sprite["texto"].setScrollFactor(0, 0);
      }
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
    this.pilas.mensajes.emitir_mensaje_al_editor("cambia_posicion_dentro_del_modo_pausa", { posicion: this.posicion });
  }

  retroceder_posicion() {
    this.posicion -= 1;
    this.actualizar_posicion(this.posicion);
    this.pilas.mensajes.emitir_mensaje_al_editor("cambia_posicion_dentro_del_modo_pausa", { posicion: this.posicion });
  }

  crear_canvas_de_depuracion_modo_pausa() {
    let graphics_modo_pausa = this.add.graphics();
    graphics_modo_pausa.depth = 190;
    this.graphics_modo_pausa = graphics_modo_pausa;

    this.pilas.historia.dibujar_puntos_de_las_posiciones_recorridas(graphics_modo_pausa);
  }
}
