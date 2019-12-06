class Huesos {
  pose: any;
  contenedor: any;
  atlas: string;
  animacion_actual: string;
  pilas: Pilas;
  sprites: any = {};
  prefijo_de_imagenes: string = "";

  constructor(pilas: Pilas, nombre_de_datos_json: string, nombre_de_atlas: string, contenedor: any) {
    this.contenedor = contenedor;
    this.atlas = nombre_de_atlas;
    this.pilas = pilas;

    let scon = this.pilas.game.cache.json.get(nombre_de_datos_json);
    var data = new Data().load(scon);
    var pose = new Pose(data);

    let entidad = Object.keys(pose.getEntities())[0];
    pose.setEntity(entidad);
    this.pose = pose;

    this.definir_animacion(this.obtener_primer_animacion());
  }

  obtener_animaciones() {
    return Object.keys(this.pose.getAnims());
  }

  obtener_primer_animacion() {
    let animaciones = this.obtener_animaciones();
    return animaciones[0];
  }

  definir_animacion(nombre: string) {
    if (nombre != this.animacion_actual) {
      this.eliminar_sprites();
      this.animacion_actual = nombre;
      this.pose.setAnim(nombre);
      this.pose.update(0);
      this.pose.setTime(0);
      this.pose.strike();
      this.actualizar_posicion(this.pose);
    }
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

  actualizar_animacion(dt: any) {
    this.pose.update(dt);
    this.pose.strike();
    this.actualizar_posicion(this.pose);
  }

  obtener_o_crear_sprite(nombre: string, imagen: string) {
    if (this.sprites[nombre]) {
      return this.sprites[nombre];
    } else {
      let sprite = null;

      if (this.atlas) {
        sprite = this.pilas.modo.add.sprite(0, 0, this.atlas, imagen);
      } else {
        sprite = this.pilas.modo.add.sprite(0, 0, imagen);
      }

      this.sprites[nombre] = sprite;
      return sprite;
    }
  }

  actualizar_posicion(pose) {
    pose.object_array.map((data: any) => {
      let imagen = pose.data.folder_array[data.folder_index].file_array[data.file_index].name;
      let sprite = this.obtener_o_crear_sprite(data.name, this.prefijo_de_imagenes + imagen);

      // FIXME: este cambio se realiza a causa de pilas-engine con bloques, en donde necesitamos
      // cambiar la textura de cada una de las partes a partir del prefijo.
      if (this.prefijo_de_imagenes) {
        sprite.setTexture(this.prefijo_de_imagenes + imagen);
      }

      sprite.setAlpha(data.alpha);
      sprite.x = data.world_space.position.x;
      sprite.y = -data.world_space.position.y;
      sprite.setScale(data.world_space.scale.x, data.world_space.scale.y);
      sprite.setDepth(data.world_space.z_index);
      sprite.setRotation(-data.world_space.rotation.rad);

      this.contenedor.add(sprite);
    });
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
}
