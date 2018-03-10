/// <reference path="modo.ts"/>

class ModoEditor extends Modo {
  pilas: Pilas;
  fondo: Phaser.GameObjects.TileSprite;

  // TODO: este debería ser el tamaño de la escena o el proyecto.
  ancho: number = 500;
  alto: number = 500;

  actores: any;
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

  posicionar_la_camara(datos_de_la_escena) {
    this.cameras.cameras[0].x = datos_de_la_escena.camara_x;
    this.cameras.cameras[0].y = datos_de_la_escena.camara_y;
  }

  crear_fondo() {
    this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
    this.fondo.depth = -1000;
    this.fondo.setOrigin(0);
  }

  crear_manejadores_para_hacer_arrastrables_los_actores() {
    let escena = this;

    this.input.on("dragstart", function(pointer, gameObject) {
      // TODO: mostrar este cursor si pasa el mouse sobre un
      //       actor pero no lo arrastra: "-webkit-grab";
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
    });
  }

  crear_actores_desde_los_datos_de_la_escena(escena) {
    escena.actores.map(actor => {
      this.crear_sprite_desde_actor(actor);
    });
  }

  crear_sprite_desde_actor(actor) {
    let sprite = this.add.sprite(actor.x, actor.y, actor.imagen);

    sprite["setInteractive"]();
    sprite["actor"] = actor;

    this.aplicar_atributos_de_actor_a_sprite(actor, sprite);
    this.input.setDraggable(sprite, undefined);
    this.actores.push(sprite);
  }

  aplicar_atributos_de_actor_a_sprite(actor, sprite) {
    sprite.rotacion = actor.rotacion;
    sprite.scaleX = actor.escala_x;
    sprite.scaleY = actor.escala_y;
    sprite.originX = actor.centro_x;
    sprite.originY = actor.centro_y;
    sprite.alpha = 1 - actor.transparencia / 100;
  }

  crear_canvas_de_depuracion() {
    let graphics = this.add.graphics({ x: 0, y: 0 });
    graphics.depth = 200;
    this.graphics = graphics;
  }

  /*
  crear_sistema_de_fisica() {
    this.matter.add.mouseSpring();
    this.matter.world.setBounds(0, 0, this.ancho, this.alto);
  }
  */

  update() {
    if (this.pilas.depurador.mostrar_fps) {
      this.fps.alpha = 1;
      this.fps.text = "FPS: " + Math.round(this.pilas.game.loop.actualFps);
    } else {
      this.fps.alpha = 0;
    }

    this.graphics.clear();

    if (this.pilas.depurador.modo_posicion_activado) {
      this.actores.map(sprite => {
        this.dibujar_punto_de_control(this.graphics, sprite.x, sprite.y);
      });
    }

    //this.fondo.x += 1;
  }

  dibujar_punto_de_control(graphics, x, y) {
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }

  /*
  configuracion.scene.preload = function() {
  };

  configuracion.scene.create = function() {
    self.phaser = this;

    a.setCircle(26);
    a.setBounce(1);

    this.matter.world.setBounds(0, 0, 500, 500);

    this.matter.add.mouseSpring();

    this.matter.world.on("collisionstart", function(event, bodyA, bodyB) {
      if (bodyA.gameObject) {
        bodyA.gameObject.setTint(0xff0000);
      }
      if (bodyB.gameObject) {
        bodyB.gameObject.setTint(0x00ff00);
      }
    });

    let graphics = this.add.graphics({ x: 100, y: 100 });

    graphics.lineStyle(5, 0xff00ff, 1.0);
    graphics.fillStyle(0xff0000, 1.0);
    graphics.beginPath();
    graphics.lineTo(100, 100);
    graphics.lineTo(200, 30);

    graphics.closePath();
    graphics.strokePath();
    graphics.fillPath();
    self.graphics = graphics;

    self.mensajes.emitir_mensaje_al_editor("finaliza_carga_de_recursos", {});
  };

  configuracion.scene.update = function() {};
  */
}
