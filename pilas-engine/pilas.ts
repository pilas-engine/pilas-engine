var HOST = "file://";

if (window.location.host) {
  HOST = `http://${window.location.host}`;
}

class Pilas {
  game: Phaser.Game;
  log: Log;

  constructor() {
    this.log = new Log(this);
    this._agregarManejadorDeMensajes();
  }

  obtener_entidades() {
    return this.game.state.getCurrentState()["entidades"];
  }

  /*
   * --------------- Métodos privados -------------------
   */

  _agregarManejadorDeMensajes() {
    window.addEventListener("message", e => this._atenderMensaje(e), false);
  }

  /**
   * El manejador de mensajes se encarga de recibir órdenes de
   * parte del editor.
   */
  _atenderMensaje(e: any) {
    this.log.debug("Llega un mensaje desde el editor: " + e.data.tipo, e);

    if (e.origin != HOST) {
      return;
    }

    if (e.data.tipo === "define_escena") {
      this.game.state.start("editorState", true, false, {
        entidades: e.data.entidades,
        cuando_termina_de_mover: datos => {
          this._emitirMensajeAlEditor("termina_de_mover_un_actor", datos);
        }
      });
    }

    if (e.data.tipo === "iniciar_pilas") {
      var ancho = e.data.ancho;
      var alto = e.data.alto;

      this.game = new Phaser.Game(ancho, alto, Phaser.AUTO, "game", {
        preload: e => this._preload(),
        create: e => this._create()
      });
    }
  }

  _preload() {
    this.game.load.image("ember", "imagenes/ember.png");
    this.game.load.image("pelota", "imagenes/pelota.png");
    this.game.load.image("logo", "imagenes/logo.png");
    this.game.load.image("sin_imagen", "imagenes/sin_imagen.png");
  }

  _create() {
    this.game.stage.disableVisibilityChange = true;
    this.game.state.add("editorState", EstadoEditor);
    this.game.state.add("estadoEjecucion", EstadoEjecucion);

    this._emitirMensajeAlEditor("finaliza_carga_de_recursos", {});
  }

  _emitirMensajeAlEditor(nombre, datos) {
    datos = datos || {};
    datos.tipo = nombre;
    window.parent.postMessage(datos, HOST);
  }
}

var pilas = new Pilas();
