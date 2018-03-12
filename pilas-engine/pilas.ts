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
  escenas: Escenas;
  modo: any;
  _ancho: number;
  _alto: number;

  constructor() {
    this.mensajes = new Mensajes(this);
    this.depurador = new Depurador(this);
    this.utilidades = new Utilidades(this);
    this.escenas = new Escenas(this);
  }

  get escena() {
    return this.escenas.escena_actual;
  }

  iniciar_phaser(ancho: number, alto: number) {
    let self = this;
    var configuracion = this.crear_configuracion(ancho, alto);

    var game = new Phaser.Game(configuracion);
    this._ancho = ancho;
    this._alto = alto;
    this.game = game;

    game.scene.add("ModoEditor", ModoEditor, false);
    game.scene.add("ModoCargador", ModoCargador, false);
    game.scene.add("ModoEjecucion", ModoEjecucion, false);

    this.definir_modo("ModoCargador", { pilas: this });
  }

  definir_modo(nombre, datos) {
    this.game.scene.stop("ModoCargador");
    this.game.scene.stop("ModoEjecucion");
    this.game.scene.stop("ModoEditor");
    this.game.scene.start(nombre, datos);
    this.modo = this.game.scene.getScene(nombre);
  }

  crear_configuracion(ancho, alto) {
    return {
      type: Phaser.AUTO,
      parent: "game",
      zoom: 1,
      width: ancho,
      height: alto,
      backgroundColor: "#5d5d5d",
      disableContextMenu: true,
      input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: true
      },
      pixelart: false,
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
