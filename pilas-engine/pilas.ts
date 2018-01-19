var HOST = "file://";

if (window.location.host) {
  HOST = `http://${window.location.host}`;
}

class Pilas {
  game: Phaser.Game;
  log: Log;
  control: Control;
  actores: Actores;

  _ancho: number;
  _alto: number;

  constructor() {
    this.log = new Log(this);
    this._agregarManejadorDeMensajes();
    this.capturar_errores_y_reportarlos_al_editor();
  }

  obtener_entidades() {
    return this.game.state.getCurrentState()["entidades"];
  }

  _conectarAtajosDeTeclado() {
    this.game.input.keyboard.onUpCallback = evento => {
      if (evento.keyCode == Phaser.Keyboard.ESC && (this.game.state.current === "estadoEjecucion" || this.game.state.current === "estadoPausa")) {
        console.log("pulsa pausa.");
        this.emitir_mensaje_al_editor("cuando_pulsa_escape", {});
      }
    };
  }

  _agregarManejadorDeMensajes() {
    window.addEventListener("message", e => this._atenderMensaje(e), false);
  }

  emitir_error_y_detener(error) {
    this.emitir_mensaje_al_editor("error", { mensaje: error.message, stack: error.stack });
    this.game.paused = true;
    console.error(error);
  }

  capturar_errores_y_reportarlos_al_editor() {
    /*
    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
      alert("Error occured: " + errorMsg); //or any message
      return false;
    };
    */
    /*
    window.addEventListener("error", e => {
      console.warn(e);
      this.emitir_mensaje_al_editor("error", { mensaje: e.message });
      e.preventDefault();
      window.location.reload();
    });
    */
    /*
    window.onerror = (e, b) => {
      console.log(e, b);
      this.emitir_mensaje_al_editor("error", { mensaje: e });
      return true;
    };
    */
  }

  _atenderMensaje(e: any) {
    this.log.debug("Llega un mensaje desde el editor: " + e.data.tipo, e);

    if (e.origin != HOST) {
      return;
    }

    if (e.data.tipo === "define_escena") {
      this.game.state.start("editorState", true, false, {
        pilas: this,
        escena: e.data.escena,
        cuando_termina_de_mover: datos => {
          this.emitir_mensaje_al_editor("termina_de_mover_un_actor", datos);
        },
        cuando_comienza_a_mover: datos => {
          this.emitir_mensaje_al_editor("comienza_a_mover_un_actor", datos);
        }
      });
    }

    if (e.data.tipo === "ejecutar_escena") {
      this.game.state.start("estadoEjecucion", true, false, {
        pilas: this,
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
        pilas: this,
        historia: historia,
        cuando_cambia_posicion: datos => {
          this.emitir_mensaje_al_editor("cambia_posicion_dentro_del_modo_pausa", datos);
        }
      });

      let t = historia.length - 1;
      let datos = { minimo: 0, posicion: t, maximo: t };
      this.emitir_mensaje_al_editor("comienza_a_depurar_en_modo_pausa", datos);
    }

    if (e.data.tipo === "iniciar_pilas") {
      this._ancho = +e.data.ancho;
      this._alto = +e.data.alto;

      this.game = new Phaser.Game(this._ancho, this._alto, Phaser.AUTO, "game", {
        preload: e => this._preload(),
        create: e => this._create()
      });
    }
  }

  _preload() {}

  _create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.stage.disableVisibilityChange = true;
    this.game.renderer.renderSession.roundPixels = true;

    this.game.load.onLoadStart.add(this._cuando_comienza_a_cargar, this);
    this.game.load.onFileComplete.add(this._cuando_carga_archivo, this);
    this.game.load.onLoadComplete.add(this._cuando_termina_de_cargar, this);

    this.start();
  }

  start() {
    this.game.load.image("ember", "imagenes/ember.png");
    this.game.load.image("pelota", "imagenes/pelota.png");
    this.game.load.image("logo", "imagenes/logo.png");
    this.game.load.image("sin_imagen", "imagenes/sin_imagen.png");
    this.game.load.image("caja", "imagenes/caja.png");
    this.game.load.image("aceituna", "imagenes/aceituna.png");
    this.game.load.start();
  }

  _cuando_comienza_a_cargar() {
    console.log("comienza a cargar");
  }

  _cuando_carga_archivo(progreso) {
    this.emitir_mensaje_al_editor("progreso_de_carga", { progreso });
  }

  _cuando_termina_de_cargar() {
    this.game.state.add("editorState", EstadoEditor);
    this.game.state.add("estadoEjecucion", EstadoEjecucion);
    this.game.state.add("estadoPausa", EstadoPausa);

    this.game.scale.trackParentInterval = 1;

    this._conectarAtajosDeTeclado();

    this.control = new Control(this);
    this.actores = new Actores(this);

    this.emitir_mensaje_al_editor("finaliza_carga_de_recursos", {});
  }

  emitir_mensaje_al_editor(nombre, datos) {
    datos = datos || {};
    datos.tipo = nombre;
    window.parent.postMessage(datos, HOST);
  }

  obtener_actores() {
    return pilas.game.world.children.map(s => s["actor"]).filter(s => s !== undefined);
  }

  obtener_cantidad_de_actores() {
    return this.obtener_actores().length;
  }

  obtener_actores_en(_x: number, _y: number) {
    let actores = this.obtener_actores();

    let { x, y } = this.convertir_coordenada_de_pilas_a_phaser(_x, _y);

    return actores.filter(actor => {
      return actor.sprite.getBounds().contains(x - actor.sprite.x, y - actor.sprite.y);
    });
  }

  convertir_coordenada_de_pilas_a_phaser(x, y) {
    return { x: x + this._ancho / 2, y: this._alto / 2 - y };
  }

  convertir_coordenada_de_phaser_a_pilas(x, y) {
    return { x: x - this._ancho / 2, y: this._ancho / 2 - y };
  }
}

var pilas = new Pilas();
