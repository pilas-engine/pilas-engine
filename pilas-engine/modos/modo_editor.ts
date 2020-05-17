/// <reference path="modo.ts"/>

class ModoEditor extends Modo {
  pilas: Pilas;
  minimap: Phaser.Cameras.Scene2D.Camera;
  sprite_borde_de_la_camara: Phaser.GameObjects.Sprite;
  usar_grilla: boolean;
  sprite_cursor_de_la_grilla: Phaser.GameObjects.Sprite;
  tamaño_de_la_grilla: number;

  constructor() {
    super({ key: "ModoEditor" });
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];
    this.pilas = datos.pilas;

    // Estos valores se re-definen ni bien el editor carga la
    // escena de edición, con la señal cuando_cambia_grilla_desde_el_selector_manual.
    this.usar_grilla = false;
    this.tamaño_de_la_grilla = 256;
    this.crear_sprite_para_el_cursor_de_la_grilla();

    this.crear_fondo(datos.escena.fondo, datos.escena.ancho, datos.escena.alto);
    this.posicionar_la_camara(datos.escena);
    this.aplicar_limites_a_la_camara(datos.escena);

    this.crear_minimap(datos.escena);
    this.crear_sprite_con_el_borde_de_la_camara(datos.escena);

    this.crear_actores_desde_los_datos_de_la_escena(datos.escena);

    this.hacer_que_el_fondo_se_pueda_arrastrar();

    this.crear_manejadores_para_hacer_arrastrables_los_actores_y_la_camara();
    this.crear_manejadores_para_controlar_el_zoom(true);

    //this.matter.world.createDebugGraphic();
    this.conectar_movimiento_del_mouse();
    this.conectar_eventos_de_teclado();

    this.pilas.game.scale.scaleMode = Phaser.Scale.FIT;
    this.pilas.game.scale.resize(this.ancho, this.alto);

    // Para que el canvas ocupe toda el area visible deberían ejecutarse
    // estas sentencias.
    //this.pilas.game.scale.scaleMode = Phaser.Scale.RESIZE;
    //(<any>this.pilas.game.scale).resize();
    //(<any>this.pilas.game.canvas.style) = "";
  }

  private conectar_eventos_de_teclado() {
    this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
  }

  crear_fondo(fondo, ancho = null, alto = null) {
    this._nombre_del_fondo = fondo;
    this.pilas.utilidades.validar_que_existe_imagen(fondo);

    // Espera el tamaño de escenario de la escena, pero si no
    // se define una el area de pantalla del proyecto.
    ancho = ancho || this.ancho;
    alto = alto || this.alto;

    // TODO: reemplazar por una función propia que obtenga la galería
    if (fondo.indexOf(":") > -1) {
      let g = fondo.split(":")[0];
      let i = fondo.split(":")[1];

      this.fondo = this.add.tileSprite(0, 0, ancho, alto, g, i);
    } else {
      this.fondo = this.add.tileSprite(0, 0, ancho, alto, fondo);
    }

    this.fondo.depth = -20000;
    this.fondo.setOrigin(0);
  }

  private manejar_evento_key_up(evento) {
    if (evento.key === "d") {
      this.pilas.mensajes.emitir_mensaje_al_editor("duplicar_el_actor_seleccionado", {});
    }

    if (evento.key === "x") {
      this.pilas.mensajes.emitir_mensaje_al_editor("eliminar_el_actor_seleccionado", {});
    }

    if (evento.key === "n") {
      this.pilas.mensajes.emitir_mensaje_al_editor("crear_un_actor_desde_atajo", {});
    }
  }

  crear_sprite_para_el_cursor_de_la_grilla() {
    let x = 0;
    let y = 0;

    if (this.sprite_cursor_de_la_grilla) {
      x = this.sprite_cursor_de_la_grilla.x;
      y = this.sprite_cursor_de_la_grilla.y;

      this.sprite_cursor_de_la_grilla.destroy();
    }

    let sprite = <any>this.add.rectangle(x, y, this.tamaño_de_la_grilla, this.tamaño_de_la_grilla);
    (<any>sprite).setStrokeStyle(1, 0xffffff);
    sprite.depth = 9999999;

    this.sprite_cursor_de_la_grilla = sprite;
  }

  crear_minimap(escena) {
    let game = this;
    let w = 100;
    let h = 70;
    let p = 5; // padding con los bordes
    let width = this.ancho;
    let height = this.alto;
    let ancho_del_escenario = escena.ancho;
    let alto_del_escenario = escena.alto;

    this.minimap = <any>game.cameras.add(width - w - p, height - h - p, w, h).setZoom(0.1);
    this.minimap.setBounds(0, 0, ancho_del_escenario, alto_del_escenario);
    this.minimap.setBackgroundColor(0x002244);
    this.minimap.scrollX = 0;
    this.minimap.scrollY = 0;

    this.minimap.inputEnabled = false;
    this.minimap.ignore(this.fondo);
    this.minimap.ignore(this.fps);
  }

  crear_sprite_con_el_borde_de_la_camara({ camara_x, camara_y }) {
    this.sprite_borde_de_la_camara = <any>this.add.rectangle(this.ancho / 2, this.alto / 2, this.ancho, this.alto);
    (<any>this.sprite_borde_de_la_camara).setStrokeStyle(3, 0xffffff);
    this.sprite_borde_de_la_camara.depth = 999999;

    this.sprite_borde_de_la_camara.x = camara_x + this.ancho / 2;
    this.sprite_borde_de_la_camara.y = -camara_y + this.alto / 2;

    // Evita que el borde se vea en la cámara principal.
    this.cameras.cameras[0].ignore(this.sprite_borde_de_la_camara);
  }

  hacer_que_el_fondo_se_pueda_arrastrar() {
    // Tener en cuenta que con el siguiente código el fondo
    // de pantalla se puede mover gracias al método
    // "crear_manejadores_para_hacer_arrastrables_los_actores_y_la_camara"
    this.fondo.setInteractive();
    this.input.setDraggable(this.fondo, undefined);
    this.fondo["es_fondo"] = true;
  }

  aplicar_limites_a_la_camara(escena) {
    this.cameras.cameras[0].setBounds(0, 0, escena.ancho, escena.alto);
  }

  private conectar_movimiento_del_mouse() {
    this.input.on("pointermove", evento => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
      this.pilas.cursor_x = Math.trunc(posicion.x);
      this.pilas.cursor_y = Math.trunc(posicion.y);

      let posicion_absoluta = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
      this.pilas.cursor_x_absoluta = Math.trunc(posicion_absoluta.x);
      this.pilas.cursor_y_absoluta = Math.trunc(posicion_absoluta.y);
    });
  }

  crear_manejadores_para_hacer_arrastrables_los_actores_y_la_camara() {
    let escena = this;

    this.input.on("dragstart", (pointer, gameObject) => {
      this.mover_cursor_de_la_grilla(pointer.worldX, pointer.worldY);
      this.posicion_anterior_de_arrastre = pointer.position.clone();

      if (!gameObject["es_fondo"]) {
        escena.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_mover_un_actor", { id: gameObject.id });
      }

      if (escena.pilas.utilidades.es_firefox()) {
        escena.input.setDefaultCursor("grabbing");
      } else {
        escena.input.setDefaultCursor("-webkit-grabbing");
      }
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (gameObject["es_fondo"]) {
        this.desplazar_la_camara_desde_el_evento_drag(pointer);
      } else {
        this.desplazar_actor_desde_el_evento_drag(gameObject, pointer);
      }
    });

    this.input.on("dragend", (pointer, gameObject) => {
      escena.input.setDefaultCursor("default");

      if (!gameObject["es_fondo"]) {
        if (this.usar_grilla) {
          this.ajustar_posicion_a_la_grilla(gameObject);
        }

        let posicion = escena.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(gameObject.x, gameObject.y);
        escena.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", { id: gameObject.id, x: posicion.x, y: posicion.y });
      }
    });
  }

  ajustar_posicion_a_la_grilla(gameObject) {
    gameObject.x = this.sprite_cursor_de_la_grilla.x;
    gameObject.y = this.sprite_cursor_de_la_grilla.y;
    this.ajustar_figura(gameObject);
    this.ajustar_sensores(gameObject);
  }

  cuando_cambia_grilla_desde_el_selector_manual(grilla) {
    if (grilla === 0) {
      this.usar_grilla = false;
      this.tamaño_de_la_grilla = 0;
    } else {
      this.usar_grilla = true;
      this.tamaño_de_la_grilla = grilla;
    }

    this.crear_sprite_para_el_cursor_de_la_grilla();

    if (grilla === 0) {
      this.sprite_cursor_de_la_grilla.alpha = 0;
    } else {
      this.sprite_cursor_de_la_grilla.alpha = 1;
    }
  }

  desplazar_la_camara_desde_el_evento_drag(pointer) {
    let zoom = this.cameras.main.zoom;
    let factor = this.obtener_factores();
    let dx = this.posicion_anterior_de_arrastre.x - pointer.position.x;
    let dy = this.posicion_anterior_de_arrastre.y - pointer.position.y;

    this.cameras.main.scrollX += dx / factor.x / zoom;
    this.cameras.main.scrollY += dy / factor.y / zoom;

    this.posicion_anterior_de_arrastre = pointer.position.clone();

    this.actualizar_posicion_del_minimap_y_el_borde_de_camara();
  }

  obtener_factores() {
    let factor_horizontal = Math.min(1, this.ancho / this.alto);
    let factor_vertical = Math.min(1, this.alto / this.ancho);
    return { x: factor_horizontal, y: factor_vertical };
  }

  desplazar_actor_desde_el_evento_drag(gameObject, pointer) {
    let zoom = this.cameras.main.zoom;
    let factor = this.obtener_factores();

    let dx = (pointer.position.x - this.posicion_anterior_de_arrastre.x) / factor.x / zoom;
    let dy = (pointer.position.y - this.posicion_anterior_de_arrastre.y) / factor.y / zoom;

    gameObject.x += dx;
    gameObject.y += dy;

    this.mover_cursor_de_la_grilla(gameObject.x, gameObject.y);

    this.ajustar_figura(gameObject);
    this.ajustar_sensores(gameObject);

    this.posicion_anterior_de_arrastre = pointer.position.clone();
  }

  ajustar_figura(gameObject) {
    let matter = this.pilas.Phaser.Physics.Matter.Matter;
    if (gameObject.figura) {
      let figura = gameObject.figura;

      matter.Body.setPosition(figura, {
        x: gameObject.x,
        y: gameObject.y
      });
    }
  }

  ajustar_sensores(sprite) {
    let matter = this.pilas.Phaser.Physics.Matter.Matter;

    if (sprite.sensores) {
      sprite.sensores.map(sensor => {
        matter.Body.setPosition(sensor, {
          x: sprite.x + sensor.dx,
          y: sprite.y - sensor.dy
        });
      });
    }
  }

  mover_cursor_de_la_grilla(x, y) {
    this.sprite_cursor_de_la_grilla.x = Math.round(x / this.tamaño_de_la_grilla) * this.tamaño_de_la_grilla;
    this.sprite_cursor_de_la_grilla.y = Math.round(y / this.tamaño_de_la_grilla) * this.tamaño_de_la_grilla;
  }

  actualizar_posicion_del_minimap_y_el_borde_de_camara(emitir_evento = true) {
    let { x, y } = this.obtener_posicion_de_desplazamiento_de_la_camara();

    this.sprite_borde_de_la_camara.x = x + this.ancho / 2;
    this.sprite_borde_de_la_camara.y = y + this.alto / 2;

    this.minimap.scrollX = x + this.ancho / 2;
    this.minimap.scrollY = y + this.alto / 2;

    if (emitir_evento) {
      this.pilas.mensajes.emitir_mensaje_al_editor("mientras_mueve_la_camara", { x, y: -y });
    }
  }

  obtener_posicion_de_desplazamiento_de_la_camara() {
    let camara = this.cameras.main;
    let x = camara.scrollX;
    let y = camara.scrollY;

    let width = this.ancho;
    let height = this.alto;

    let bordes = camara.getBounds();

    if (x < bordes.x) {
      x = bordes.x;
    }

    if (x > bordes.width - width) {
      x = bordes.width - width;
    }

    if (y < bordes.y) {
      y = bordes.y;
    }

    if (y > bordes.height - height) {
      y = bordes.height - height;
    }

    return { x, y };
  }

  crear_actores_desde_los_datos_de_la_escena(escena) {
    escena.actores.map(actor => {
      this.crear_sprite_desde_actor(actor);
    });
  }

  crear_sprite_desde_actor(actor) {
    this.pilas.utilidades.validar_que_existe_imagen(actor.imagen);
    let sprite = null;

    if (actor.imagen.indexOf(":") > -1) {
      let g = actor.imagen.split(":")[0];
      let i = actor.imagen.split(":")[1];

      sprite = this.add.sprite(0, 0, g, i);
    } else {
      sprite = this.add.sprite(0, 0, actor.imagen);
    }

    sprite["setInteractive"]();
    sprite["actor"] = actor;
    sprite["destacandose"] = false;

    sprite["destacar"] = () => {
      sprite["destacandose"] = true;

      this.crear_destello(sprite, () => {
        sprite["destacandose"] = false;
      });
    };

    // la siguiente función además de definir atributos genera la figura para
    // el actor, si aplica.
    this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
    this.input.setDraggable(sprite, undefined);
    this.actores.push(sprite);
  }

  /**
   * Realiza un efecto de destello blanco para indicar que se selecciona al actor.
   */
  private crear_destello(sprite, cuando_termina) {
    let t = sprite.texture;
    let cuadro = sprite.frame.name;
    let sprite2 = this.add.sprite(0, 0, t.key, cuadro);

    this.copiar_atributos_excepto_alpha(sprite, sprite2);
    sprite2.setTintFill(0xffffff);
    sprite2.setAlpha(0.4);

    this.tweens.add({
      targets: sprite2,
      alpha: 0.7,
      duration: 100,
      ease: "Power2",
      yoyo: true,
      delay: 0,
      onUpdate: () => {
        this.copiar_atributos_excepto_alpha(sprite, sprite2);
      },
      onComplete: function() {
        sprite2.destroy();
        cuando_termina();
      }
    });
  }

  private copiar_atributos_excepto_alpha(origen, destino) {
    destino.x = origen.x;
    destino.y = origen.y;
    destino.angle = origen.angle;
    destino.scaleX = origen.scaleX;
    destino.scaleY = origen.scaleY;

    destino.flipX = origen.flipX;
    destino.flipY = origen.flipY;
    destino.depth = origen.depth;

    destino.setOrigin(origen.originX, origen.originY);
  }

  aplicar_atributos_de_actor_a_sprite(actor, sprite) {
    this.actualizar_sprite_desde_datos(sprite, actor); // ver superclase 'modo'
  }

  update() {
    super.update(this.actores);

    if (this.pilas.depurador.minimapa) {
      this.minimap.setAlpha(1);
    } else {
      this.minimap.setAlpha(0);
    }

    this.actores.map(a => {
      a.update();
    });

    this.minimap.y = this.scale.baseSize.height - 75;
    this.minimap.x = this.scale.baseSize.width - 105;

    if (this.pilas.depurador.mostrar_fisica) {
      this.canvas_fisica.setAlpha(1);
      this.actualizar_canvas_fisica();
    } else {
      this.canvas_fisica.setAlpha(0);
    }
  }

  eliminar_actor_por_id(id) {
    let indice = this.actores.findIndex(e => e.id === id);
    let actor_a_eliminar = this.actores.splice(indice, 1);

    if (actor_a_eliminar[0].figura) {
      this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, actor_a_eliminar[0].figura);
    }

    if (actor_a_eliminar[0].sensores) {
      actor_a_eliminar[0].sensores.map(sensor => {
        this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, sensor);
      });
    }

    if (actor_a_eliminar[0]["texto"]) {
      actor_a_eliminar[0]["texto"].destroy();
    }

    if (actor_a_eliminar[0]["fondo"]) {
      actor_a_eliminar[0]["fondo"].destroy();
    }

    actor_a_eliminar[0].destroy();
  }

  posicionar_la_camara(datos_de_la_escena) {
    // Este método sobre-escribe al método de la clase modo.
    this.cameras.cameras[0].setScroll(datos_de_la_escena.camara_x, -datos_de_la_escena.camara_y);

    try {
      this.actualizar_posicion_del_minimap_y_el_borde_de_camara(false);
    } catch (e) {}
  }

  cambiar_fondo(fondo) {
    let ancho = this.cameras.main.getBounds().width;
    let alto = this.cameras.main.getBounds().height;

    super.cambiar_fondo(fondo, ancho, alto);
    this.minimap.ignore(this.fondo);
    this.hacer_que_el_fondo_se_pueda_arrastrar();
  }
}
