class EstadoEjecucion extends Estado {
  entidades: any;
  sprites: any;
  historia: any;
  actores: any;
  clasesDeActores: {};

  init(datos) {
    this.entidades = datos.escena.actores;
    this.codigo = datos.codigo;

    let codigoCompleto = this.codigo + "\n\nvar __clases_a_exportar = {Aceituna: Aceituna, Caja: Caja};\n__clases_a_exportar";
    console.log(codigoCompleto);
    this.clasesDeActores = eval(codigoCompleto);

    this.sprites = {};
    this.historia = [];
    this.actores = [];
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

    if (entidad.tipo === "pelota") {
      actor = new Pelota(this.game, x, y, imagen);
      actor.iniciar();
      this.world.add(actor);
    } else {
      if (entidad.tipo === "caja") {
        actor = new Caja(this.game, x, y, imagen);
        actor.iniciar();
        this.world.add(actor);
      } else {
        if (entidad.tipo === "aceituna") {
          actor = new this.clasesDeActores["Aceituna"](this.game, x, y, imagen);
          actor.iniciar();
          this.world.add(actor);
        } else {
          actor = new Actor(this.game, x, y, imagen);
          actor.iniciar();
          this.world.add(actor);
        }
      }
    }

    actor.tipo = entidad.tipo;
    actor.anchor.set(entidad.centro_x, entidad.centro_y);

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
