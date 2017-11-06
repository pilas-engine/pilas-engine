class EstadoEjecucion extends Phaser.State {
  entidades: any;
  sprites: any;

  init(datos) {
    this.entidades = datos.entidades;
    this.sprites = {};
  }

  create() {
    this.game.stage.backgroundColor = "F99";
    this.crear_actores_desde_entidades();
  }

  crear_actores_desde_entidades() {
    this.entidades.map(e => {
      this.crear_actor(e);
    });
  }

  crear_actor(entidad) {
    let x = entidad.x;
    let y = entidad.y;
    let imagen = entidad.imagen;
    let actor = null;

    if (entidad.tipo === "pelota") {
      actor = new Pelota(this.game, x, y, imagen);
      this.world.add(actor);
      actor.iniciar();
    } else {
      actor = this.add.sprite(x, y, imagen);
    }

    actor.pivot.x = entidad.centro_x;
    actor.pivot.y = entidad.centro_y;
  }

  update() {}
}
