/// <reference path="../libs/pixi.d.ts"/>
/// <reference path="../libs/p2.d.ts"/>
/// <reference path="../libs/phaser.d.ts"/>
/// <reference path="actores.ts" />
/// <reference path="actores/actor.ts" />
/// <reference path="fondos.ts" />
/// <reference path="tipos.ts" />


if (!window['Phaser']) {
  window['Phaser'] = {};
}

let timer = 0;
let __ha_mostrado_version = false;

class Pilas {
  game: Phaser.Game;

  /* Submódulos */
  actores: Actores;
  opciones: OpcionesIniciar;
  fondos: Fondos;
  utils: Utils;
  imagenes: Imagenes;
  depurador: Depurador;
  escenas: Escenas;
  eventos: Eventos;

  evento_inicia: any;
  _cuando_inicia_callback: any;

  codigos: any;
  id_elemento_html: string;
  ha_iniciado: boolean;


  constructor(id_elemento_html: string, opciones: OpcionesIniciar) {

    this.ha_iniciado = false;
    this._verificar_correctitud_de_id_elemento_html(id_elemento_html);
    this.id_elemento_html = id_elemento_html;
    this.ocultar_canvas();

    this.utils = new Utils(this);

    if (!__ha_mostrado_version && !opciones.omitir_impresion_de_version) {
      console.log(`%cpilasengine.js v${VERSION} | http://www.pilas-engine.com.ar`, "color: blue");
      __ha_mostrado_version = true;
    }

    this.codigos = {};
    this.opciones = opciones;

    let self = this;

    let options = {
      preload: function() {
        self.preload();
      },
      create: function() {
        self.create();
      },
      update: function() {
        self.actualizar();
      },
      render: function() {
        self.render();
      }
    };

    let ancho = opciones.ancho || 640;
    let alto = opciones.alto || 480;
    this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, id_elemento_html, options);

    this.evento_inicia = document.createEvent("Event");
  }

  /**
   * Retorna una refencia a la escena en curso.
   */
  get escena_actual() {
    return this.escenas.escena_actual;
  }

  /**
   * Define la cantidad de veces que se actualizarán los actores por segundo.
   *
   * Por omisión este atributo vale 60, porque se actualiza 60 veces por segundo.
   */
  set actualizaciones_por_segundo(valor: number) {
    this.game.time.desiredFps = valor;
  }

  /**
   * Retorna la cantidad de actualizaciones por segundo (generalmente 60).
   */
  get actualizaciones_por_segundo() {
    return this.game.time.desiredFps;
  }

  /**
   * Activa o desactiva el visor de rendimiento o cuadros por segundo.
   *
   * Este indicador es interno de Phaser, la bibliteca multimedia que
   * utiliza pilas, y es independiente a las actualizaciones lógicas
   * que se configuran con la propiedad `actualizaciones_por_segundo`.
   */
  public mostrar_cuadros_por_segundo(estado: boolean) {

    if (estado) {
      this.depurador.activar_modo("fps");
    } else {
      this.depurador.desactivar_modo("fps");
    }

    this.game.time.advancedTiming = estado;
  }

  /**
   * Realiza chequeos para verificar que se tiene acceso al canvas html.
   */
  private _verificar_correctitud_de_id_elemento_html(id_elemento_html: string) {
    if (!id_elemento_html) {
      throw Error(`Tienes que especificar el ID del tag a usar. Algo como pilasengine.iniciar('idElemento')`);
    }

    if (!document.getElementById(id_elemento_html)) {
      throw Error(`No se encuentra el elemento con ID: ${id_elemento_html}`);
    }

    if (document.getElementById(id_elemento_html).tagName !== "DIV") {
      throw Error(`El elemento ID: ${id_elemento_html} tiene que ser un tag DIV.`);
    }
  }

  /**
   * Permite conectar una función a un evento interno de pilas-engine.
   *
   * Los eventos que se pueden conectar son:
   *
   *  - "inicia": Se invoca cuando pilas está listo para ejecutar código.
   */
  cuando(nombre_evento: string, callback: CallBackEvento) {
    if (nombre_evento === "inicia") {
      this._cuando_inicia_callback = callback;

      window.addEventListener("evento_inicia", () => {
        callback();
      });

    } else {
      alert(`El evento ${nombre_evento} no está soportado.`);
    }
  }

  /**
   * Elimina todo objeto de la escena y vuelve a cargar la escena normal.
   */
  reiniciar() {
    this.escenas.normal();
  }

  /**
   * Concatena dos rutas de manera similar a la función os.path.join
   */
  ejecutar() {
    if (this.opciones.en_test) {
      this._cuando_inicia_callback.call(this);
    }
  }

  /**
   * Muestra el contenedor que contiene al juego.
   */
  private mostrar_canvas() {
    document.getElementById(this.id_elemento_html).style.opacity = "1";
  }

  /**
   * Oculta el contenedor que contiene al juego.
   */
  private ocultar_canvas() {
    document.getElementById(this.id_elemento_html).style.opacity = "0";
  }

  preload() {
    this.actores = new Actores(this);
    this.fondos = new Fondos(this);
    this.depurador = new Depurador(this);
    this.escenas = new Escenas(this);
    this.imagenes = new Imagenes(this);
    this.eventos = new Eventos(this);

    this.game.stage.disableVisibilityChange = true;
    this.imagenes.precargar_imagenes_estandar();
    this.mostrar_cuadros_por_segundo(true);
    this.game.input.enabled = false;

    function gameResized(manager: Phaser.ScaleManager, bounds: Phaser.Rectangle) {
      let scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);
      manager.setUserScale(scale, scale, 0, 0);
    }

    if (this.opciones.escalar) {
      this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      this.game.scale.refresh();

      this.game.scale.setResizeCallback(gameResized, this);
    }

  }

  /**
   * Callback iterno que se ejecuta cuando se puede comenzar a ejecutar código.
   */
  create() {
    this.mostrar_canvas();
    this.ha_iniciado = true;

    this.escenas.normal();

    window.dispatchEvent(new CustomEvent("evento_inicia"));
  }

  /**
   * Detiene la actualización lógica del motor.
   */
  pausar() {
    this.escenas.pausar();
  }

  /**
   * Reanuda la actualización lógica del motor.
   */
  continuar() {
    this.escenas.continuar();
  }

  /**
   * Permite permutar el estado de pausa y ejecución.
   */
  alternar_pausa() {
    this.escenas.alternar_pausa();
  }

  /**
   * Realiza una actualización de la lógica del videojuego.
   */
  private actualizar() {
    this.escenas.actualizar();
  }

  /**
   * Realiza el actualizado gráfico.
   */
  render() {
    this.depurador.realizar_dibujado();
  }

  /**
   * Retorna una lista de todos los actores en la escena.
   */
  listar_actores() {
    return this.escena_actual.actores;
  }

  /**
   * Retorna una lista de actores pero especificando
   * el id de cada uno.
   */
  listar_actores_con_ids() {
    return this.escena_actual.actores.map((e) => {
      return {id: e.id, actor: e};
    });
  }

  /**
   * Retorna la cantidad de actores en pantalla (incluyendo al fondo).
   */
  obtener_cantidad_de_actores() {
    return this.listar_actores().length;
  }


  /**
   * Busca entre los actores y retorna el que tenga el ID buscado.
   */
  obtener_actor_por_id(id: number) {
    let actores = this.listar_actores_con_ids();
    let actorBuscado:any = null;

    actores.forEach((e) => {

      if (e.id === id) {
        actorBuscado = e.actor;
      }

    });

    if (actorBuscado) {
      return actorBuscado;
    } else {
      throw new Error(`No se encuentra un actor con el id=${id}`);
    }

  }
}


/**
 * Representa el espacio de nombres para acceder a todos los componentes
 * de pilasengine.
 */
let pilasengine = {

  /**
   * Inicializa la biblioteca completa dentro de un contenedor DIV.
   *
   * @example
   *     var pilas = pilasengine.iniciar("id_del_contenedor");
   *
   * @param {OpcionesIniciar} las opciones de inicialización.
   * @return {Game} el objeto instanciado que representa el contexto del juego.
   * @api public
   */
  iniciar: function(element_id: string, opciones: OpcionesIniciar = {data_path: "data", ancho: null, alto: null, escalar: true, omitir_impresion_de_version: false, en_test: false}) {
    opciones.data_path = opciones["data_path"] || "data";
    opciones.en_test = opciones["en_test"] || false;

    if (opciones["escalar"] === undefined) {
      opciones.escalar = true;
    }

    return new Pilas(element_id, opciones);
  },

  Actor: Actor,
  actor: Actor

};
