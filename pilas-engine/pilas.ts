/// <reference path="utilidades.ts"/>

var HOST = "file://";

if (window.location.host) {
  HOST = `http://${window.location.host}`;
}

class Pilas {
  mensajes: Mensajes;
  game: Phaser.Game;
  depurador: Depurador;
  utilidades: Utilidades;

  constructor() {
    this.mensajes = new Mensajes(this);
    this.depurador = new Depurador(this);
    this.utilidades = new Utilidades(this);
  }

  iniciar_phaser(ancho: number, alto: number) {
    let self = this;
    var configuracion = this.crear_configuracion(ancho, alto);

    /*
    configuracion.scene.preload = function() {
      this.load.image("pelota", "imagenes/pelota.png");
      this.load.image("plano", "imagenes/fondos/plano.png");
    };

    configuracion.scene.create = function() {
      self.fondo = this.add.tileSprite(0, 0, 200, 200, "plano");
      self.phaser = this;

      let a = this.matter.add.image(200, 100, "pelota", { mass: 0.1 });
      a.setCircle(26);
      a.setBounce(1);

      this.matter.world.setBounds(0, 0, 500, 500);
      this.matter.add.image(100, 100, "pelota", { restitution: 0 });

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

    var game = new Phaser.Game(configuracion);

    game.scene.add("EscenaEditor", EscenaEditor, false);
    game.scene.add("EscenaCargador", EscenaCargador, false);
    game.scene.add("EscenaEjecucion", EscenaEjecucion, false);
    game.scene.start("EscenaCargador", { pilas: this });

    this.game = game;
  }

  definir_modo(nombre, datos) {
    this.game.scene.stop("EscenaCargador");
    this.game.scene.stop("EscenaEjecutar");
    this.game.scene.stop("EscenaEditor");
    this.game.scene.start(nombre, datos);
  }

  crear_configuracion(ancho, alto) {
    return {
      type: Phaser.AUTO,
      parent: "game",
      width: ancho,
      height: alto,
      backgroundColor: "#5d5d5d",
      physics: {
        default: "matter",
        matter: {
          gravity: {
            y: 1
          },
          debug: true
        }
      }
    };
  }
}

var pilas = new Pilas();
