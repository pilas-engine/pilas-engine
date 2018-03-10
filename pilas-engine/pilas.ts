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

    var game = new Phaser.Game(configuracion);

    game.scene.add("ModoEditor", ModoEditor, false);
    game.scene.add("ModoCargador", ModoCargador, false);
    game.scene.add("ModoEjecucion", ModoEjecucion, false);
    game.scene.start("ModoCargador", { pilas: this });

    this.game = game;
  }

  definir_modo(nombre, datos) {
    this.game.scene.stop("ModoCargador");
    this.game.scene.stop("EscenaEjecutar");
    this.game.scene.stop("ModoEditor");
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
