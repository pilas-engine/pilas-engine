/// <reference path="modo.ts"/>

class ModoEditor extends Modo {
  pilas: Pilas;
  minimap: Phaser.Cameras.Scene2D.Camera;
  sprite_borde_de_la_camara: Phaser.GameObjects.Sprite;
  posicion_anterior_de_arrastre: any;

  constructor() {
    super({ key: "ModoEditor" });
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];
    this.pilas = datos.pilas;

    this.crear_fondo(datos.escena.fondo, datos.escena.ancho, datos.escena.alto);
    this.posicionar_la_camara(datos.escena);
    this.aplicar_limites_a_la_camara(datos.escena);

    this.crear_minimap(datos.escena);
    this.crear_sprite_con_el_borde_de_la_camara(datos.escena);

    this.crear_actores_desde_los_datos_de_la_escena(datos.escena);

    this.hacer_que_el_fondo_se_pueda_arrastrar();

    this.crear_manejadores_para_hacer_arrastrables_los_actores_y_la_camara();

    this.matter.world.createDebugGraphic();
    this.conectar_movimiento_del_mouse();
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

    this.minimap.ignore(this.fondo);
    this.minimap.ignore(this.fps);
    this.minimap.ignore(this.fps_extra);
  }

  crear_sprite_con_el_borde_de_la_camara({ camara_x, camara_y }) {
    this.sprite_borde_de_la_camara = <any>this.add.rectangle(this.ancho / 2, this.alto / 2, this.ancho, this.alto);
    (<any>this.sprite_borde_de_la_camara).setStrokeStyle(3, 0xffffff);
    this.sprite_borde_de_la_camara.depth = 999999;

    this.sprite_borde_de_la_camara.x = camara_x + this.ancho / 2;
    this.sprite_borde_de_la_camara.y = -camara_y + this.alto / 2;
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
      if (gameObject["es_fondo"]) {
        this.posicion_anterior_de_arrastre = pointer.position.clone();
      } else {
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
        this.desplazar_actor_desde_el_evento_drag(gameObject, dragX, dragY);
      }
    });

    this.input.on("dragend", (pointer, gameObject) => {
      escena.input.setDefaultCursor("default");

      if (!gameObject["es_fondo"]) {
        let posicion = escena.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(gameObject.x, gameObject.y);
        escena.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", { id: gameObject.id, x: posicion.x, y: posicion.y });
      }
    });
  }

  desplazar_la_camara_desde_el_evento_drag(pointer) {
    this.cameras.main.scrollX += this.posicion_anterior_de_arrastre.x - pointer.position.x;
    this.cameras.main.scrollY += this.posicion_anterior_de_arrastre.y - pointer.position.y;

    this.posicion_anterior_de_arrastre = pointer.position.clone();

    this.actualizar_posicion_del_minimap_y_el_borde_de_camara();
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

  desplazar_actor_desde_el_evento_drag(gameObject, dragX, dragY) {
    let matter = this.pilas.Phaser.Physics.Matter.Matter;
    gameObject.x = dragX;
    gameObject.y = dragY;

    if (gameObject.figura) {
      matter.Body.setPosition(gameObject.figura, {
        x: dragX,
        y: dragY
      });
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

    if (this.pilas.depurador.mostrar_fisica) {
      this.matter.world.debugGraphic.setAlpha(1);
    } else {
      this.matter.world.debugGraphic.setAlpha(0);
    }

    this.actores.map(a => {
      a.update();
    });
  }

  eliminar_actor_por_id(id) {
    let indice = this.actores.findIndex(e => e.id === id);
    let actor_a_eliminar = this.actores.splice(indice, 1);

    if (actor_a_eliminar[0].figura) {
      this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, actor_a_eliminar[0].figura);
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
    console.log(ancho, alto);
    this.minimap.ignore(this.fondo);
    this.hacer_que_el_fondo_se_pueda_arrastrar();
  }
}
