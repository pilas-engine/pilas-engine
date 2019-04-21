/// <reference path="utilidades.ts"/>

var HOST = "file://";

if (window.location.host) {
  HOST = window.location.origin;
}

class Pilas {
  game: Phaser.Game;

  mensajes: Mensajes;
  depurador: Depurador;
  utilidades: Utilidades;
  escenas: Escenas;
  historia: Historia;
  sonidos: any;
  actores: Actores;
  animaciones: Animaciones;
  Phaser: any;

  eventos: Eventos;

  recursos: any;

  fisica: Fisica;
  habilidades: Habilidades;

  modo: any;
  _ancho: number;
  _alto: number;

  cursor_x: number = 0;
  cursor_y: number = 0;
  opciones: any;

  constructor() {
    this.Phaser = Phaser;

    this.mensajes = new Mensajes(this);
    this.depurador = new Depurador(this);
    this.utilidades = new Utilidades(this);
    this.escenas = new Escenas(this);
    this.historia = new Historia(this);
    this.sonidos = {};
    this.actores = new Actores(this);
    this.animaciones = new Animaciones(this);
    this.fisica = new Fisica(this);
    this.habilidades = new Habilidades(this);
    this.eventos = new Eventos(this);
  }

  get escena(): EscenaBase {
    return this.escenas.escena_actual;
  }

  set escena(v: EscenaBase) {
    this.utilidades.acceso_incorrecto("escena");
  }

  get control(): Control {
    return this.escena.control;
  }

  set control(c: Control) {
    this.utilidades.acceso_incorrecto("control");
  }

  iniciar_phaser(ancho: number, alto: number, recursos: any, opciones: any) {
    if (opciones.maximizar === undefined) {
      opciones.maximizar = true;
    }

    this.opciones = opciones;

    if (!recursos) {
      throw Error(
        "No se puede iniciar phaser sin especificar una lista de recursos"
      );
    }

    this._ancho = ancho;
    this._alto = alto;

    this.recursos = recursos;
    var configuracion = this.crear_configuracion(
      ancho,
      alto,
      opciones.maximizar
    );

    // Opción para simular una espera o demora al iniciar el componente de
    // pilas, se utiliza desde el editor cuando corren los tests.
    if (opciones.esperar_antes_de_iniciar) {
      console.log("Esperando 1 segundo antes de iniciar ...");
      setTimeout(() => {
        this.iniciar_phaser_desde_configuracion_y_cargar_escenas(configuracion);
      }, 1000);
    } else {
      this.iniciar_phaser_desde_configuracion_y_cargar_escenas(configuracion);
    }
  }

  iniciar(ancho: number, alto: number, recursos: any, opciones: any = {}) {
    if (opciones === undefined || recursos === null) {
      opciones = {};
    }

    if (recursos === undefined || recursos === null) {
      recursos = {
        imagenes: [
          {
            nombre: "sin_imagen",
            ruta: "imagenes/sin_imagen.png"
          }
        ],
        sonidos: [],

        fuentes: [
          {
            nombre: "font",
            imagen: "fuentes/font.png",
            fuente: "fuentes/font.fnt"
          },
          {
            nombre: "impact",
            imagen: "fuentes/impact.png",
            fuente: "fuentes/impact.fnt"
          },
          {
            nombre: "mini-impact",
            imagen: "fuentes/mini-impact.png",
            fuente: "fuentes/mini-impact.fnt"
          }
        ]
      };
    }
    // modo_simple indica que pilas debe iniciar asumiendo que se está
    // usando fuera del editor, sin señales ni iframes.
    opciones.modo_simple = true;
    this.iniciar_phaser(ancho, alto, recursos, opciones);
    return this;
  }

  private iniciar_phaser_desde_configuracion_y_cargar_escenas(configuracion) {
    var game = new Phaser.Game(configuracion);

    game.scene.add("ModoCargador", ModoCargador);
    game.scene.add("ModoEditor", ModoEditor);
    game.scene.add("ModoEjecucion", ModoEjecucion);
    game.scene.add("ModoPausa", ModoPausa);

    game.scene.start("ModoCargador", { pilas: this });

    this.game = game;
  }

  ejecutar() {
    console.warn(
      "La función pilas.ejecutar() entró en desuso, no hace falta invocarla."
    );
  }

  definir_modo(nombre: string, datos) {
    try {
      this.game.scene.stop("ModoCargador");
      this.game.scene.stop("ModoEjecucion");
      this.game.scene.stop("ModoEditor");
      this.game.scene.stop("ModoPausa");
    } catch (e) {
      console.warn(e);
    }

    this.modo = this.game.scene.getScene(nombre);
    this.game.scene.start(nombre, datos);
  }

  cambiar_escena(nombre: string) {
    this.modo.cambiar_escena(nombre);
  }

  reiniciar_escena() {
    this.modo.cambiar_escena(this.escena.constructor.name);
  }

  crear_configuracion(ancho: number, alto: number, maximizar: boolean) {
    let escala = undefined;

    if (maximizar) {
      escala = {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      };
    }

    return {
      type: Phaser.AUTO, // CANVAS, WEBGL o AUTO
      parent: "game",
      scale: escala,
      width: ancho,
      height: alto,
      backgroundColor: "#000000",
      disableContextMenu: true,
      pixelArt: true, // true es más rápido
      autostart: false,
      input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: true
      },
      //scene: [ModoCargador, ModoEditor, ModoEjecucion, ModoPausa],
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

  buscar_actor(nombre: string) {
    return this.obtener_actor_por_nombre(nombre);
  }

  obtener_actor_por_nombre(nombre: string) {
    return this.obtener_actores().find(actor => actor.nombre === nombre);
  }

  obtener_cantidad_de_actores() {
    return this.obtener_actores().length;
  }

  obtener_diccionario_de_actores() {
    let diccionario = {};

    this.obtener_actores().map(actor => {
      diccionario[actor.nombre] = actor;
    });

    return diccionario;
  }

  obtener_actores_en(_x: number, _y: number) {
    let { x, y } = this.utilidades.convertir_coordenada_de_pilas_a_phaser(
      _x,
      _y
    );
    let actores = this.obtener_actores();

    return actores.filter(actor => {
      return actor.sprite.getBounds()["contains"](x, y);
    });
  }

  escena_actual() {
    return this.escena;
  }

  animar(actor, propiedad: string, valor, duracion: number = 0.5) {
    let configuracion = {
      targets: actor,
      ease: "Power1",
      duration: duracion * 1000
    };
    configuracion[propiedad] = valor[0];

    this.modo.tweens.add(configuracion);
  }

  luego(duracion: number, tarea: any) {
    this.modo.time.delayedCall(duracion * 1000, tarea);
  }
}

//var pilas = new Pilas();
var pilasengine = new Pilas();
