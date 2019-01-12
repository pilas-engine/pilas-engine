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

    this.matter.systems.matterPhysics.world.createDebugGraphic();

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
        escena.pilas.game.canvas.style.cursor = "grabbing";
      } else {
        escena.pilas.game.canvas.style.cursor = "-webkit-grabbing";
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
      escena.pilas.game.canvas.style.cursor = "default";
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
    let sprite = this.add.sprite(0, 0, actor.imagen);

    sprite["setInteractive"]();
    sprite["actor"] = actor;
    sprite["destacandose"] = false;

    sprite["destacar"] = () => {
      if (sprite["destacandose"]) {
        return;
      }

      sprite["destacandose"] = true;

      this.tweens.add({
        targets: sprite,
        scaleX: sprite.scaleX + 0.1,
        scaleY: sprite.scaleY + 0.1,
        duration: 100,
        ease: "Power2",
        yoyo: true,
        delay: 0,
        onComplete: function() {
          sprite["destacandose"] = false;
        }
      });
    };

    // la siguiente función además de definir atributos genera la figura para
    // el actor, si aplica.
    this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
    this.input.setDraggable(sprite, undefined);
    this.actores.push(sprite);
  }

  aplicar_atributos_de_actor_a_sprite(actor, sprite) {
    this.actualizar_sprite_desde_datos(sprite, actor);
  }

  update() {
    super.update(this.actores);

    if (this.pilas.depurador.mostrar_fisica) {
      this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(1);
    } else {
      this.matter.systems.matterPhysics.world.debugGraphic.setAlpha(0);
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

    actor_a_eliminar[0].destroy();
    if (actor_a_eliminar[0]["texto"]) {
      actor_a_eliminar[0]["texto"].destroy();
    }
  }
}
