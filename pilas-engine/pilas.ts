var HOST = "file://";

if (window.location.host) {
  HOST = `http://${window.location.host}`;
}

class Pilas {
  game: Phaser.Game;
  log: Log;
  control: Control;

  constructor() {
    this.log = new Log(this);
    this._agregarManejadorDeMensajes();
  }

  obtener_entidades() {
    return this.game.state.getCurrentState()["entidades"];
  }

  _conectarAtajosDeTeclado() {
    this.game.input.keyboard.onUpCallback = evento => {
      if (evento.keyCode == Phaser.Keyboard.ESC && (this.game.state.current === "estadoEjecucion" || this.game.state.current === "estadoPausa")) {
        console.log("pulsa pausa.");
        this._emitirMensajeAlEditor("cuando_pulsa_escape", {});
      }
    };
  }

  _agregarManejadorDeMensajes() {
    window.addEventListener("message", e => this._atenderMensaje(e), false);
  }

  _atenderMensaje(e: any) {
    this.log.debug("Llega un mensaje desde el editor: " + e.data.tipo, e);

    if (e.origin != HOST) {
      return;
    }

    if (e.data.tipo === "define_escena") {
      this.game.state.start("editorState", true, false, {
        escena: e.data.escena,
        cuando_termina_de_mover: datos => {
          this._emitirMensajeAlEditor("termina_de_mover_un_actor", datos);
        },
        cuando_comienza_a_mover: datos => {
          this._emitirMensajeAlEditor("comienza_a_mover_un_actor", datos);
        }
      });
    }

    if (e.data.tipo === "ejecutar_escena") {
      this.game.state.start("estadoEjecucion", true, false, {
        escena: e.data.escena,
        codigo: e.data.codigo
      });
    }

    if (e.data.tipo === "cambiar_posicion") {
      let pos = +e.data.posicion;
      if (this.game.state.getCurrentState()["actualizarPosicionDeFormaExterna"]) {
        this.game.state.getCurrentState()["actualizarPosicionDeFormaExterna"](pos);
      }
    }

    if (e.data.tipo === "pausar_escena") {
      let historia = this.game.state.getCurrentState()["historia"];

      this.game.state.start("estadoPausa", true, false, {
        historia: historia,
        cuando_cambia_posicion: datos => {
          this._emitirMensajeAlEditor("cambia_posicion_dentro_del_modo_pausa", datos);
        }
      });

      let t = historia.length - 1;
      let datos = { minimo: 0, posicion: t, maximo: t };
      this._emitirMensajeAlEditor("comienza_a_depurar_en_modo_pausa", datos);
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
    this.game.load.image("caja", "imagenes/caja.png");
    this.game.load.image("aceituna", "imagenes/aceituna.png");
  }

  _create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.stage.disableVisibilityChange = true;
    this.game.renderer.renderSession.roundPixels = true;
    this.game.state.add("editorState", EstadoEditor);
    this.game.state.add("estadoEjecucion", EstadoEjecucion);
    this.game.state.add("estadoPausa", EstadoPausa);

    this.game.scale.trackParentInterval = 1;

    this._emitirMensajeAlEditor("finaliza_carga_de_recursos", {});
    this._conectarAtajosDeTeclado();

    this.control = new Control(this);
  }

  _emitirMensajeAlEditor(nombre, datos) {
    datos = datos || {};
    datos.tipo = nombre;
    window.parent.postMessage(datos, HOST);
  }
}

var pilas = new Pilas();
