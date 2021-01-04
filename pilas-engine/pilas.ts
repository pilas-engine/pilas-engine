/// <reference path="utilidades.ts"/>
/// <reference path="sonidos.ts"/>

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
  actores: Actores;
  animaciones: Animaciones;
  Phaser: any;

  nombre_del_contexto: string; // nombre del contexto para identificar mensajes.

  eventos: Eventos;
  colores: Colores;
  sonidos: Sonidos;

  recursos: any;

  fisica: Fisica;
  habilidades: Habilidades;
  comportamientos: Comportamientos;
  referencia_de_mapa: any;

  modo: any;
  _ancho: number;
  _alto: number;

  cursor_x: number = 0;
  cursor_y: number = 0;

  cursor_x_absoluta: number = 0;
  cursor_y_absoluta: number = 0;

  opciones: any;

  imagenes_precargadas: string[] = [];
  imagenes: any = [];

  private musica_en_reproduccion: any;

  instrumentacion: any;

  constructor() {
    this.Phaser = Phaser;

    this.mensajes = new Mensajes(this);
    this.colores = new Colores(this);
    this.depurador = new Depurador(this);
    this.utilidades = new Utilidades(this);
    this.escenas = new Escenas(this);
    this.historia = new Historia(this);
    this.sonidos = new Sonidos(this);
    this.actores = new Actores(this);
    this.animaciones = new Animaciones(this);
    this.fisica = new Fisica(this);
    this.habilidades = new Habilidades(this);
    this.comportamientos = new Comportamientos(this);
    this.eventos = new Eventos(this);
  }

  crear_animacion(actor: Actor, tipo_de_animacion: Tipo, repeticiones: number, duración: number) {
    return this.escena.crear_animacion(actor, tipo_de_animacion, repeticiones, duración);
  }

  get escena(): EscenaBase {
    return this.escenas.escena_actual;
  }

  set escena(_: EscenaBase) {
    this.utilidades.acceso_incorrecto("escena");
  }

  get control(): Control {
    return this.escena.control;
  }

  set control(_: Control) {
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
    var configuracion = this.crear_configuracion(ancho, alto, opciones.maximizar, opciones.pixelart, opciones.transparente);

    if (opciones.modo_simple) {
      configuracion["modo_simple"] = opciones.modo_simple;
    }

    if (opciones.fps === 30) {
      configuracion["fps"] = {
        target: opciones.fps,
        forceSetTimeOut: true
      };
    }

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

  iniciar(ancho: number, alto: number, recursos: any, opciones: any = {}, imagenes: any = [], omitir_imagenes_de_pilas: boolean = false) {
    console.log({ ancho, alto, recursos, opciones, imagenes, omitir_imagenes_de_pilas });

    if (opciones === undefined) {
      opciones = {};
    }

    if (recursos === undefined || recursos === null) {
      recursos = {
        imagenes: [],
        sonidos: [
          {
            nombre: "explosion",
            ruta: "sonidos/explosion.mp3"
          },
          {
            nombre: "gallina",
            ruta: "sonidos/gallina.mp3"
          },
          {
            nombre: "laser",
            ruta: "sonidos/laser.mp3"
          },
          {
            nombre: "moneda",
            ruta: "sonidos/moneda.mp3"
          },
          {
            nombre: "salto-corto",
            ruta: "sonidos/salto-corto.mp3"
          },
          {
            nombre: "salto-largo",
            ruta: "sonidos/salto-largo.mp3"
          },
          {
            nombre: "seleccion-aguda",
            ruta: "sonidos/seleccion-aguda.mp3"
          },
          {
            nombre: "seleccion-grave",
            ruta: "sonidos/seleccion-grave.mp3"
          }
        ]
      };
    }
    // modo_simple indica que pilas debe iniciar asumiendo que se está
    // usando fuera del editor, sin señales ni iframes.
    opciones.modo_simple = true;
    opciones.omitir_imagenes_de_pilas = omitir_imagenes_de_pilas;
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
    game.scene.add("ModoEjecucionEnPausa", ModoEjecucionEnPausa);
    game.scene.add("ModoPausa", ModoPausa);
    game.scene.add("ModoError", ModoError);

    game.scene.start("ModoCargador", { pilas: this });

    this.game = game;
  }

  ejecutar() {
    console.warn("La función pilas.ejecutar() entró en desuso, no hace falta invocarla.");
  }

  definir_modo(nombre: string, datos: any) {
    try {
      this.game.scene.stop("ModoCargador");
      this.game.scene.stop("ModoEjecucion");
      this.game.scene.stop("ModoEditor");
      this.game.scene.stop("ModoPausa");
      this.game.scene.stop("ModoError");
    } catch (e) {
      console.warn(e);
    }

    if (nombre !== "ModoEjecucion") {
      // solo detiene el audio si no es un cambio de escena
      // interno en el juego.
      this.game.sound.stopAll();
      this.musica_en_reproduccion = null;
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

  crear_configuracion(ancho: number, alto: number, maximizar: boolean, pixelart: boolean, transparente: boolean) {
    let escala = undefined;
    let color_de_fondo = "#000000";

    if (maximizar) {
      escala = {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      };
    }

    if (pixelart === undefined) {
      pixelart = true;
    }

    if (transparente === undefined) {
      transparente = false;
    }

    if (transparente) {
      color_de_fondo = "rgba(0,0,0,0)";
    }

    return {
      type: Phaser.AUTO, // CANVAS, WEBGL o AUTO
      parent: "game",
      scale: escala,
      width: ancho,
      height: alto,
      backgroundColor: color_de_fondo,
      disableContextMenu: true,
      pixelArt: pixelart,
      autostart: false,
      transparent: transparente,
      fps: {
        //target: 60,
        //forceSetTimeOut: true
      },
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
        debug: false
      }
    };
  }

  reproducir_sonido(nombre: string) {
    if (this.sonidos.existe_sonido(nombre)) {
      this.escena.planificar_reproducir_sonido(nombre);
    } else {
      if (this.sonidos.hay_sonidos_cargados()) {
        let alternativa = this.sonidos.obtener_sonido_con_nombre_similar(nombre);
        throw new Error(`No existe un sonido llamado "${nombre}", ¿quisiste decir "${alternativa}"?`);
      } else {
        throw new Error(`No se puede reproducir el sonido "${nombre}" porque no hay ningún sonido en el proyecto.`);
      }
    }
  }

  reproducir_musica(nombre: string) {
    if (this.musica_en_reproduccion) {
      this.detener_musica();
    }

    if (this.sonidos.existe_sonido(nombre)) {
      var sonido = this.modo.sound.add(nombre, { loop: true });
      sonido.play();
      this.musica_en_reproduccion = sonido;
      return sonido;
    } else {
      if (this.sonidos.hay_sonidos_cargados()) {
        let alternativa = this.sonidos.obtener_sonido_con_nombre_similar(nombre);
        throw new Error(`No existe una música llamada "${nombre}", ¿quisiste decir "${alternativa}"?`);
      } else {
        throw new Error(`No se puede la música "${nombre}" porque no hay ningún sonido o música en el proyecto.`);
      }
    }
  }

  detener_musica() {
    if (this.musica_en_reproduccion) {
      this.musica_en_reproduccion.stop();
      this.musica_en_reproduccion = null;
    }
  }

  esta_reproduciendo_musica() {
    return this.musica_en_reproduccion !== null;
  }

  obtener_actores() {
    return this.escena.actores.filter(a => a._vivo);
  }

  buscar_actor(nombre: string) {
    return this.obtener_actor_por_nombre(nombre);
  }

  /**
   * Retorna el actor que tenga el nombre solicitado.
   */
  obtener_actor_por_nombre(nombre: string) {
    let actor = this.obtener_actores().find(actor => actor.nombre === nombre);

    if (actor === undefined) {
      throw Error(`No se puede obtener un actor con el nombre '${nombre}', ¿Tal vez se eliminó?`);
    } else {
      return actor;
    }
  }

  /**
   * Retorna true si existe un actor llamado de la forma indicada por el argumento.
   */
  existe_un_actor_llamado(nombre: string) {
    let actor = this.obtener_actores().find(actor => actor.nombre === nombre);
    return actor !== undefined;
  }

  /**
   * Retorna true si existe un actor llamado de la forma indicada en alguna
   * de todas las escenas del proyecto.
   */
  existe_un_actor_llamado_en_el_proyecto(nombre: string) {
    return this.modo.existe_actor_llamado_en_el_proyecto(nombre);
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
      if (actor._vivo) {
        return actor.tiene_etiqueta(etiqueta);
      }
    });
  }

  /**
   * Retorna la cantidad de actores en la escena actual.
   */
  obtener_cantidad_de_actores() {
    return this.obtener_actores().length;
  }

  /**
   * Retorna una estructura de datos tipo diccionario con todos los nombres
   * y referencias a los actores.
   */
  obtener_diccionario_de_actores() {
    let diccionario = {};

    this.obtener_actores().map(actor => {
      diccionario[actor.nombre] = actor;
    });

    return diccionario;
  }

  /**
   * Retorna una lista de todos los actores que están ocupando la coordenada
   * `x` e `y` enviada por parámetro.
   */
  obtener_actores_en(_x: number, _y: number) {
    let { x, y } = this.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y);
    let actores = this.obtener_actores();

    return actores.filter(actor => {
      return actor.sprite.getBounds()["contains"](x, y);
    });
  }

  obtener_actor_en(x: number, y: number) {
    let actores = this.obtener_actores_en(x, y);

    if (actores.length > 0) {
      return actores[0];
    }

    return null;
  }

  /**
   * Retorna true si hay un actor en esa coordenada x y.
   */
  existe_actor_en(x: number, y: number) {
    return this.obtener_actores_en(x, y).length > 0;
  }

  /**
   * Retorna true si un actor con la etiqueta se encuentra en la posición x y.
   */
  existe_actor_con_etiqueta_en(etiqueta: string, x: number, y: number) {
    let actores = this.obtener_actores_en(x, y);
    return (
      actores.filter(actor => {
        return actor.tiene_etiqueta(etiqueta);
      }).length > 0
    );
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
    return this.modo.time.delayedCall(duracion * 1000, () => {
      try {
        tarea();
      } catch (e) {
        this.mensajes.emitir_excepcion_al_editor(e, "Al ejecutar la tarea 'luego'");
      }
    });
  }

  /**
   * Ejecuta una función cada un cierto intervalo de tiempo.
   */
  cada(duracion: number, tarea: any, veces: number) {
    let veces_que_se_ejecuto = 0;
    let time = this.modo.time.addEvent({
      delay: duracion * 1000,
      callback: () => {
        try {
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
        } catch (e) {
          this.mensajes.emitir_excepcion_al_editor(e, "Al ejecutar la tarea 'cada'");
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

  /**
   * Retorna la cantidad de pixels de distancia entre dos puntos
   * indicados por parámetros.
   */
  obtener_distancia_entre_puntos(x: number, y: number, x2: number, y2: number) {
    var dx = x - x2;
    var dy = y - y2;

    return Math.sqrt(dx * dx + dy * dy);
  }

  obtener_distancia_entre_actores(actor1: ActorBase, actor2: ActorBase) {
    return this.obtener_distancia_entre_puntos(actor1.x, actor1.y, actor2.x, actor2.y);
  }

  /**
   * Retorna el ángulo en grados que se forma al trazar una linea
   * entre los puntos enviados por parámetro.
   */
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
    if (!actor1.esta_vivo() || !actor2.esta_vivo()) {
      return 0;
    }
    return this.obtener_angulo_entre_puntos(actor1.x, actor1.y, actor2.x, actor2.y);
  }

  /**
   * Hace que el puntero del mouse sea invisible.
   */
  ocultar_cursor() {
    this.modo.input.setDefaultCursor("none");
  }

  /**
   * Permite cambiar el puntero del mouse.
   */
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

  /**
   * Permite clonar un actor en la posición inicial.
   */
  clonar(nombre: string) {
    return this.modo.clonar_actor_por_nombre(nombre);
  }

  /**
   * Permite clonar un actor en la posición solicitada.
   */
  clonar_en(nombre: string, x: number, y: number) {
    let actor = this.modo.clonar_actor_por_nombre(nombre);
    actor.x = x;
    actor.y = y;
    return actor;
  }

  /**
   * Permite clonar un actor en la posición del mouse.
   */
  clonar_en_la_posión_del_cursor(nombre: string) {
    let actor = this.modo.clonar_actor_por_nombre(nombre);
    actor.x = this.cursor_x;
    actor.y = this.cursor_y;
    return actor;
  }

  /**
   * Permite clonar un actor en una posición aleatoria.
   */
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

  /**
   * Envía un mensaje a todos los actores y la escena actual.
   *
   * Para capturar estos mensajes desde actores o la escena, se tiene
   * que crear un método de la forma "cuando_llega_el_mensaje_nombre" donde
   * "nombre" tiene que ser mensaje que se quiere capturar.
   *
   * Por ejemplo, si un actor llama al código "this.pilas.enviar_mensaje_global('ganar')"
   * deberías poder capturar ese mensaje desde cualquier actor o escena
   * declarando el método "cuando_llega_el_mensaje_ganar".
   */
  enviar_mensaje_global(mensaje: string, datos: any = {}) {
    this.escena_actual().enviar_mensaje(mensaje, datos);

    let actores = this.obtener_actores();

    for (let i = 0; i < actores.length; i++) {
      actores[i].enviar_mensaje(mensaje, datos);
    }
  }

  alternar_modo_pantalla_completa() {
    this.modo.scale.toggleFullscreen();
  }

  solicitar_modo_pantalla_completa() {
    this.modo.scale.startFullscreen();
  }

  solicitar_modo_ventana() {
    this.modo.scale.stopFullscreen();
  }

  ajustar(numero: number, grilla: number) {
    return this.alinear(numero, grilla);
  }

  alinear(numero: number, grilla: number) {
    if (grilla < 1) {
      throw new Error(`El valor de la grilla tiene que ser mayor a 1`);
    }

    return Math.round(numero / grilla) * grilla;
  }

  pausar() {
    this.modo.game.scene.start("ModoEjecucionEnPausa", { pilas: this });
    this.modo.game.scene.pause("ModoEjecucion");
  }

  azar_desde_lista(lista) {
    let index = this.azar(0, lista.length - 1);
    return lista[index];
  }

  desordenar_lista(lista_original) {
    let lista = [...lista_original];

    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }

    return lista;
  }

  /**
   * Añade una nota para indicarle a pilas que un actor ejecutó una linea de código
   * en plena ejecución. Esta función está diseñada para ser invocada directamente
   * por una instrumentación de código, y su resultado sirve para resaltar el código
   * que se ejecutó.
   */
  notificar_traza_de_ejecucion(id: string | number, linea: any) {
    if (this.instrumentacion === undefined) {
      this.limpiar_traza_de_ejecucion();
    }

    if (this.instrumentacion[id]) {
      this.instrumentacion[id].push(linea);
    } else {
      this.instrumentacion[id] = [linea];
    }
  }

  limpiar_traza_de_ejecucion() {
    this.instrumentacion = {};
  }

  /**
   * Permite describir cómo se van a representar los actores en un
   * mapa de escenario. Esta función se utiliza casi siempre al
   * principio del juego o antes de llamar a la función `pilas.crear_mapa`.
   *
   * Un ejemplo de invocación es el siguiente:
   *
   *    > this.pilas.definir_mapa({
   *                     x: "ladrillo",
   *                     n: "nave"
   *                });
   *
   * y luego de que se definieron los caracteres, se puede crear
   * un mapa así:
   *
   *    > this.pilas.crear_mapa(`
   *           xxxxxxx
   *           x.....x
   *           x..n..x
   *           x.....x
   *           xxxxxxx
   *         `);
   */
  definir_mapa(diccionario: any) {
    // Busca si el mapa es válido y cumple estas 2 condiciones:
    //
    // 1. Las claves del mapa tienen que ser de una sola letra o número.
    // 2. El valor del mapa tiene que ser un actor existente.
    for (var key in diccionario) {
      if (diccionario.hasOwnProperty(key)) {
        if (typeof key !== "string" || key.length > 1) {
          throw new Error(`Las claves del mapa tienen que ser de una sola letra o número. Se encontró: ${key}`);
        }

        if ([".", "-", " "].indexOf(key) !== -1) {
          throw new Error(`Las claves del mapa no pueden ser punto, guión ni espacio. Esos caracteres están reservados para definir espacios.`);
        }

        if (!this.existe_un_actor_llamado_en_el_proyecto(diccionario[key])) {
          throw new Error(`Los valores del mapa tienen que nombres de actores que existan en alguna escena. El actor "${diccionario[key]}" no existe.`);
        }
      }
    }

    this.referencia_de_mapa = diccionario;
  }

  /**
   * Esta función permite crear un mapa a partir de un diccionario de
   * símbolos previamente creado con la función `pilas.definir_mapa`.
   *
   * El argumento mapa tiene que ser una cadena de textos con la descripción
   * del escenario. Opcionalmente se pueden usar caracteres punto (.) o guión
   * (-) para separar los items del mapa. También se pueden usar espacios para
   * facilitar la legibilidad, esta función va a ignorar esos espacios.
   *
   * Por ejemplo, esta podría ser una llamada a esta función `crear_mapa`:
   *
   *    > this.pilas.crear_mapa(`
   *           xxxxxxx
   *           x.....x
   *           x..n..x
   *           x.....x
   *           xxxxxxx
   *         `);
   *
   * Luego esta función admite como argumentos el tamaño de la grilla (64px
   * por omisión) y las coordenadas en las que se debería dibujar el mapa
   * (x=0, y=0 por omisión).
   */
  crear_mapa(mapa: string, grilla: number = 64, origen_x: number = 0, origen_y: number = 0) {
    // Se queda con las filas que describen el mapa y descarta los espacios
    // y lineas vacías.
    let filas = mapa
      .split("\n")
      .map(e => e.trim())
      .filter(e => e);

    let cantidad_de_filas = filas.length;

    if (!this.referencia_de_mapa) {
      throw Error(`No se puede crear un mapa si no se llamó antes a la función 'pilas.definir_mapa'.`);
    }

    for (let fila = 0; fila < cantidad_de_filas; fila++) {
      let cantidad_de_columnas = filas[fila].length;

      for (let columna = 0; columna < cantidad_de_columnas; columna++) {
        let letra = filas[fila][columna];

        // la coordenada X e Y se tienen que convertir de modo tal que respeten
        // la grilla de coordenadas del mapa.
        let x = columna * grilla + origen_x - ((cantidad_de_columnas / 2) << 0) * grilla;
        let y = fila * grilla + origen_y - ((cantidad_de_filas / 2) << 0) * grilla;

        // Aquí se intentan crear todos los actores del mapa pero teniendo en cuenta
        // que se deben ignorar los caracteres ".", "-" y " ".
        //
        // Y si se llega a mencionar un actor que no estuvo declarado desde un principio
        // (con la función "definir_mapa") se lanzará un error.
        if (this.referencia_de_mapa[letra]) {
          let clase = this.referencia_de_mapa[letra];
          this.clonar_en(clase, x, -y);
        } else {
          if (["-", " ", "."].indexOf(letra) == -1) {
            throw Error(`Cuidado, el mapa usa la letra "${letra}" que no se definió a llamar a la función 'definir_mapa'.`);
          }
        }
      }
    }
  }

  /**
   * Retorna una lista de todos los actores que colisionan en una linea
   * que va desde el punto (x1, y1) hasta el punto (x2, y2).
   *
   * El resultado de la función será una lista de la forma:
   *
   *   [
   *      {
   *         x: 10,
   *         y: 10,
   *         actor: <actor>
   *         distancia: 30
   *      },
   *      ...
   *    ]
   */
  laser(actor: Actor, x1: number, y1: number, x2: number, y2: number): Intersección[] {
    let bodies = this.modo.matter.world.getAllBodies();
    let ids = [];

    let desde = this.utilidades.convertir_coordenada_de_pilas_a_phaser(x1, y1);
    let hasta = this.utilidades.convertir_coordenada_de_pilas_a_phaser(x2, y2);

    let colisiones = raycast(bodies, desde, hasta);

    // Solo deja las colisiones contra actores, no contra sensores.
    colisiones = colisiones.filter(col => {
      return col.body.gameObject && col.body.gameObject.actor;
    });

    // excluye de las colisiones al actor sobre el que se genera el laser.
    colisiones = colisiones.filter(col => {
      return col.body.gameObject.actor.id !== actor.id;
    });

    // Solo deja la primer colisión con cada actor.
    colisiones = colisiones.filter(col => {
      if (ids.includes(col.body.gameObject.actor.id)) {
        return false;
      } else {
        ids.push(col.body.gameObject.actor.id);
        return true;
      }
    });

    return colisiones
      .map(col => {
        let punto = this.utilidades.convertir_coordenada_de_phaser_a_pilas(col.point.x, col.point.y);

        return {
          actor: col.body.gameObject.actor,
          body: col.body,
          distancia: Math.trunc(this.obtener_distancia_entre_puntos(x1, y1, punto.x, punto.y)),
          x: punto.x,
          y: punto.y
        };
      })
      .sort((a, b) => a.distancia - b.distancia);
  }

  /**
   * Similar a la función "laser", pero solo retornará el primer actor que
   * se encuentre cuando traza un laser desde la posición (x1, y1) hasta
   * la posición (x2, y2).
   *
   * Opcionalmente, a esta función se le puede indicar una etiqueta, para
   * que solo tenga en cuenta colisiones contra actores que tengan esa
   * etiqueta.
   */
  laser_al_primer_actor(actor: Actor, x1: number, y1: number, x2: number, y2: number, etiqueta = ""): Intersección {
    let colisiones = this.laser(actor, x1, y1, x2, y2);

    if (etiqueta) {
      colisiones = colisiones.filter(e => e.actor.tiene_etiqueta(etiqueta));
    }

    if (colisiones.length > 0) {
      return colisiones[0];
    } else {
      return null;
    }
  }
}

var pilasengine = new Pilas();
