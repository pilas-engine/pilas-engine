class ActorEnModoEdición extends Phaser.GameObjects.Container {
  pilas: Pilas;
  borde: Phaser.GameObjects.Rectangle;
  sprite: Phaser.GameObjects.Sprite;
  centro: Phaser.GameObjects.Graphics;

  fondo = null;
  sensores = [];
  figura = null;
  texto = null;
  id: number;
  identificador: number;
  seleccionado: bool;

  constructor(pilas, scene, datos_del_actor) {
    super(scene, 0, 0);
    this.pilas = pilas;
    this.seleccionado = false;

    var {g, i} = this.separar_imagen(datos_del_actor.imagen);

    this.pilas.utilidades.validar_que_existe_imagen(datos_del_actor.imagen);
    console.log({identificador: datos_del_actor});
    this.identificador = datos_del_actor.identificador;
    this.id = datos_del_actor.id;

    this.crear_sprite(g, i);
    this.crear_borde();
    this.crear_centro();
    this.hacer_interactivo();

    console.log("id del actor", this.id);

    this.conectar_eventos_del_mouse();
  }

  private separar_imagen(imagen: string) {
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

  private crear_sprite(g: string, i: string) {
    let scene = this.pilas.modo;

    this.sprite = scene.add.sprite(0, 0, g, i);
    this.add(this.sprite);
  }

  actualizar_datos(entidad: any) {

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

    //this.sprite.texture.setFilter(Phaser.Textures.NEAREST);
    //debugger;

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



    console.log(entidad.lasers);


    // Si detecta que el usuario ha definido una figura y antes no había
    // ninguna la intenta crear.
    if (entidad.figura && !this.figura) {
      console.log("Debo crear figura visual para este actor", this);
      this.figura = this.crear_representacion_de_figura(entidad);
    } else {
      // Si detecta que el usuario eliminó una figura la quita del dibujo.
      if (this.figura && !entidad.figura) {
        this.figura.destroy();
        this.figura = null;
      }
    }

    // Dada una figura, la actualiza para que simbolice visualmente lo que
    // el usuario seleccionó.
    if (this.figura) {
      this.actualizar_datos_de_la_figura(entidad);
    }

  }

  actualizar_datos_de_la_figura(entidad) {

    if (entidad.figura === "rectangulo") {
      // si la figura ya no es un rectángulo vuelve a crearla.
      if (this.figura.geom.type !== 5) {
        this.figura.destroy();
        this.figura = this.crear_representacion_de_figura(entidad);
      }

      this.figura.setSize(entidad.figura_ancho, entidad.figura_alto);
    }

    if (entidad.figura === "circulo") {
      // si la figura ya no es un círculo vuelve a crearla.
      if (this.figura.geom.type !== 0) {
        this.figura.destroy();
        this.figura = this.crear_representacion_de_figura(entidad);
      }

      this.figura.setRadius(entidad.figura_radio);
    }

    if (entidad.figura_dinamica) {
      this.figura.setStrokeStyle(1, 0x00FF00);
      this.figura.fillColor = 0x00FF00;
      this.figura.fillAlpha = 0.25;
    } else {
      this.figura.setStrokeStyle(1, 0x0000AA);
      this.figura.fillColor = 0x0000CC;
      this.figura.fillAlpha = 0.25;
    }

    this.figura.setOrigin(0.5, 0.5);
  }

  private crear_representacion_de_figura(entidad) {
    let figura = null;

    if (entidad.figura === "rectangulo") {
      figura = this.pilas.modo.add.rectangle(0, 0, 100, 100, 0xffffff);
    }

    if (entidad.figura === "circulo") {
      figura = this.pilas.modo.add.circle(0, 0, 100, 0xffffff);
    }

    figura.setStrokeStyle(1, 0x0000FF);
    //figura.fillColor = 0x00FF00;
    figura.fillAlpha = 0.5;

    this.add(figura);

    return figura;
  }

  private crear_borde() {
    this.borde = this.pilas.modo.add.rectangle(this.sprite.x, 0, this.sprite.width, this.sprite.height);
    this.borde.setStrokeStyle(1, 0xffffff);
    this.add(this.borde);

    this.borde.alpha = 0;
  }

  private crear_centro() {
    this.centro = this.pilas.modo.add.graphics();

    this.centro.lineStyle(3, 0x000000, 1);

    // lineas de fondo
    this.centro.lineBetween(-4, -4, +4, +4);
    this.centro.lineBetween(+4, -4, -4, +4);

    this.centro.lineStyle(1, 0xFFFFFF, 1);
    this.centro.lineBetween(-3, -3, +3, +3);
    this.centro.lineBetween(+3, -3, -3, +3);

    this.add(this.centro);
  }

  private hacer_interactivo() {
    let borde = this.sprite.getTopLeft();

    this.setInteractive({
      draggable: true,
      hitArea: new Phaser.Geom.Rectangle(borde.x, borde.y, this.sprite.width, this.sprite.height),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });

    //this.pilas.modo.input.enableDebug(this, 0x00ff00);
  }

  // Al ser seleccionado desde la barra de actores.
  destacar() {
    //this.pilas.modo.input.enableDebug(this, 0xffffff);
    this.borde.alpha = 1;
    this.seleccionado = true;
  }

  // Al dejar de ser seleccionado en el modo edición.
  quitar_destacado() {
    //this.pilas.modo.input.removeDebug(this);
    this.borde.alpha = 0;
    this.seleccionado = false;
  }

  private conectar_eventos_del_mouse() {

    this.on("pointermove", (data: any) => {
      if (data.buttons) {
        this.scene.input.setDefaultCursor("grabbing");
      } else {
        this.scene.input.setDefaultCursor("grab");
      }

      if (!this.seleccionado) {
        this.borde.alpha = 0.5;
      }

    });

    this.on("pointerout", () => {
      this.scene.input.setDefaultCursor("default");

      if (!this.seleccionado) {
        this.borde.alpha = 0;
      }

    });

    this.on("pointerdown", () => {
      this.scene.input.setDefaultCursor("grabbing");
      this.borde.alpha = 1;
      this.pilas.mensajes.emitir_mensaje_al_editor("comienza_a_mover_un_actor", { identificador: this.identificador });
    });

    this.on("pointerup", () => {
      this.scene.input.setDefaultCursor("grab");
    });

    this.on("drag", (_:any, x: number, y: number) => {
      this.x = Math.floor(x);
      this.y = Math.floor(y);
    });

    this.on("dragend", () => {
      let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(this.x, this.y);

      let datos = {
        id: this.identificador,
        x: posicion.x,
        y: posicion.y,
      };

      console.log({id: this.id, identificador: this.identificador});
      this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_mover_un_actor", datos);
    });

  }

  eliminar() {
    //if (this.figura) {
    //  this.eliminar_figura(this.figura);
    //}

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

  private eliminar_figura(figura: any) {
    let matter = this.pilas.Phaser.Physics.Matter.Matter;
    let world = this.pilas.modo.matter.world.localWorld;
    matter.World.remove(world, figura);
  }
}
