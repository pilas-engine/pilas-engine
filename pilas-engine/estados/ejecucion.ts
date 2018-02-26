/// <reference path="estado.ts"/>

class EstadoEjecucion extends Estado {
  entidades: any;
  sprites: any;
  historia: any;
  actores: any;
  clases: {};
  proyecto: any = {};
  codigo: any;
  nombre_de_la_escena_inicial: string = null;

  init(datos) {
    this.pilas = datos.pilas;

    this.nombre_de_la_escena_inicial = datos.nombre_de_la_escena_inicial;
    this.proyecto = datos.proyecto;
    this.codigo = datos.codigo;
    this.game.paused = false;

    let codigoDeExportacion = this.obtener_codigo_para_exportar_clases(this.codigo);
    let codigo_completo = this.codigo + codigoDeExportacion;

    try {
      this.clases = eval(codigo_completo);
    } catch (e) {
      this.pilas.emitir_excepcion_al_editor(e, "ejecutar el proyecto");
    }

    this.sprites = {};
    this.historia = [];
    this.actores = [];
  }

  /**
   * Este método se utiliza para extraer todas las referencias a clases y
   * colocarlas en un diccionario que se pueda obtener luego de ejecutar
   * eval.
   *
   * Por ejemplo, si el código es algo como "class Ejemplo {... \n class B ..."
   * esta función va a generar un string de la forma:
   *
   * "__clases = {Ejemplo:Ejemplo,B:B};\n__clases;
   */
  obtener_codigo_para_exportar_clases(codigo) {
    const re_creacion_de_clase = /var (.*) \= \/\*\* @class/g;
    const re_solo_clase = /var\ (\w+)/;
    let lista_de_clases = [];

    if (codigo.match(re_creacion_de_clase)) {
      lista_de_clases = codigo.match(re_creacion_de_clase).map(e => e.match(re_solo_clase)[1]);
    }

    let diccionario = {};

    for (let i = 0; i < lista_de_clases.length; i++) {
      let item = lista_de_clases[i];
      diccionario[item] = item;
    }

    let diccionario_como_cadena = JSON.stringify(diccionario).replace(/"/g, "");

    return `\n__clases = ${diccionario_como_cadena};\n__clases;`;
  }

  create() {
    super.create();
    this.game.stage.backgroundColor = "F99";

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 400;
    this.game.physics.p2.restitution = 0.75;
    this.game.physics.p2.friction = 499;

    try {
      this.instanciar_escena(this.nombre_de_la_escena_inicial);
    } catch (e) {
      this.pilas.emitir_excepcion_al_editor(e, "crear la escena");
    }

    this.pilas.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
  }

  instanciar_escena(nombre) {
    let escena = this.proyecto.escenas.filter(e => e.nombre == nombre)[0];
    this.crear_escena(escena);
  }

  crear_escena(datos_de_la_escena) {
    let escena = new this.clases[datos_de_la_escena.nombre](this.pilas);

    escena.camara.x = datos_de_la_escena.camara_x;
    escena.camara.y = datos_de_la_escena.camara_y;
    escena.iniciar();

    this.actores = datos_de_la_escena.actores.map(e => {
      return this.crear_actor(e);
    });
  }

  crear_actor(entidad) {
    let x = entidad.x;
    let y = entidad.y;
    let imagen = entidad.imagen;
    let actor = null;

    let clase = this.clases[entidad.tipo];

    if (clase) {
      actor = new this.clases[entidad.tipo](this.pilas, x, y, imagen);
      actor.tipo = entidad.tipo;
      actor.rotacion = entidad.rotacion;
      actor.centro_x = entidad.centro_x;
      actor.centro_y = entidad.centro_y;
      actor.escala_x = entidad.escala_x;
      actor.escala_y = entidad.escala_y;
      actor.transparencia = entidad.transparencia;
      actor.iniciar();
      this.world.add(actor.sprite);
    } else {
      console.error(this.clases);
      let nombres_de_clases = Object.getOwnPropertyNames(this.clases);
      throw new Error(`No existe código para crear un actor de la clase ${entidad.tipo}. Las clases disponibles son [${nombres_de_clases.join(", ")}]`);
    }

    return actor;
  }

  preRender() {
    try {
      this.guardar_foto_de_entidades();
    } catch (e) {
      this.pilas.emitir_mensaje_al_editor("error_de_ejecucion", { mensaje: e.message, stack: e.stack.toString() });
    }
  }

  update() {
    this.pilas.escena_actual().actualizar();
  }

  private guardar_foto_de_entidades() {
    let entidades = this.actores.map(actor => {
      return actor.serializar();
    });

    this.historia.push(entidades);
  }
}
