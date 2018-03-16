/// <reference path="modo.ts"/>

class ModoEjecucion extends Modo {
  pilas: Pilas;
  fondo: Phaser.GameObjects.TileSprite;

  ancho: number;
  alto: number;

  graphics: any;
  fps: any;

  clases: {};
  proyecto: any = {};
  codigo: any;
  nombre_de_la_escena_inicial: string = null;
  permitir_modo_pausa: boolean;

  preload() {
    this.load.image("pelota", "imagenes/pelota.png");
  }

  create(datos) {
    this.actores = [];
    this.matter.world.setBounds(0, 0, this.ancho, this.alto);

    this.guardar_parametros_en_atributos(datos);
    this.crear_fondo();
    this.clases = this.obtener_referencias_a_clases();

    try {
      this.instanciar_escena(this.nombre_de_la_escena_inicial);
    } catch (e) {
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
    }

    this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
    this.pilas.historia.limpiar();

    if (this.pilas.depurador.mostrar_fisica) {
      this.matter.systems.matterPhysics.world.createDebugGraphic();
    }
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
      actor = new this.clases[entidad.tipo](this.pilas);

      let p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);
      p = this.pilas.utilidades.combinar_propiedades(p, entidad);

      actor.pre_iniciar(p);

      actor.iniciar();
    } else {
      console.error(this.clases);
      let nombres_de_clases = Object.getOwnPropertyNames(this.clases);
      throw new Error(`No existe código para crear un actor de la clase ${entidad.tipo}. Las clases disponibles son [${nombres_de_clases.join(", ")}]`);
    }

    return actor;
  }

  obtener_referencias_a_clases() {
    let codigoDeExportacion = this.obtener_codigo_para_exportar_clases(this.codigo);
    let codigo_completo = this.codigo + codigoDeExportacion;

    try {
      return eval(codigo_completo);
    } catch (e) {
      //this.pilas.emitir_excepcion_al_editor(e, "ejecutar el proyecto");
      console.error("TODO: emitir error al editor", e, "ejecutar el proyecto");
    }
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

  guardar_parametros_en_atributos(datos) {
    this.pilas = datos.pilas;
    this.ancho = datos.proyecto.ancho;
    this.alto = datos.proyecto.alto;

    this.nombre_de_la_escena_inicial = datos.nombre_de_la_escena_inicial;
    this.proyecto = datos.proyecto;
    this.codigo = datos.codigo;
    this.permitir_modo_pausa = datos.permitir_modo_pausa;
  }

  crear_fondo() {
    this.fondo = this.add.tileSprite(0, 0, this.ancho, this.alto, "plano");
    this.fondo.depth = -1000;
    this.fondo.setOrigin(0);
  }

  update() {
    if (this.permitir_modo_pausa) {
      try {
        this.guardar_foto_de_entidades();
      } catch (e) {
        this.pilas.mensajes.emitir_mensaje_al_editor("error_de_ejecucion", { mensaje: e.message, stack: e.stack.toString() });
      }
    }

    this.pilas.escena.actualizar();
    this.pilas.escena.actualizar_actores();
  }

  guardar_foto_de_entidades() {
    this.pilas.historia.serializar_escena(this.pilas.escena);
  }
}
