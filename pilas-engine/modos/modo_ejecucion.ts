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
  modo_fisica_activado: boolean;
  _escena_en_ejecucion: any = null;
  teclas: Set<string> = null;

  instancia_de_proyecto: any = null;

  constructor() {
    super({ key: "ModoEjecucion" });
    this.es_modo_ejecucion = true;
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];
    this.teclas = new Set();

    try {
      this.guardar_parametros_en_atributos(datos);
      let escena = this.obtener_escena_inicial();

      this.clases = this.obtener_referencias_a_clases();

      this.cargar_animaciones(datos);

      if (!datos.es_cambio_de_escena) {
        this.instanciar_proyecto();
      }

      this.instanciar_escena(this.nombre_de_la_escena_inicial);

      if (this.pilas.opciones.modo_simple) {
        if (this.pilas["onready"]) {
          this.pilas["onready"](this.pilas);
        } else {
          console.warn("Estas usando pilas en modo simple, pero no has indicado pilas.onready = () => { /* codigo */}");
        }
      } else {
        this.pilas.mensajes.emitir_mensaje_al_editor("termina_de_iniciar_ejecucion", {});
      }

      this.pilas.historia.limpiar();

      this.conectar_eventos();

      this.vincular_eventos_de_colision();
      this.modificar_modo_de_pantalla();
    } catch (e) {
      console.error(e);
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
      this.pausar();
    }
  }

  modificar_modo_de_pantalla() {
    this.pilas.game.scale.scaleMode = Phaser.Scale.FIT; // O bien Phaser.Scale.NONE
    this.pilas.game.scale.resize(this.ancho, this.alto);
  }

  private cargar_animaciones(datos) {
    let animaciones = datos.proyecto.animaciones;

    if (animaciones) {
      for (let i = 0; i < animaciones.length; i++) {
        let animación = animaciones[i];
        let cuadros_de_animacion = animación.cuadros.map(e => e.nombre);
        this.pilas.animaciones.crear_animacion(animación.nombre, cuadros_de_animacion, animación.velocidad);
      }
    }
  }

  private conectar_eventos() {
    this.input.on("pointermove", this.manejar_evento_muevemouse.bind(this));
    this.input.on("pointerdown", this.manejar_evento_click_de_mouse.bind(this));
    this.input.on("pointerup", this.manejar_evento_termina_click.bind(this));
    this.input.keyboard.on("keydown", this.manejar_evento_key_down.bind(this));
    this.input.keyboard.on("keyup", this.manejar_evento_key_up.bind(this));
  }

  private manejar_evento_click_de_mouse(evento) {
    let x = evento.worldX;
    let y = evento.worldY;
    let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(x, y);

    this.pilas.eventos.emitir_evento("click_de_mouse", {
      x: posicion.x,
      y: posicion.y,
      evento
    });

    if (this._escena_en_ejecucion) {
      try {
        this._escena_en_ejecucion.cuando_hace_click(posicion.x, posicion.y, evento);
        this._escena_en_ejecucion.avisar_click_en_la_pantalla_a_los_actores(posicion.x, posicion.y, evento);
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_hace_click");
        this.pausar();
      }
    }
  }

  private manejar_evento_termina_click(evento) {
    let x = evento.worldX;
    let y = evento.worldX;
    let p = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(x, y);

    this.pilas.eventos.emitir_evento("termina_click", {
      x: p.x,
      y: p.y,
      evento
    });
  }

  private manejar_evento_muevemouse(evento) {
    let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
    this.pilas.cursor_x = Math.trunc(posicion.x);
    this.pilas.cursor_y = Math.trunc(posicion.y);

    let posicion_absoluta = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(evento.worldX, evento.worldY);
    this.pilas.cursor_x_absoluta = Math.trunc(posicion_absoluta.x);
    this.pilas.cursor_y_absoluta = Math.trunc(posicion_absoluta.y);

    this.pilas.eventos.emitir_evento("mueve_mouse", {
      x: posicion.x,
      y: posicion.y,
      evento
    });

    if (this._escena_en_ejecucion) {
      try {
        this._escena_en_ejecucion.cuando_mueve(posicion.x, posicion.y, evento);
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "emitir cuando_mueve");
        this.pausar();
      }
    }
  }

  private manejar_evento_key_down(evento) {
    if (!this.teclas.has(evento.code)) {
      this.teclas.add(evento.code);

      let tecla = this.pilas.utilidades.obtener_nombre_de_la_tecla_desde_un_evento(evento);

      this._escena_en_ejecucion.cuando_pulsa_tecla(tecla, evento);
      this._escena_en_ejecucion.avisar_cuando_pulsa_tecla_a_los_actores(tecla, evento);
    }
  }

  private manejar_evento_key_up(evento) {
    this.teclas.delete(evento.code);

    if (evento.key === "Escape") {
      this.pilas.mensajes.emitir_mensaje_al_editor("pulsa_la_tecla_escape", {});
    }

    let tecla = this.pilas.utilidades.obtener_nombre_de_la_tecla_desde_un_evento(evento);

    this._escena_en_ejecucion.cuando_suelta_tecla(tecla, evento);
    this._escena_en_ejecucion.avisar_cuando_suelta_tecla_a_los_actores(tecla, evento);
  }

  cambiar_escena(nombre: string) {
    let parametros = {
      pilas: this.pilas,
      nombre_de_la_escena_inicial: nombre,
      permitir_modo_pausa: this.permitir_modo_pausa,
      codigo: this.codigo,
      proyecto: this.proyecto,
      es_cambio_de_escena: true
    };

    this.pilas.definir_modo("ModoEjecucion", parametros);
  }

  vincular_eventos_de_colision() {
    let pilas = this.pilas;
    let modo = this;

    this.matter.world.on("beforeupdate", function(listener) {
      let cuerpos_estaticos = this.engine.world.bodies.filter(e => e.isStatic);

      cuerpos_estaticos.map(cuerpo => {
        try {
          let otros_cuerpos = cuerpos_estaticos.filter(c => c.id !== cuerpo.id);
          let colisiones = pilas.Phaser.Physics.Matter.Matter.Query.collides(cuerpo, otros_cuerpos);

          colisiones.map(colision => {
            let figura_1 = colision.bodyA;
            let figura_2 = colision.bodyB;

            if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
              let actor_a = figura_1.gameObject.actor;
              let actor_b = figura_2.gameObject.actor;

              ///actor_a.colisiones.push(actor_b);
              ///actor_b.colisiones.push(actor_a);

              if (actor_a._vivo && actor_b._vivo) {
                let cancelar_1 = actor_a.cuando_colisiona(actor_b);
                let cancelar_2 = actor_b.cuando_colisiona(actor_a);

                if (cancelar_1 || cancelar_2) {
                  colision.isActive = false;
                }
              }
            }
          });
        } catch (e) {
          console.error(e);
          pilas.mensajes.emitir_excepcion_al_editor(e, "al detectar colisiones");
          modo.pausar();
        }
      });
    });

    this.matter.world.on("collisionstart", (event /*, a, b*/) => {
      try {
        for (let i = 0; i < event.pairs.length; i++) {
          let colision = event.pairs[i];
          let figura_1 = colision.bodyA;
          let figura_2 = colision.bodyB;

          if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
            let actor_a = figura_1.gameObject.actor;
            let actor_b = figura_2.gameObject.actor;

            actor_a.colisiones.push(actor_b);
            actor_b.colisiones.push(actor_a);

            let cancelar_1 = actor_a.cuando_comienza_una_colision(actor_b);
            let cancelar_2 = actor_b.cuando_comienza_una_colision(actor_a);

            if (cancelar_1 || cancelar_2) {
              colision.isActive = false;
            }
          } else {
            // colisión entre sensor de actor y actor

            if (figura_2.sensor_del_actor && figura_1.gameObject && figura_2.sensor_del_actor !== figura_1.gameObject.actor) {
              figura_2.colisiones.push(figura_1.gameObject.actor);
            }

            if (figura_1.sensor_del_actor && figura_2.gameObject && figura_1.sensor_del_actor !== figura_2.gameObject.actor) {
              figura_1.colisiones.push(figura_2.gameObject.actor);
            }
          }
        }
      } catch (e) {
        console.error(e);
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
        this.pausar();
      }
    });

    this.matter.world.on("collisionactive", (event, a, b) => {
      for (let i = 0; i < event.pairs.length; i++) {
        let colision = event.pairs[i];
        let figura_1 = colision.bodyA;
        let figura_2 = colision.bodyB;

        // colisión entre actores.

        if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
          let actor_a = figura_1.gameObject.actor;
          let actor_b = figura_2.gameObject.actor;

          if (actor_a.colisiones.indexOf(actor_b) === -1) {
            actor_a.colisiones.push(actor_b);
          }

          if (actor_b.colisiones.indexOf(actor_a) === -1) {
            actor_b.colisiones.push(actor_a);
          }

          actor_a.cuando_se_mantiene_una_colision(actor_b);
          actor_b.cuando_se_mantiene_una_colision(actor_a);
        } else {
        }
      }
    });

    this.matter.world.on("collisionend", (event, a, b) => {
      try {
        for (let i = 0; i < event.pairs.length; i++) {
          let colision = event.pairs[i];
          let figura_1 = colision.bodyA;
          let figura_2 = colision.bodyB;

          if (figura_1.gameObject && figura_1.gameObject.actor && figura_2.gameObject && figura_2.gameObject.actor) {
            let actor_a = figura_1.gameObject.actor;
            let actor_b = figura_2.gameObject.actor;

            actor_a.colisiones.splice(actor_a.colisiones.indexOf(actor_b), 1);
            actor_b.colisiones.splice(actor_b.colisiones.indexOf(actor_a), 1);

            actor_a.cuando_termina_una_colision(actor_b);
            actor_b.cuando_termina_una_colision(actor_a);
          } else {
            // colisión entre sensor de actor y actor

            if (figura_2.sensor_del_actor && figura_1.gameObject && figura_2.colisiones.indexOf(figura_1.gameObject.actor) > -1) {
              figura_2.colisiones.splice(figura_2.colisiones.indexOf(figura_1.gameObject.actor), 1);
            }

            if (figura_1.sensor_del_actor && figura_2.gameObject && figura_1.colisiones.indexOf(figura_2.gameObject.actor) > -1) {
              figura_1.colisiones.splice(figura_1.colisiones.indexOf(figura_2.gameObject.actor), 1);
            }
          }
        }
      } catch (e) {
        this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
        this.pausar();
      }
    });
  }

  obtener_escena_inicial() {
    let nombre = this.obtener_nombre_de_la_escena_inicial();
    return this.obtener_escena_por_nombre(nombre);
  }

  obtener_nombre_de_la_escena_inicial() {
    return this.nombre_de_la_escena_inicial;
  }

  obtener_escena_por_nombre(nombre: string) {
    let escenas_encontradas = this.proyecto.escenas.filter(e => e.nombre == nombre);

    let nombres = this.proyecto.escenas.map(e => e.nombre).join(",");

    if (escenas_encontradas.length === 0) {
      throw Error(`No se puede encontrar la escena '${nombre}' en ${nombres}`);
    } else {
      if (escenas_encontradas.length > 1) {
        throw Error(`Hay más de una escena llamada '${nombre}'.`);
      }
    }

    return escenas_encontradas[0];
  }

  instanciar_proyecto() {
    //if (!this.instancia_de_proyecto) {
    let proyecto = new this.clases["Proyecto"](this.pilas);

    if (proyecto.iniciar) {
      proyecto.iniciar();
    }

    this.instancia_de_proyecto = proyecto;
    //}
  }

  instanciar_escena(nombre) {
    let escena = this.obtener_escena_por_nombre(nombre);

    if (escena.fondo) {
      this.crear_fondo(escena.fondo, escena.ancho, escena.alto);
    } else {
      console.warn("Cuidado, la escena no tiene un fondo definido");
    }

    this.crear_escena(escena);
  }

  crear_escena(datos_de_la_escena) {
    let nombre = datos_de_la_escena.nombre;

    if (!this.clases[nombre]) {
      throw new Error(`No hay una clase con el nombre ${nombre}`);
    }

    let escena = new this.clases[nombre](this.pilas);
    escena.proyecto = this.instancia_de_proyecto;

    escena.camara.x = datos_de_la_escena.camara_x;
    escena.camara.y = datos_de_la_escena.camara_y;
    escena.fondo = datos_de_la_escena.fondo;
    escena.ancho = datos_de_la_escena.ancho;
    escena.alto = datos_de_la_escena.alto;

    if (datos_de_la_escena.gravedad_x !== undefined) {
      escena.gravedad_x = datos_de_la_escena.gravedad_x;
    }

    if (datos_de_la_escena.gravedad_y !== undefined) {
      escena.gravedad_y = datos_de_la_escena.gravedad_y;
    }

    this.actores = datos_de_la_escena.actores
      .map(e => {
        if (e.activo === false) {
          return false;
        }

        return this.crear_actor(e);
      })
      .filter(e => e);

    this._escena_en_ejecucion = escena;

    escena.iniciar();
  }

  clonar_actor_por_nombre(nombre: string) {
    let nombres_de_todos_los_actores = this.obtener_nombres_de_actores();

    if (nombres_de_todos_los_actores.indexOf(nombre) === -1) {
      let nombre_mas_similar = this.pilas.utilidades.obtener_mas_similar(nombre, nombres_de_todos_los_actores);
      throw new Error(`No se encuentra el actor "${nombre}", ¿quisiste decir "${nombre_mas_similar}"?`);
    }

    let entidad = this.obtener_definicion_de_actor_por_nombre(nombre);

    // Se elimina el "id" original del actor para que al clonarse, el
    // método "pre_actualizar" del actor le asigne un id autoincremental
    // nuevo.

    entidad.id = undefined;

    return this.crear_actor(entidad);
  }

  /**
   * Obtiene los nombres de los actores de todas las escenas.
   */
  obtener_nombres_de_actores() {
    return this.obtener_entidades_de_actores_de_todas_las_escenas().map(entidad => entidad.nombre);
  }

  obtener_entidades_de_actores_de_todas_las_escenas() {
    return this.proyecto.escenas.map(escena => escena.actores).reduce((a, b) => a.concat(b));
  }

  obtener_definicion_de_actor_por_nombre(nombre: string) {
    let entidades = this.obtener_entidades_de_actores_de_todas_las_escenas();
    return entidades.filter(entidad => entidad.nombre === nombre)[0];
  }

  crear_actor(entidad) {
    let x = entidad.x;
    let y = entidad.y;
    let imagen = entidad.imagen;
    let actor = null;

    let clase = this.clases[entidad.nombre];

    if (clase) {
      actor = new this.clases[entidad.nombre](this.pilas);
      actor.proyecto = this.instancia_de_proyecto;

      let p = this.pilas.utilidades.combinar_propiedades(actor.propiedades_base, actor.propiedades);
      p = this.pilas.utilidades.combinar_propiedades(p, entidad);

      actor.pre_iniciar(p);
      actor.agregar_sensores_desde_lista(entidad.sensores);
      actor.iniciar();

      if (entidad.habilidades) {
        entidad.habilidades.map(habilidad => {
          actor.aprender(habilidad);
        });
      }
    } else {
      let nombres_de_clases = Object.getOwnPropertyNames(this.clases);
      throw new Error(`No existe código para crear un actor de la clase ${entidad.nombre}. Las clases disponibles son [${nombres_de_clases.join(", ")}]`);
    }

    return actor;
  }

  obtener_referencias_a_clases() {
    let codigoDeExportacion = this.obtener_codigo_para_exportar_clases(this.codigo);
    let codigo_completo = this.codigo + codigoDeExportacion;

    return eval(codigo_completo);
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
    return `__clases = ${diccionario_como_cadena};\n__clases;`;
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

  update() {
    super.update(this.pilas.escena.actores);

    try {
      this.pilas.escena.pre_actualizar();
      this.pilas.escena.actualizar();
      this.pilas.escena.actualizar_actores();
      this.pilas.escena.reproducir_sonidos_pendientes();

      if (this.permitir_modo_pausa) {
        this.guardar_foto_de_entidades();
      }
    } catch (e) {
      console.error(e);
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "actualizando escena");
      this.pilas.modo.pausar();
    }

    if (this.pilas.depurador.fisica_en_modo_ejecucion) {
      this.canvas_fisica.setAlpha(1);
      this.actualizar_canvas_fisica();
    } else {
      this.canvas_fisica.setAlpha(0);
    }

    this.posicionar_fondo(this.pilas.escena.desplazamiento_del_fondo_x, this.pilas.escena.desplazamiento_del_fondo_y);
  }

  pausar() {
    console.warn("Pausando la escena a causa del error anterior.");
    this.scene.pause(); // tslint:disable-line
  }

  guardar_foto_de_entidades() {
    this.pilas.historia.serializar_escena(this.pilas.escena);
  }

  dibujar_punto_de_control(graphics, _x, _y) {
    graphics.fillStyle(0xffffff, 1);
    let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(_x, _y);
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }
}
