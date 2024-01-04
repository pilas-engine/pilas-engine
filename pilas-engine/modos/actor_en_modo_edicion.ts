class ActorEnModoEdición extends Phaser.GameObjects.Container {
  pilas: Pilas;
  borde: Phaser.GameObjects.Rectangle;
  sprite: Phaser.GameObjects.Sprite;

  fondo = null;
  sensores = [];
  figura = null;
  texto = null;
  id: number;
  identificador: number;

  constructor(pilas, scene, datos_del_actor) {
    super(scene, 0, 0);
    this.pilas = pilas;

    var {g, i} = this.separar_imagen(datos_del_actor.imagen);

    this.pilas.utilidades.validar_que_existe_imagen(datos_del_actor.imagen);
    this.identificador = datos_del_actor.id;

    // TODO: Cada actor tiene su ID, aquí me tengo que asegurar que ese ID se
    // asigna al objeto en el que estoy ahora,
    console.log("Guardando este actor como", this.identificador);

    this.crear_sprite(g, i);
    this.crear_borde();
    this.hacer_interactivo();

    this.conectar_eventos_del_mouse();
  }

  private separar_imagen(imagen) {
    var g = undefined;
    var i = undefined;

    if (imagen.indexOf(":") > -1) {
      g = imagen.split(":")[0];
      i = imagen.split(":")[1];
    } else {
      g = imagen;
    }

    return {g, i};
  }

  private crear_sprite(g, i) {
    let scene = this.pilas.modo;

    this.sprite = scene.add.sprite(0, 0, g, i);
    this.add(this.sprite);
  }

  actualizar_datos(entidad) {

    let coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(entidad.x, entidad.y);
    this.pilas.utilidades.validar_que_existe_imagen(entidad.imagen);

    // mantiene actualizada la textura del actor
    // TODO: evitar llamados innecesarios si la textura no cambió.
    
    if (entidad.imagen.indexOf(":") > -1) {
      let g = entidad.imagen.split(":")[0];
      let i = entidad.imagen.split(":")[1];

      this.sprite.setTexture(g, i);
    } else {
      this.sprite.setTexture(entidad.imagen);
    }

    // Actualiza las propiedades del actor:
    
    this.x = coordenada.x;
    this.y = coordenada.y;

    if (entidad.activo === false) {
      this.sprite.alpha = 0.5;
    } else {
      this.sprite.alpha = 1 - entidad.transparencia / 100;
    }

    this.sprite.angle = -entidad.rotacion;
    this.sprite.scaleX = entidad.escala_x;
    this.sprite.scaleY = entidad.escala_y;
    this.sprite.depth = -entidad.z || 0;
    this.sprite.setOrigin(entidad.centro_x, entidad.centro_y);

    // Actualiza el borde que indica el tamaño del actor y su zona
    // interactiva.
    
    this.borde.setSize(this.sprite.width, this.sprite.height);
  }

  private crear_borde() {
    this.borde = this.pilas.modo.add.rectangle(this.sprite.x, 0, this.sprite.width, this.sprite.height);
    this.borde.setStrokeStyle(2, 0xff00f0);
    this.add(this.borde);

    this.borde.alpha = 0.5;
  }

  private hacer_interactivo() {
    let borde = this.sprite.getTopLeft();

    this.setInteractive({
      draggable: true,
      hitArea: new Phaser.Geom.Rectangle(borde.x, borde.y, this.sprite.width, this.sprite.height),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });

    this.pilas.modo.input.enableDebug(this, 0x00ff00);
  }

  // Al ser seleccionado desde la barra de actores.
  destacar() {
    this.pilas.modo.input.enableDebug(this, 0xffffff);
  }

  private conectar_eventos_del_mouse() {

    this.on("pointermove", (data) => {
      if (data.buttons) {
        this.scene.input.setDefaultCursor("grabbing");
      } else {
        this.scene.input.setDefaultCursor("grab");
      }

      this.borde.alpha = 0.5;
    });

    this.on("pointerout", () => {
      this.scene.input.setDefaultCursor("default");
      this.borde.alpha = 0.5;
    });

    this.on("pointerdown", () => {
      this.scene.input.setDefaultCursor("grabbing");
      this.borde.alpha = 0.5;
    });

    this.on("pointerup", () => {
      this.scene.input.setDefaultCursor("grab");
    });

    this.on("drag", (evento, x, y) => {
      this.x = Math.floor(x);
      this.y = Math.floor(y);
      console.log("Moviendo el actor", {x, y});
    });


    this.on("dragend", (pointer) => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);

      let datos = {
        id: this.identificador,
        x: posicion.x,
        y: posicion.y,
      };

      this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", datos);
    });


  }

  // Al dejar de ser seleccionado en el modo edición.
  quitar_destacado() {
    this.pilas.modo.input.removeDebug(this);
  }

  eliminar() {

    if (this.figura) {
      this.eliminar_figura(this.figura);
    }

    if (this.sensores) {
      this.eliminar_sensores();
    }

    if (this.texto) {
      this.texto.destroy();
    }

    if (this.fondo) {
      this.fondo.destroy();
    }

    this.destroy();
  }

  private eliminar_sensores() {
    this.sensores.map(sensor => {
      this.eliminar_figura(sensor);
    });
  }

  private eliminar_figura(figura) {
    let matter = this.pilas.Phaser.Physics.Matter.Matter;
    let world = this.pilas.modo.matter.world.localWorld;
    matter.World.remove(world, figura);
  }
}
