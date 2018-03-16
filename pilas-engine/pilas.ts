/// <reference path="utilidades.ts"/>

var HOST = "file://";

if (window.location.host) {
  HOST = `http://${window.location.host}`;
}

class Pilas {
  game: Phaser.Game;

  mensajes: Mensajes;
  depurador: Depurador;
  utilidades: Utilidades;
  escenas: Escenas;
  control: Control;
  historia: Historia;
  sonidos: any;
  actores: Actores;

  modo: any;
  _ancho: number;
  _alto: number;

  constructor() {
    this.mensajes = new Mensajes(this);
    this.depurador = new Depurador(this);
    this.utilidades = new Utilidades(this);
    this.escenas = new Escenas(this);
    this.historia = new Historia(this);
    this.sonidos = {};
    this.actores = new Actores(this);
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
    game.scene.add("ModoPausa", ModoPausa, false);

    this.control = new Control(this);
    this.definir_modo("ModoCargador", { pilas: this });
  }

  definir_modo(nombre, datos) {
    this.game.scene.stop("ModoCargador");
    this.game.scene.stop("ModoEjecucion");
    this.game.scene.stop("ModoEditor");
    this.game.scene.stop("ModoPausa");

    this.game.scene.start(nombre, datos);
    this.modo = this.game.scene.getScene(nombre);
  }

  crear_configuracion(ancho, alto) {
    return {
      type: Phaser.AUTO,
      parent: "game",
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

  reproducir_sonido(nombre: string) {
    var music = this.modo.sound.add(nombre);
    music.play();
  }

  obtener_actores() {
    return this.escena.actores;
  }

  obtener_cantidad_de_actores() {
    return this.obtener_actores().length;
  }

  obtener_actores_en(_x: number, _y: number) {
    let { x, y } = this.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y);
    let actores = this.obtener_actores();

    return actores.filter(actor => {
      return actor.sprite.getBounds()["contains"](x, y);
    });
  }

  escena_actual() {
    return this.escena;
  }
}

var pilas = new Pilas();
