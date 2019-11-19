/// <reference path="utilidades.ts"/>

declare var NineSlice: any;

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
  sonidos: { [key: string]: any };
  actores: Actores;
  animaciones: Animaciones;
  Phaser: any;

  nombre_del_contexto: string; // nombre del contexto para identificar mensajes.

  eventos: Eventos;
  colores: Colores;

  recursos: any;

  fisica: Fisica;
  habilidades: Habilidades;
  comportamientos: Comportamientos;

  modo: any;
  _ancho: number;
  _alto: number;

  cursor_x: number = 0;
  cursor_y: number = 0;
  opciones: any;

  imagenes_precargadas: string[] = [];
  imagenes: any = [];

  constructor() {
    this.Phaser = Phaser;

    this.mensajes = new Mensajes(this);
    this.colores = new Colores(this);
    this.depurador = new Depurador(this);
    this.utilidades = new Utilidades(this);
    this.escenas = new Escenas(this);
    this.historia = new Historia(this);
    this.sonidos = {};
    this.actores = new Actores(this);
    this.animaciones = new Animaciones(this);
    this.fisica = new Fisica(this);
    this.habilidades = new Habilidades(this);
    this.comportamientos = new Comportamientos(this);
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

  get camara() {
    return this.escena.camara;
  }

  iniciar_phaser(ancho: number, alto: number, recursos: any, opciones: any, imagenes: any) {
    if (opciones.maximizar === undefined) {
      opciones.maximizar = true;
    }

    this.opciones = opciones;
    this.imagenes = imagenes;

    if (!recursos) {
      throw Error("No se puede iniciar phaser sin especificar una lista de recursos");
    }

    this._ancho = ancho;
    this._alto = alto;

    this.recursos = recursos;
    var configuracion = this.crear_configuracion(ancho, alto, opciones.maximizar, opciones.pixelart);

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

  iniciar(ancho: number, alto: number, recursos: any, opciones: any = {}, imagenes: any = []) {
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
        sonidos: [
          {
            nombre: "explosion",
            ruta: "sonidos/explosion.wav"
          },
          {
            nombre: "laser",
            ruta: "sonidos/gallina.wav"
          },
          {
            nombre: "laser",
            ruta: "sonidos/laser.wav"
          },
          {
            nombre: "moneda",
            ruta: "sonidos/moneda.wav"
          },
          {
            nombre: "salto-corto",
            ruta: "sonidos/salto-corto.wav"
          },
          {
            nombre: "salto-largo",
            ruta: "sonidos/salto-largo.wav"
          },
          {
            nombre: "seleccion-aguda",
            ruta: "sonidos/seleccion-aguda.wav"
          },
          {
            nombre: "seleccion-grave",
            ruta: "sonidos/seleccion-grave.wav"
          }
        ],

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
    this.iniciar_phaser(ancho, alto, recursos, opciones, imagenes);
    return this;
  }

  listar_imagenes() {
    return this.imagenes_precargadas;
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
    console.warn("La función pilas.ejecutar() entró en desuso, no hace falta invocarla.");
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
    this.definir_cursor("default");
    this.game.scene.start(nombre, datos);
  }

  cambiar_escena(nombre: string) {
    this.modo.cambiar_escena(nombre);
  }

  reiniciar_escena() {
    this.modo.cambiar_escena(this.escena.constructor.name);
  }

  crear_configuracion(ancho: number, alto: number, maximizar: boolean, pixelart: boolean) {
    let escala = undefined;

    if (maximizar) {
      escala = {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      };
    }

    if (pixelart === undefined) {
      pixelart = true;
    }

    return {
      type: Phaser.AUTO, // CANVAS, WEBGL o AUTO
      parent: "game",
      scale: escala,
      width: ancho,
      height: alto,
      backgroundColor: "#000000",
      disableContextMenu: true,
      pixelArt: pixelart,
      autostart: false,
      input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: true
      },
      plugins: {
        global: [NineSlice.Plugin.DefaultCfg]
      },
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
    this.escena.reproducir_sonido(nombre);
  }

  obtener_actores() {
    return this.escena.actores;
  }

  buscar_actor(nombre: string) {
    return this.obtener_actor_por_nombre(nombre);
  }

  /**
   * Retorna el actor que tenga el nombre solicitado.
   */
  obtener_actor_por_nombre(nombre: string) {
    return this.obtener_actores().find(actor => actor.nombre === nombre);
  }

  /**
   * Retorna el primer actor que encuentre con la etiqueta solicitada.
   */
  obtener_actor_por_etiqueta(etiqueta: string) {
    return this.obtener_actores().find(actor => {
      return actor.tiene_etiqueta(etiqueta);
    });
  }

  /**
   * Retorna una lista con todos los actores que tienen esa etiqueta.
   */
  obtener_todos_los_actores_con_la_etiqueta(etiqueta: string) {
    return this.obtener_actores().filter(actor => {
      return actor.tiene_etiqueta(etiqueta);
    });
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
    let { x, y } = this.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y);
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

  /**
   * Ejecuta una función luego de que transcurra una determinada cantidad de segundos.
   */
  luego(duracion: number, tarea: any) {
    return this.modo.time.delayedCall(duracion * 1000, tarea);
  }

  /**
   * Ejecuta una función cada un cierto intervalo de tiempo.
   */
  cada(duracion: number, tarea: any, veces: number) {
    let veces_que_se_ejecuto = 0;
    let time = this.modo.time.addEvent({
      delay: duracion * 1000,
      callback: () => {
        // Si la tarea retorna 'true' se asume que de debe detener la tarea.
        if (tarea()) {
          time.remove();
        }
        // Permite detener la tarea si se especifica la cantidad de veces
        // que se tiene que ejecutar.
        veces_que_se_ejecuto += 1;

        if (veces && veces_que_se_ejecuto >= veces) {
          time.remove();
        }
      },
      loop: true
    });

    return time;
  }

  /**
   * Retorna un número aleatorio en el rango que va desde el primer argumento
   * al segundo (incluyendo los extremos).
   *
   * Por ejemplo, esta llamada puede retornar uno de 5 valores:
   *
   * ```
   *  pilas.azar(1, 5); // posible resultado 1, 2, 3, 4 o 5.
   * ```
   */
  azar(desde: number, hasta: number) {
    if (desde > hasta) {
      throw Error(`Rango inválido, el número desde (${desde} en este caso) debe ser menor al hasta (${hasta}).`);
    }
    return Math.floor(Math.random() * (hasta - desde + 1)) + desde;
  }

  obtener_distancia_entre_puntos(x: number, y: number, x2: number, y2: number) {
    var dx = x - x2;
    var dy = y - y2;

    return Math.sqrt(dx * dx + dy * dy);
  }

  obtener_distancia_entre_actores(actor1: ActorBase, actor2: ActorBase) {
    return this.obtener_distancia_entre_puntos(actor1.x, actor1.y, actor2.x, actor2.y);
  }

  obtener_angulo_entre_puntos(x: number, y: number, x2: number, y2: number) {
    let dx = x2 - x;
    let dy = y2 - y;

    let radianes = Math.atan(dy / dx);

    if (1 / dx < 0) {
      radianes += Math.PI;
    }
    if (1 / radianes < 0) {
      radianes += 2 * Math.PI;
    }

    return radianes * (180 / Math.PI);
  }

  obtener_angulo_entre_actores(actor1: ActorBase, actor2: ActorBase) {
    return this.obtener_angulo_entre_puntos(actor1.x, actor1.y, actor2.x, actor2.y);
  }

  ocultar_cursor() {
    this.modo.input.setDefaultCursor("none");
  }

  definir_cursor(nombre: string) {
    let nombres = {
      normal: "default",
      pulsable: "hand",
      mano: "hand"
    };

    this.modo.input.setDefaultCursor(nombres[nombre] || nombre);
  }

  observar(nombre: string, variable: any) {
    this.escena.observar(nombre, variable);
  }

  clonar(nombre: string) {
    return this.modo.clonar_actor_por_nombre(nombre);
  }

  clonar_en(nombre: string, x: number, y: number) {
    let actor = this.modo.clonar_actor_por_nombre(nombre);
    actor.x = x;
    actor.y = y;
    return actor;
  }

  clonar_en_posicion_al_azar(nombre: string) {
    let x = this.azar(-200, 200);
    let y = this.azar(-200, 200);
    return this.clonar_en(nombre, x, y);
  }

  /**
   * Determina si un numero es múltiplo de otro.
   *
   * Por ejemplo, esta función retorna true si se consulta
   * así `pilas.es_multiplo(12, 3)` porque 12 es multiplo de 3 (ya que 3x4=12)
   * mientras que `pilas.es_multiplo(3, 2)` retornará false, porque 3 no es
   * múltiplo de 2.
   */
  es_multiplo(a: number, b: number) {
    return a % b === 0;
  }
}

//var pilas = new Pilas();
var pilasengine = new Pilas();
