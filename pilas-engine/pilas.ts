var HOST = "file://";

if (window.location.host) {
  HOST = `http://${window.location.host}`;
}

class Pilas {
  game: Phaser.Game;
  log: Log;
  control: Control;
  actores: Actores;
  depurador: Depurador;
  escenas: Escenas;
  utilidades: Utilidades;

  _ancho: number;
  _alto: number;

  constructor() {
    this.log = new Log(this);
    this.agregar_manejador_de_eventos();
    this.capturar_errores_y_reportarlos_al_editor();

    this.depurador = new Depurador(this);
  }

  iniciar() {
    this.game.state.add("editorState", EstadoEditor);
    this.game.state.add("estadoEjecucion", EstadoEjecucion);
    this.game.state.add("estadoPausa", EstadoPausa);

    this.game.scale.trackParentInterval = 1;

    this.conectar_atajos_de_teclado();

    this.control = new Control(this);
    this.actores = new Actores(this);
    this.escenas = new Escenas(this);
    this.utilidades = new Utilidades(this);


    pilas.game.camera.bounds = null;

    this.escenas.Normal();
  }

  obtener_entidades() {
    return this.game.state.getCurrentState()["entidades"];
  }

  escena_actual() {
    return this.escenas.escena_actual;
  }

  get camara() {
    return this.escena_actual().camara;
  }

  conectar_atajos_de_teclado() {
    this.game.input.keyboard.onUpCallback = evento => {
      if (evento.keyCode == Phaser.Keyboard.ESC && (this.game.state.current === "estadoEjecucion" || this.game.state.current === "estadoPausa")) {
        console.log("pulsa pausa.");
        this.emitir_mensaje_al_editor("cuando_pulsa_escape", {});
      }
    };
  }

  private agregar_manejador_de_eventos() {
    window.addEventListener("message", e => this.antender_mensaje_desde_el_editor(e), false);
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

  private antender_mensaje_desde_el_editor(e: any) {
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

    if (e.data.tipo === "ejecutar_proyecto") {
      this.game.state.start("estadoEjecucion", true, false, {
        pilas: this,
        proyecto: e.data.proyecto,
        nombre_de_la_escena_inicial: e.data.nombre_de_la_escena_inicial,
        codigo: e.data.codigo
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

    if (e.data.tipo === "selecciona_actor_desde_el_editor") {
      let id = +e.data.id;
      let actores = this.obtener_actores();

      let sprites = this.game.state.getCurrentState()['obtener_sprites']();
      let sprite = sprites[id];

      if (sprite) {
        sprite.destacar();
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
      this.iniciar_pilas_desde_el_editor(+e.data.ancho, +e.data.alto);
    }

    if (e.data.tipo === "definir_estados_de_depuracion") {
      this.depurador.modo_posicion_activado = e.data.pos;
      //console.log("En pilas.ts, intenta definir los estados de depuración", e.data);
    }
  }

  iniciar_pilas_desde_el_editor(ancho, alto) {
    this._ancho = ancho;
    this._alto = alto;

    this.game = new Phaser.Game(this._ancho, this._alto, Phaser.AUTO, "game", {
      preload: e => this._preload(),
      create: e => this._create()
    });
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
    this.game.load.image("plano", "imagenes/fondos/plano.png");
    this.game.load.start();
  }

  _cuando_comienza_a_cargar() {}

  _cuando_carga_archivo(progreso) {
    this.emitir_mensaje_al_editor("progreso_de_carga", { progreso });
  }

  _cuando_termina_de_cargar() {
    this.iniciar();
    this.emitir_mensaje_al_editor("finaliza_carga_de_recursos", {});
  }

  emitir_mensaje_al_editor(nombre, datos) {
    datos = datos || {};
    datos.tipo = nombre;
    window.parent.postMessage(datos, HOST);
  }

  emitir_excepcion_al_editor(error) {
    let detalle = {
      mensaje: error.message,
      stack: error.stack.toString()
    };

    this.emitir_mensaje_al_editor("error_de_ejecucion", detalle);
    console.error(error);
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
