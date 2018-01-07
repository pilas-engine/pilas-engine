class EstadoEjecucion extends Estado {
  entidades: any;
  sprites: any;
  historia: any;
  actores: any;
  clasesDeActores: {};
  codigo: any;

  init(datos) {
    this.entidades = datos.escena.actores;
    this.codigo = datos.codigo;

    let codigoDeExportacion = this.obtenerCodigoDeExportacion(this.codigo);
    let codigoCompleto = this.codigo + codigoDeExportacion;

    try {
      this.clasesDeActores = eval(codigoCompleto);
    } catch (e) {
      console.error(e);
    }

    this.sprites = {};
    this.historia = [];
    this.actores = [];
  }

  obtenerCodigoDeExportacion(codigo) {
    const re_creacion_de_clase = /var (.*) \= \/\*\* @class/g;
    const re_solo_clase = /var\ (\w+)/;
    let lista_de_clases = codigo.match(re_creacion_de_clase).map(e => e.match(re_solo_clase)[1]);
    let diccionario = {};

    for (let i = 0; i < lista_de_clases.length; i++) {
      let item = lista_de_clases[i];
      diccionario[item] = item;
    }

    let diccionario_como_cadena = JSON.stringify(diccionario).replace(/"/g, "");

    return `\n__clases = ${diccionario_como_cadena};\n__clases;`;
  }

  create() {
    this.game.stage.backgroundColor = "F99";

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 400;
    this.game.physics.p2.restitution = 0.75;
    this.game.physics.p2.friction = 499;

    this.crear_actores_desde_entidades();
  }

  crear_actores_desde_entidades() {
    this.actores = this.entidades.map(e => {
      return this.crear_actor(e);
    });
  }

  crear_actor(entidad) {
    let x = entidad.x;
    let y = entidad.y;
    let imagen = entidad.imagen;
    let actor = null;

    let clase = this.clasesDeActores[entidad.tipo];

    if (clase) {
      try {
        console.log(`- Creando actor ${entidad.tipo}`);
        actor = new this.clasesDeActores[entidad.tipo](this.game, x, y, imagen);
        actor.tipo = entidad.tipo;
        actor.sprite.anchor.set(entidad.centro_x, entidad.centro_y);
        actor.iniciar();
        this.world.add(actor.sprite);
      } catch (e) {
        console.error(e);
      }
    } else {
      throw new Error(`No existe código para crear un actor de la clase ${entidad.tipo}`);
    }

    return actor;
  }

  update() {
    this.guardar_foto_de_entidades();
  }

  private guardar_foto_de_entidades() {
    let entidades = this.actores.map(actor => {
      return actor.serializar();
    });

    this.historia.push(entidades);
  }
}
