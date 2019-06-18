class ceferino extends Actor {
  propiedades = {
    imagen: "imagenes:basicos/invisible"
  };

  sprites: any = {};
  dt: number;
  pose: any;
  contenedor: any;

  atlas: string;
  animacion_actual: string;

  iniciar() {
    let scon = this.pilas.game.cache.json.get("ceferino");
    //let scon = this.pilas.game.cache.json.get("robot");
    var data = new Data().load(scon);
    var pose = new Pose(data);

    let entidad = Object.keys(pose.getEntities())[0];
    pose.setEntity(entidad);
    this.pose = pose;

    this.definir_animacion(this.obtener_primer_animacion());

    this.atlas = "atlas-ceferino";
    //this.atlas = "atlas-robot";

    this.dt = 0;

    let boton = this.pilas.actores.boton();
    boton.texto = "Avanzar animación";
    boton.y = -100;

    boton.cuando_hace_click = () => {
      this.eliminar_sprites();

      let animacion = this.obtener_siguiente_animacion();
      this.definir_animacion(animacion);
    };

    this.contenedor = this.pilas.modo.add.container();
  }

  obtener_animaciones() {
    return Object.keys(this.pose.getAnims());
  }

  obtener_primer_animacion() {
    let animaciones = this.obtener_animaciones();
    return animaciones[0];
  }

  definir_animacion(nombre: string) {
    this.animacion_actual = nombre;
    this.pose.setAnim(nombre);
  }

  obtener_siguiente_animacion() {
    let animacion = this.animacion_actual;
    let animaciones = this.obtener_animaciones();

    let indice = animaciones.indexOf(animacion);

    indice += 1;

    if (indice >= animaciones.length) {
      indice = 0;
    }

    return animaciones[indice];
  }

  eliminar_sprites() {
    let items = Object.keys(this.sprites);
    for (let i = 0; i < items.length; i++) {
      let sprite = this.sprites[items[i]];
      this.contenedor.remove(sprite);
      sprite.destroy();
    }

    this.sprites = {};
  }

  actualizar() {
    this.pose.update(8);
    //this.pose.update(20);
    this.pose.strike();

    this.pilas.observar("animacion", this.animacion_actual);

    this.actualizar_posicion(this.pose);
  }

  obtener_o_crear_sprite(nombre: string, imagen: string) {
    if (this.sprites[nombre]) {
      return this.sprites[nombre];
    } else {
      let sprite = this.pilas.modo.add.sprite(0, 0, this.atlas, imagen);
      this.sprites[nombre] = sprite;
      return sprite;
    }
  }

  actualizar_posicion(pose) {
    pose.object_array.map(data => {
      let imagen = pose.data.folder_array[data.folder_index].file_array[data.file_index].name;
      let sprite = this.obtener_o_crear_sprite(data.name, imagen);

      sprite.setAlpha(data.alpha);
      sprite.x = data.world_space.position.x + 200;
      sprite.y = -data.world_space.position.y + 200;
      sprite.setScale(data.world_space.scale.x, data.world_space.scale.y);
      sprite.setDepth(data.world_space.z_index);
      sprite.setRotation(-data.world_space.rotation.rad);

      this.contenedor.add(sprite);
    });
  }
}
