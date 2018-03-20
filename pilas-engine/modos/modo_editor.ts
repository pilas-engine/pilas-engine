/// <reference path="modo.ts"/>

class ModoEditor extends Modo {
  pilas: Pilas;
  fondo: Phaser.GameObjects.TileSprite;

  // TODO: este debería ser el tamaño de la escena o el proyecto.
  ancho: number = 500;
  alto: number = 500;

  graphics: any;
  fps: any;

  preload() {}

  create(datos) {
    this.actores = [];
    this.pilas = datos.pilas;
    this.crear_fondo();
    this.crear_canvas_de_depuracion();
    this.posicionar_la_camara(datos.escena);

    this.crear_actores_desde_los_datos_de_la_escena(datos.escena);
    this.crear_manejadores_para_hacer_arrastrables_los_actores();

    this.fps = this.add.bitmapText(5, 5, "verdana3", "FPS");
  }

  crear_fondo() {
    this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
    this.fondo.depth = -1000;
    this.fondo.setOrigin(0);
  }

  crear_manejadores_para_hacer_arrastrables_los_actores() {
    let escena = this;

    this.input.on("dragstart", function(pointer, gameObject) {
      escena.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_mover_un_actor", { id: gameObject.id });

      if (escena.pilas.utilidades.es_firefox()) {
        escena.pilas.game.canvas.style.cursor = "grabbing";
      } else {
        escena.pilas.game.canvas.style.cursor = "-webkit-grabbing";
      }
    });

    this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", function(pointer, gameObject) {
      escena.pilas.game.canvas.style.cursor = "default";
      let posicion = escena.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(gameObject.x, gameObject.y);
      escena.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", { id: gameObject.id, x: posicion.x, y: posicion.y });
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

    this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
    this.input.setDraggable(sprite, undefined);
    this.actores.push(sprite);
  }

  aplicar_atributos_de_actor_a_sprite(actor, sprite) {
    this.actualizar_sprite_desde_datos(sprite, actor);
  }

  crear_canvas_de_depuracion() {
    let graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.depth = 200;
    this.graphics = graphics;
  }

  update() {
    this.graphics.clear();

    if (this.pilas.depurador.mostrar_fps) {
      this.fps.alpha = 1;
      this.fps.text = "FPS: " + Math.round(this.pilas.game.loop["actualFps"]);
    } else {
      this.fps.alpha = 0;
    }

    if (this.pilas.depurador.modo_posicion_activado) {
      this.actores.map(sprite => {
        this.dibujar_punto_de_control(this.graphics, sprite.x, sprite.y);
      });
    }
  }

  dibujar_punto_de_control(graphics, x, y) {
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }

  eliminar_actor_por_id(id) {
    let indice = this.actores.findIndex(e => e.id === id);
    let actor_a_eliminar = this.actores.splice(indice, 1);
    actor_a_eliminar[0].destroy();
  }
}
