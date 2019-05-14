/// <reference path="modo.ts"/>

class ModoEditor extends Modo {
  pilas: Pilas;

  constructor() {
    super({ key: "ModoEditor" });
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];
    this.pilas = datos.pilas;

    this.crear_fondo(datos.escena.fondo);
    this.posicionar_la_camara(datos.escena);

    this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
    this.crear_manejadores_para_hacer_arrastrables_los_actores();

    this.matter.world.createDebugGraphic();
    this.conectar_movimiento_del_mouse();
  }

  private conectar_movimiento_del_mouse() {
    this.input.on("pointermove", cursor => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
        cursor.x,
        cursor.y
      );
      this.pilas.cursor_x = Math.trunc(posicion.x);
      this.pilas.cursor_y = Math.trunc(posicion.y);
    });
  }

  crear_manejadores_para_hacer_arrastrables_los_actores() {
    let matter = this.pilas.Phaser.Physics.Matter.Matter;
    let escena = this;

    this.input.on("dragstart", function(pointer, gameObject) {
      escena.pilas.mensajes.emitir_mensaje_al_editor(
        "comienza_a_mover_un_actor",
        { id: gameObject.id }
      );

      if (escena.pilas.utilidades.es_firefox()) {
        escena.input.setDefaultCursor("grabbing");
      } else {
        escena.input.setDefaultCursor("-webkit-grabbing");
      }
    });

    this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;

      if (gameObject.figura) {
        matter.Body.setPosition(gameObject.figura, {
          x: dragX,
          y: dragY
        });
      }
    });

    this.input.on("dragend", function(pointer, gameObject) {
      escena.input.setDefaultCursor("default");

      let posicion = escena.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
        gameObject.x,
        gameObject.y
      );
      escena.pilas.mensajes.emitir_mensaje_al_editor(
        "termina_de_mover_un_actor",
        { id: gameObject.id, x: posicion.x, y: posicion.y }
      );
    });
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

      this.crear_destello(sprite, actor.imagen, () => {
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
  private crear_destello(sprite, imagen, cuando_termina) {
    let sprite2;

    if (imagen.indexOf(":") > -1) {
      let g = imagen.split(":")[0];
      let i = imagen.split(":")[1];

      sprite2 = this.add.sprite(0, 0, g, i);
    } else {
      sprite2 = this.add.sprite(0, 0, imagen);
    }

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
    this.actualizar_sprite_desde_datos(sprite, actor);
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
      this.pilas.Phaser.Physics.Matter.Matter.World.remove(
        this.pilas.modo.matter.world.localWorld,
        actor_a_eliminar[0].figura
      );
    }

    if (actor_a_eliminar[0]["texto"]) {
      actor_a_eliminar[0]["texto"].destroy();
    }

    if (actor_a_eliminar[0]["fondo"]) {
      actor_a_eliminar[0]["fondo"].destroy();
    }

    actor_a_eliminar[0].destroy();
  }
}
