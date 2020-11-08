/// <reference path="modo.ts"/>

class ModoPausa extends Modo {
  pilas: Pilas;

  graphics_modo_pausa: any;
  indicador_de_texto: any;

  posicion: number;
  sprites: any;
  texto: any;
  total: number;

  tecla_izquierda: any;
  tecla_derecha: any;
  fondo_anterior: any = null;

  _anterior_valor_del_modo_posicion_activado: boolean;

  _anterior_posicion_x_de_la_camara = 0;
  _anterior_posicion_y_de_la_camara = 0;

  seleccion: any; // referencia al actor o null si lo que está seleccionado es la escena completa.

  constructor() {
    super({ key: "ModoPausa" });
  }

  private crear_indicador_de_texto() {
    this.indicador_de_texto = this.add.bitmapText(5, 10, "color-blanco-con-sombra", "");
    this.indicador_de_texto.scrollFactorX = 0;
    this.indicador_de_texto.scrollFactorY = 0;
    this.indicador_de_texto.depth = 999999;

    this.indicador_de_texto.align = 2;
  }

  preload() {}

  create(datos: any) {
    super.create(datos, datos.pilas._ancho, datos.pilas._alto);
    this.pilas = datos.pilas;
    this.posicion = this.pilas.historia.obtener_cantidad_de_posiciones();
    this.total = this.pilas.historia.obtener_cantidad_de_posiciones();
    this.sprites = [];
    this.crear_indicador_de_texto();

    this._anterior_valor_del_modo_posicion_activado = this.pilas.depurador.modo_posicion_activado;

    let foto = this.pilas.historia.obtener_foto(1);

    this.crear_fondo(foto.escena.fondo, foto.escena.ancho, foto.escena.alto);

    this.crear_canvas_de_depuracion_modo_pausa();

    this.actualizar_posicion(this.posicion);

    this.tecla_izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.tecla_derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    let t = this.pilas.historia.obtener_cantidad_de_posiciones();
    let datos_para_el_editor = { minimo: 0, posicion: t, maximo: t };
    this.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_depurar_en_modo_pausa", datos_para_el_editor);
    this.crear_manejadores_para_controlar_el_zoom(false);
  }

  private crear_sprites_desde_historia(posicion) {
    let foto = this.pilas.historia.obtener_foto(posicion);

    // Elimina a todos los sprites de la escena.
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

    // limpia el canvas con los puntos de control de los
    // actores.
    this.graphics.clear();
    this.fondo.setAlpha(0.8);

    this.hacer_arratrable_el_fondo();
    this.limitar_movimiento_de_la_camara_a_los_bordes_actuales(foto.escena);

    this.posicionar_la_camara(foto.escena);
    this.posicionar_fondo(foto.escena);

    // Crea a todos los actores desde la foto actual.
    this.sprites = foto.actores.map(entidad => {
      if (this.pilas.depurador.modo_posicion_activado) {
        let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);

        this.dibujar_punto_de_control(this.graphics, x, y);
      }

      return this.crear_sprite_desde_entidad(entidad);
    });

    let minutos_como_numero = Math.floor((posicion + 1) / 60 / 60);
    let segundos_como_numero = Math.floor((posicion + 1) / 60) % 60;

    let minutos = `0${minutos_como_numero}`.slice(-2);
    let segundos = `0${segundos_como_numero}`.slice(-2);

    this.indicador_de_texto.text = `Tiempo: ${minutos}' ${segundos}''\nCuadro: ${posicion + 1}\nCantidad de actores: ${foto.actores.length}`;
    this.indicador_de_texto.x = this.ancho - this.indicador_de_texto.width - 10;
  }

  posicionar_fondo(escena) {
    let dx = escena.desplazamiento_del_fondo_x || 0;
    let dy = escena.desplazamiento_del_fondo_y || 0;

    let posicion_de_la_camara = {
      x: escena.camara_x,
      y: -escena.camara_y
    };

    if (this.fondo) {
      this.fondo.x = posicion_de_la_camara.x;
      this.fondo.y = posicion_de_la_camara.y;

      this.fondo.tilePositionX = posicion_de_la_camara.x + dx;
      this.fondo.tilePositionY = posicion_de_la_camara.y + dy;
    }
  }

  posicionar_la_camara(datos_de_la_escena) {
    let x = datos_de_la_escena.camara_x;
    let y = -datos_de_la_escena.camara_y;

    // posiciona la cámara siempre y cuando haga falta porque cambió la cámara
    // de lugar respecto del cuadro anterior. Esto se hace para permitir cambiar
    // el cuadro en el modo historia manteniendo el zoom y desplazamiento realizado
    // con el mouse.
    if (this._anterior_posicion_x_de_la_camara !== x || this._anterior_posicion_y_de_la_camara !== y) {
      this.cameras.cameras[0].setScroll(x, y);
      this._anterior_posicion_x_de_la_camara = x;
      this._anterior_posicion_y_de_la_camara = y;
    }
  }

  limitar_movimiento_de_la_camara_a_los_bordes_actuales(escena) {
    let x = escena.camara_x;
    let y = -escena.camara_y;

    this.cameras.cameras[0].setBounds(x, y, this.ancho, this.alto);
  }

  hacer_arratrable_el_fondo() {
    this.fondo.setInteractive();
    this.input.setDraggable(this.fondo, undefined);

    let escena = this;

    this.input.on("dragstart", (pointer, gameObject) => {
      this.posicion_anterior_de_arrastre = pointer.position.clone();

      if (escena.pilas.utilidades.es_firefox()) {
        escena.input.setDefaultCursor("grabbing");
      } else {
        escena.input.setDefaultCursor("-webkit-grabbing");
      }
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      this.desplazar_la_camara_desde_el_evento_drag(pointer);
    });

    this.input.on("dragend", (pointer, gameObject) => {
      escena.input.setDefaultCursor("default");
    });
  }

  desplazar_la_camara_desde_el_evento_drag(pointer) {
    let zoom = this.cameras.main.zoom;
    let factor = this.obtener_factores();
    let dx = this.posicion_anterior_de_arrastre.x - pointer.position.x;
    let dy = this.posicion_anterior_de_arrastre.y - pointer.position.y;

    this.cameras.main.scrollX += dx / factor.x / zoom;
    this.cameras.main.scrollY += dy / factor.y / zoom;

    this.posicion_anterior_de_arrastre = pointer.position.clone();
  }

  obtener_factores() {
    let factor_horizontal = Math.min(1, this.ancho / this.alto);
    let factor_vertical = Math.min(1, this.alto / this.ancho);
    return { x: factor_horizontal, y: factor_vertical };
  }

  update() {
    if (this._anterior_valor_del_modo_posicion_activado !== this.pilas.depurador.modo_posicion_activado) {
      this.actualizar_posicion(this.posicion);
      this._anterior_valor_del_modo_posicion_activado = this.pilas.depurador.modo_posicion_activado;
    }

    if (this.tecla_derecha.isDown) {
      this.avanzar_posicion();
    }

    if (this.tecla_izquierda.isDown) {
      this.retroceder_posicion();
    }

    if (this.pilas.depurador.mostrar_fisica) {
      this.canvas_fisica.setAlpha(1);
    } else {
      this.canvas_fisica.setAlpha(0);
    }
  }

  dibujar_sensores_sobre_canvas_fisica(posicion) {
    let canvas = this.canvas_fisica;
    let foto = this.pilas.historia.obtener_foto(posicion);

    foto.actores.map(entidad => {
      entidad.sensores.map(sensor => {
        this.dibujar_figura_desde_vertices(canvas, 2, 0xff4040, sensor);
      });
    });
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

    if (entidad.hit_activado) {
      sprite.setCrop(entidad.hit_x, entidad.hit_y, entidad.hit_ancho, entidad.hit_alto);
    }

    if (entidad.fijo) {
      sprite.setScrollFactor(0, 0);
    }

    if (entidad.texto) {
      sprite["texto"] = this.pilas.modo.add.bitmapText(0, 0, entidad.fuente, entidad.texto);
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

        // el dialogo es un tipo de fondo especial, que queda mal
        // si el texto está muy arriba.
        if (entidad.fondo.includes("dialogo")) {
          sprite["fondo"].y += 4;
        }

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
      sprite["figura"].es_sensor = entidad.figura_sensor;
      sprite["figura"].es_dinamica = entidad.figura_dinamica;
      sprite["figura"].actor_id = entidad.id;
    }

    return sprite;
  }

  actualizar_posicion(posicion) {
    this.posicion = posicion;
    this.posicion = Math.min(this.posicion, this.total);
    this.posicion = Math.max(this.posicion, 0);

    this.crear_sprites_desde_historia(this.posicion);

    let foto = this.pilas.historia.obtener_foto(this.posicion);
    // Se copia toda la instrumentación para que al enviar el mensaje no se
    // agregen datos al diccionario.
    let instrumentacion = JSON.parse(JSON.stringify(foto.instrumentacion));

    this.pilas.mensajes.emitir_mensaje_al_editor("codigo_ejecutado", instrumentacion);

    this.completar_foto_detallando_actores_nuevos_y_eliminados(foto);

    this.pilas.mensajes.emitir_mensaje_al_editor("aplica_el_cambio_de_posicion_en_el_modo_pausa", { posicion: this.posicion, foto });

    this.actualizar_canvas_fisica();
    this.dibujar_sensores_sobre_canvas_fisica(this.posicion);
  }

  completar_foto_detallando_actores_nuevos_y_eliminados(foto) {
    // Busca en el cuadro anterior a ver si el actor es nuevo.
    if (this.posicion - 1 > 0) {
      let foto_anterior = this.pilas.historia.obtener_foto(this.posicion - 1);
      let nombres = foto_anterior.actores.map(a => a.nombre);

      foto.actores.forEach(actor => {
        actor.es_nuevo = !nombres.includes(actor.nombre);
      });
    }

    // Busca en el siguiente cuadro si el actor se eliminó.
    if (this.posicion + 1 < this.pilas.historia.obtener_cantidad_de_posiciones()) {
      let siguiente_foto = this.pilas.historia.obtener_foto(this.posicion + 1);
      let nombres = siguiente_foto.actores.map(a => a.nombre);

      foto.actores.forEach(actor => {
        actor.se_elimina_en_el_siguiente_cuadro = !nombres.includes(actor.nombre);
      });
    }
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

    this.pilas.historia.dibujar_puntos_de_las_posiciones_recorridas(graphics_modo_pausa, null);
  }

  // Se invoca desde Modo#dibujar_canvas_fisica (del archivo modo.ts)
  dibujar_lasers() {
    let foto = this.pilas.historia.obtener_foto(this.posicion);
    let canvas = this.canvas_fisica;

    foto.actores.map(actor => {
      actor.lasers.map(laser => {
        let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);
        this.dibujar_laser_del_actor(laser, canvas, { x, y, id: actor.id });
      });
    });
  }

  selecciona_actor_o_escena_en_modo_pausa(actor: any) {
    this.seleccion = actor;
    // vuelve a dibujar el canvas por completo.
    this.actualizar_posicion(this.posicion);
    this.graphics_modo_pausa.clear();

    this.pilas.historia.dibujar_puntos_de_las_posiciones_recorridas(this.graphics_modo_pausa, actor);
  }
}
