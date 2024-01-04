const COLOR_DEL_LASER = 0xfffda0;

class Modo extends Phaser.Scene {
  matter: Phaser.Physics.Matter.MatterPhysics;
  actores: any;
  pilas: Pilas;
  fps: any;
  graphics: any;
  fondo: any;
  _nombre_del_fondo: string = "";
  ancho: number;
  alto: number;
  es_modo_ejecucion: boolean;
  canvas_fisica: Phaser.GameObjects.Graphics;
  posicion_anterior_de_arrastre: any;
  actor_seleccionado: any;

  constructor(data: any) {
    super(data);
    this.es_modo_ejecucion = false;
  }

  create(datos: any, ancho: number, alto: number) {
    this.ancho = ancho;
    this.alto = alto;

    this.canvas_fisica = this.sys.add.graphics({ x: 0, y: 0 });
    this.canvas_fisica.depth = 99999;

    if (!datos.pilas.opciones.modo_simple) {
      this.crear_indicadores_de_rendimiento_fps();
    }

    this.crear_canvas_de_depuracion();
    this.pilas = datos.pilas;

    if (datos.proyecto && datos.proyecto.fps === 30) {
      this.matter.set30Hz();
    }
  }

  crear_indicadores_de_rendimiento_fps() {
    this.fps = this.add.bitmapText(5, 10, "color-blanco-con-sombra", "");
    this.fps.scrollFactorX = 0;
    this.fps.scrollFactorY = 0;
    this.fps.depth = 999999;
  }

  destacar_actor_por_id(id) {
    let actor = this.obtener_actor_por_id(id);

    if (this.actor_seleccionado) {
      this.actor_seleccionado.quitar_destacado();
    }

    if (actor && actor.destacar) {
      actor.destacar();
      this.actor_seleccionado = actor;
    }
  }

  crear_canvas_de_depuracion() {
    let graphics = this.add.graphics();
    graphics.depth = 20000;
    this.graphics = graphics;
  }

  update(actores) {
    this.graphics.clear();

    actores = actores || this.actores;

    if (this.pilas.depurador.modo_posicion_activado && !this.es_modo_ejecucion) {
      actores.map(sprite => {
        this.dibujar_punto_de_control(this.graphics, sprite.x, sprite.y);
      });
    }
  }

  actualizar_canvas_fisica() {
    let canvas = this.canvas_fisica;
    let figuras = this.matter.world.localWorld.bodies;

    canvas.clear();

    for (let i = 0; i < figuras.length; i++) {
      let figura = figuras[i];
      let color = null;

      if (figura.es_sensor) {
        color = 0xff4040;
      } else {
        if (figura.es_dinamica) {
          color = 0x00ff00;
        } else {
          color = 0x0000ff;
        }
      }

      this.dibujar_figura_desde_vertices(canvas, 2, color, figura.vertices);
    }

    this.dibujar_lasers();
  }

  // se sobre-escribe en modo pausa
  dibujar_lasers() {
    let canvas = this.canvas_fisica;

    this.actores.map(actor => {
      actor.lasers.map(laser => {
        this.dibujar_laser_del_actor(laser, canvas, actor);
      });
    });
  }

  protected dibujar_laser_del_actor(laser: any, canvas: Phaser.GameObjects.Graphics, actor: any) {
    let angulo = -laser.rotacion * (Math.PI / 180);
    const color = COLOR_DEL_LASER;

    let desde_x = actor.x;
    let desde_y = actor.y;
    let hasta_x = actor.x + Math.cos(angulo) * laser.longitud;
    let hasta_y = actor.y + Math.sin(angulo) * laser.longitud;

    canvas.lineStyle(2, color, 1);
    canvas.lineBetween(desde_x, desde_y, hasta_x, hasta_y);

    let puntos = this._laser_entre_entidades(desde_x, desde_y, hasta_x, hasta_y, actor);

    puntos.map(interseccion => {
      canvas.beginPath();
      canvas.fillStyle(color);
      canvas.fillCircle(interseccion.x, interseccion.y, 5);
      canvas.closePath();
    });
  }

  _laser_entre_entidades(x1, y1, x2, y2, actor: Actor): Intersección[] {
    let bodies = this.matter.world.getAllBodies();
    let ids = [];
    let colisiones = raycast(bodies, { x: x1, y: y1 }, { x: x2, y: y2 });

    colisiones = colisiones.filter(col => {
      // @ts-ignore
      if (actor && actor.figura && actor.figura.id === col.body.id) {
        // se ignoran las colisiones con la propia figura del actor.
        return false;
      }

      // caso particular: cuando se calcula el laser en el modo pausa
      // se tiene que omitir el contacto entre el laser y la figura del actor.
      if (col.body && col.body.actor_id && col.body.actor_id === actor.id) {
        return false;
      }

      if (col.body.es_sensor) {
        return false;
      }

      if (ids.includes(col.body.id)) {
        return false;
      } else {
        ids.push(col.body.id);
      }

      return col;
    });

    return colisiones
      .map(col => {
        let distancia = this.pilas.obtener_distancia_entre_puntos(x1, y1, col.point.x, col.point.y);

        return {
          actor: null,
          body: col.body,
          distancia: distancia,
          x: col.point.x,
          y: col.point.y
        };
      })
      .sort((a, b) => a.distancia - b.distancia);
  }

  dibujar_figura_desde_vertices(canvas, linea, color, vertices) {
    canvas.beginPath();
    canvas.lineStyle(linea, color, 2);

    canvas.moveTo(vertices[0].x, vertices[0].y);

    var vertLength = vertices.length;

    for (var j = 1; j < vertLength; j++) {
      if (!vertices[j - 1].isInternal) {
        canvas.lineTo(vertices[j].x, vertices[j].y);
      } else {
        canvas.moveTo(vertices[j].x, vertices[j].y);
      }

      if (vertices[j].isInternal) {
        canvas.moveTo(vertices[(j + 1) % vertices.length].x, vertices[(j + 1) % vertices.length].y);
      }
    }

    canvas.lineTo(vertices[0].x, vertices[0].y);

    canvas.closePath();
    canvas.strokePath();
  }

  crear_fondo(fondo, ancho, alto) {
    this._nombre_del_fondo = fondo;
    this.pilas.utilidades.validar_que_existe_imagen(fondo);

    // Espera el tamaño de escenario de la escena, pero si no
    // se define una el area de pantalla del proyecto.
    ancho = ancho || this.ancho;
    alto = alto || this.alto;

    // TODO: reemplazar por una función propia que obtenga la galería
    if (fondo.indexOf(":") > -1) {
      let g = fondo.split(":")[0];
      let i = fondo.split(":")[1];

      this.fondo = this.add.tileSprite(0, 0, ancho, alto, g, i);
    } else {
      this.fondo = this.add.tileSprite(0, 0, ancho, alto, fondo);
    }

    this.fondo.depth = -20000;
    this.fondo.setOrigin(0);
  }

  obtener_posicion_de_la_camara() {
    let x = this.pilas.modo.cameras.cameras[0].scrollX;
    let y = this.pilas.modo.cameras.cameras[0].scrollY;
    return { x, y };
  }

  posicionar_fondo(dx, dy) {
    if (!dx) {
      dx = 0;
    }

    if (!dy) {
      dy = 0;
    }

    let posicion_de_la_camara = this.obtener_posicion_de_la_camara();

    if (this.fondo) {
      this.fondo.x = posicion_de_la_camara.x;
      this.fondo.y = posicion_de_la_camara.y;

      this.fondo.tilePositionX = posicion_de_la_camara.x + dx;
      this.fondo.tilePositionY = posicion_de_la_camara.y + dy;
    }
  }

  cambiar_fondo(fondo, ancho, alto) {
    // Este método se re-define en la clase modo_editor
    if (fondo !== this._nombre_del_fondo) {
      this.fondo.destroy();
      this.fondo = null;
      this.crear_fondo(fondo, ancho, alto);
    } else {
      this.fondo.width = ancho;
      this.fondo.height = alto;
    }
  }

  obtener_actor_por_id(id) {
    if (this.pilas && this.pilas.modo && this.pilas.actores) {
      let actor = this.pilas.modo.actores.find(e => e.identificador == id)
      console.assert(actor, "no se encuentra el actor buscado con el id " + id);
      return actor;
    } else {
      console.assert(false, "Imposible buscar actores porque la lista no existe");
      return null;
    }
  }

  deprecated__actualizar_sprite_desde_datos(sprite, actor) {
    sprite.actualizar_datos(actor);

    /*
    if (actor.imagen.indexOf(":") > -1) {
      let g = actor.imagen.split(":")[0];
      let i = actor.imagen.split(":")[1];

      sprite.setTexture(g, i);
    } else {
      sprite.setTexture(actor.imagen);
    }

    // Arreglo: se cambia el area de contacto para poder
    // arrastrar correctamente al actor luego de cambiar su textura.
    if (sprite.input) {
      sprite.input.hitArea.width = sprite.width;
      sprite.input.hitArea.height = sprite.height;
    }

    if (this.actor_seleccionado === sprite) {
      this.input.enableDebug(sprite, 0xffffff);
    }

    if (actor.activo === false) {
      sprite.alpha = 0.5;
    } else {
      sprite.alpha = 1 - actor.transparencia / 100;
    }

    sprite.id = actor.id;
    sprite.x = coordenada.x;
    sprite.y = coordenada.y;
    sprite.angle = -actor.rotacion;
    sprite.scaleX = actor.escala_x;
    sprite.scaleY = actor.escala_y;
    sprite.depth = -actor.z || 0;
    sprite.setOrigin(actor.centro_x, actor.centro_y);

    if (sprite.figura) {
      this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, sprite.figura);
    }

    if (actor.figura) {
      sprite.figura = this.crear_figura_estatica_para(actor);
    }

    this.actualizar_sensores_del_actor(actor, sprite);
    this.actualizar_lasers_del_actor(actor, sprite);

    sprite.setFlipX(actor.espejado);
    sprite.setFlipY(actor.espejado_vertical);

    if (actor.es_texto) {
      if (sprite["texto"] && sprite["texto_fuente"] !== actor.fuente) {
        sprite["texto"].destroy();
        sprite["texto"] = undefined;

        if (sprite["fondo"]) {
          sprite["fondo"].destroy();
        }
      }

      if (!sprite["texto"]) {
        sprite["texto"] = this.add.bitmapText(0, 0, actor.fuente, actor.texto);
        sprite["texto_fuente"] = actor.fuente;

        sprite.update = () => {
          this.copiar_valores_de_sprite_a_texto(sprite);
        };

        if (actor.fondo) {
          let imagen = this.obtener_imagen_para_nineslice(actor.fondo);
          let f = this.add["nineslice"](0, 0, 30, 20, imagen, 10, 10);
          sprite["fondo"] = f;
          sprite["fondo_imagen"] = actor.fondo;
        }
      }

      sprite["texto"].text = actor.texto;

      if (actor.fondo !== sprite["fondo_imagen"]) {
        if (sprite["fondo"]) {
          sprite["fondo"].destroy();
        }

        if (actor.fondo) {
          let imagen = this.obtener_imagen_para_nineslice(actor.fondo);
          let f = this.add["nineslice"](0, 0, 30, 20, imagen, 10, 10);
          sprite["fondo"] = f;
          sprite["fondo_imagen"] = actor.fondo;
        }
      }

      this.copiar_valores_de_sprite_a_texto(sprite);
    }
    */
  }

  private actualizar_sensores_del_actor(actor, sprite) {
    if (sprite.sensores) {
      sprite.sensores.map(sensor => {
        this.pilas.Phaser.Physics.Matter.Matter.World.remove(this.pilas.modo.matter.world.localWorld, sensor);
      });
    }

    if (actor.sensores) {
      sprite.sensores = actor.sensores.map(sensor => {
        let figura = this.matter.add.rectangle(
          sensor.x + sprite.x,
          -sensor.y + sprite.y,
          sensor.ancho,
          sensor.alto,
          {
            isStatic: true
          }
          //
        );

        // Se guarda algo de información adicional para el depurador gráfico
        // de física y par ajustar los sensores al sprite que los contiene.
        figura["es_sensor"] = true;
        figura["dx"] = sensor.x;
        figura["dy"] = sensor.y;

        return figura;
      });
    }
  }

  private actualizar_lasers_del_actor(actor, sprite) {
    if (actor.lasers) {
      sprite.lasers = actor.lasers.map(laser => {
        return {
          nombre: laser.nombre,
          rotacion: laser.rotacion,
          longitud: laser.longitud
        };
      });
    }
  }

  obtener_imagen_para_nineslice(imagen: string) {
    if (imagen.indexOf(":") > -1) {
      let partes = imagen.split(":");
      return { key: partes[0], frame: partes[1] };
    } else {
      return imagen;
    }
  }

  copiar_valores_de_sprite_a_texto(sprite) {
    let texto = sprite["texto"];
    let fondo = sprite["fondo"];

    texto.x = sprite.x;
    texto.y = sprite.y;
    texto.angle = sprite.angle;
    texto.scaleX = sprite.scaleX;
    texto.scaleY = sprite.scaleY;

    texto.alpha = sprite.alpha;
    texto.flipX = sprite.flipX;
    texto.flipY = sprite.flipY;
    texto.setOrigin(sprite.originX, sprite.originY);
    texto.depth = sprite.depth + 0.1;

    if (sprite.input) {
      sprite.input.hitArea.width = texto.width + 15;
      sprite.input.hitArea.height = texto.height + 10;

      sprite.input.hitArea.x = -texto.width / 2;
      sprite.input.hitArea.y = -texto.height / 2;
    }

    if (fondo) {
      let margen = 30;
      fondo.x = sprite.x;
      fondo.y = sprite.y;

      fondo.angle = sprite.angle;
      fondo.scaleX = sprite.scaleX;
      fondo.scaleY = sprite.scaleY;
      fondo.setOrigin(sprite.originX, sprite.originY);

      fondo.alpha = sprite.alpha;
      fondo.flipX = sprite.flipX;
      fondo.flipY = sprite.flipY;
      fondo.resize(texto.width + margen, texto.height + margen);

      // el dialogo es un tipo de fondo especial, que queda mal
      // si el texto está muy arriba.
      if (sprite["fondo_imagen"].includes("dialogo")) {
        fondo.y += 4;
      }

      fondo.depth = texto.depth - 1;

      sprite.width = texto.width + margen;
      sprite.height = texto.height + margen;

      if (sprite.input) {
        sprite.setOrigin(sprite.originX, sprite.originY);
        sprite.input.hitArea.width = texto.width + margen;
        sprite.input.hitArea.height = texto.height + margen;
        sprite.input.hitArea.x = 0;
        sprite.input.hitArea.y = 0;
      }
    }
  }

  crear_figura_estatica_para(actor) {
    let coordenada = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(actor.x, actor.y);
    let angulo = this.pilas.utilidades.convertir_angulo_a_radianes(-actor.rotacion);
    let figura = null;

    if (actor.figura === "rectangulo") {
      figura = this.matter.add.rectangle(
        coordenada.x,
        coordenada.y,
        actor.figura_ancho,
        actor.figura_alto,
        {
          isStatic: true,
          angle: angulo
        }
        //
      );

      figura.es_sensor = actor.figura_sensor;
      figura.es_dinamica = actor.figura_dinamica;
      return figura;
    }

    if (actor.figura === "circulo") {
      let figura = this.matter.add.circle(
        coordenada.x,
        coordenada.y,
        actor.figura_radio,
        {
          isStatic: true,
          angle: angulo //
        },
        25
        //
      );

      figura["es_sensor"] = actor.figura_sensor;
      figura["es_dinamica"] = actor.figura_dinamica;
      return figura;
    }

    throw Error(`No se reconoce la figura ${actor.figura} en este modo.`);
  }

  actualizar_posicion(_posicion: any = null) {
    throw Error("No se puede actualizar posicion en este modo. Solo se puede en el modo pausa.");
  }

  dibujar_punto_de_control(graphics: Phaser.GameObjects.Graphics, x: number, y: number) {
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }

  // se implementa en ModoPausa
  selecciona_actor_o_escena_en_modo_pausa(actor: any) {}
}
