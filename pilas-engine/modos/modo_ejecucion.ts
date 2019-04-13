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

  constructor() {
    super({ key: "ModoEjecucion" });
  }

  preload() {}

  create(datos) {
    super.create(datos, datos.proyecto.ancho, datos.proyecto.alto);
    this.actores = [];

    try {
      this.guardar_parametros_en_atributos(datos);
      let escena = this.obtener_escena_inicial();

      this.clases = this.obtener_referencias_a_clases();

      this.instanciar_escena(this.nombre_de_la_escena_inicial);

      this.pilas.mensajes.emitir_mensaje_al_editor(
        "termina_de_iniciar_ejecucion",
        {}
      );
      this.pilas.historia.limpiar();

      this.modo_fisica_activado = false;

      if (this.pilas.depurador.mostrar_fisica) {
        this.modo_fisica_activado = true;
        this.matter.systems.matterPhysics.world.createDebugGraphic();
      }

      this.input.on("pointermove", cursor => {
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
          cursor.x,
          cursor.y
        );
        this.pilas.cursor_x = Math.trunc(posicion.x);
        this.pilas.cursor_y = Math.trunc(posicion.y);

        if (this._escena_en_ejecucion) {
          try {
            this._escena_en_ejecucion.cuando_mueve(
              posicion.x,
              posicion.y,
              cursor
            );
          } catch (e) {
            console.error(e);
            this.pilas.mensajes.emitir_excepcion_al_editor(
              e,
              "emitir cuando_mueve"
            );
            this.pausar();
          }
        }
      });

      this.input.keyboard.on("keyup", evento => {
        if (evento.key === "Escape") {
          this.pilas.mensajes.emitir_mensaje_al_editor(
            "pulsa_la_tecla_escape",
            {}
          );
        }
      });

      /*
      this.input.keyboard.on("keydown", evento => {
        console.log("keydown", evento);
      });

      this.input.keyboard.on("keyup", evento => {
        console.log("keyup", evento);
      });
      */

      this.input.on("pointerdown", cursor => {
        let posicion = this.pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(
          cursor.x,
          cursor.y
        );

        if (this._escena_en_ejecucion) {
          try {
            this._escena_en_ejecucion.cuando_hace_click(
              posicion.x,
              posicion.y,
              cursor
            );
          } catch (e) {
            console.error(e);
            this.pilas.mensajes.emitir_excepcion_al_editor(
              e,
              "emitir cuando_hace_click"
            );
            this.pausar();
          }
        }
      });

      this.vincular_eventos_de_colision();
    } catch (e) {
      console.error(e);
      this.pilas.mensajes.emitir_excepcion_al_editor(e, "crear la escena");
      this.pausar();
    }
  }

  cambiar_escena(nombre: string) {
    if (this._escena_en_ejecucion) {
      this._escena_en_ejecucion.terminar();
    }

    this.instanciar_escena(nombre);
  }

  vincular_eventos_de_colision() {
    this.matter.world.on("collisionstart", (event /*, a, b*/) => {
      try {
        for (let i = 0; i < event.pairs.length; i++) {
          let colision = event.pairs[i];
          let figura_1 = colision.bodyA;
          let figura_2 = colision.bodyB;

          if (
            figura_1.gameObject &&
            figura_1.gameObject.actor &&
            figura_2.gameObject &&
            figura_2.gameObject.actor
          ) {
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

            if (
              figura_2.sensor_del_actor &&
              figura_1.gameObject &&
              figura_2.sensor_del_actor !== figura_1.gameObject.actor
            ) {
              figura_2.colisiones.push(figura_1.gameObject.actor);
            }

            if (
              figura_1.sensor_del_actor &&
              figura_2.gameObject &&
              figura_1.sensor_del_actor !== figura_2.gameObject.actor
            ) {
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

        if (
          figura_1.gameObject &&
          figura_1.gameObject.actor &&
          figura_2.gameObject &&
          figura_2.gameObject.actor
        ) {
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

          if (
            figura_1.gameObject &&
            figura_1.gameObject.actor &&
            figura_2.gameObject &&
            figura_2.gameObject.actor
          ) {
            let actor_a = figura_1.gameObject.actor;
            let actor_b = figura_2.gameObject.actor;

            actor_a.colisiones.splice(actor_a.colisiones.indexOf(actor_b), 1);
            actor_b.colisiones.splice(actor_b.colisiones.indexOf(actor_a), 1);

            actor_a.cuando_termina_una_colision(actor_b);
            actor_b.cuando_termina_una_colision(actor_a);
          } else {
            // colisión entre sensor de actor y actor

            if (
              figura_2.sensor_del_actor &&
              figura_1.gameObject &&
              figura_2.colisiones.indexOf(figura_1.gameObject.actor) > -1
            ) {
              figura_2.colisiones.splice(
                figura_2.colisiones.indexOf(figura_1.gameObject.actor),
                1
              );
            }

            if (
              figura_1.sensor_del_actor &&
              figura_2.gameObject &&
              figura_1.colisiones.indexOf(figura_2.gameObject.actor) > -1
            ) {
              figura_1.colisiones.splice(
                figura_1.colisiones.indexOf(figura_2.gameObject.actor),
                1
              );
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
    let escenas_encontradas = this.proyecto.escenas.filter(
      e => e.nombre == nombre
    );

    if (escenas_encontradas.length === 0) {
      throw Error(`No se puede encontrar la escena '${nombre}'.`);
    } else {
      if (escenas_encontradas.length > 1) {
        throw Error(`Hay más de una escena llamada '${nombre}'.`);
      }
    }

    return escenas_encontradas[0];
  }

  instanciar_escena(nombre) {
    let escena = this.obtener_escena_por_nombre(nombre);
    this.crear_fondo(escena.fondo);

    this.crear_escena(escena);
  }

  crear_escena(datos_de_la_escena) {
    let escena = new this.clases[datos_de_la_escena.nombre](this.pilas);

    escena.camara.x = datos_de_la_escena.camara_x;
    escena.camara.y = datos_de_la_escena.camara_y;
    escena.fondo = datos_de_la_escena.fondo;
    escena.iniciar();

    this.actores = datos_de_la_escena.actores.map(e => {
      return this.crear_actor(e);
    });

    this._escena_en_ejecucion = escena;
  }

  crear_actor(entidad) {
    let x = entidad.x;
    let y = entidad.y;
    let imagen = entidad.imagen;
    let actor = null;

    let clase = this.clases[entidad.nombre];

    if (clase) {
      actor = new this.clases[entidad.nombre](this.pilas);

      let p = this.pilas.utilidades.combinar_propiedades(
        actor.propiedades_base,
        actor.propiedades
      );
      p = this.pilas.utilidades.combinar_propiedades(p, entidad);

      actor.pre_iniciar(p);
      actor.iniciar();
    } else {
      let nombres_de_clases = Object.getOwnPropertyNames(this.clases);
      throw new Error(
        `No existe código para crear un actor de la clase ${
          entidad.tipo
        }. Las clases disponibles son [${nombres_de_clases.join(", ")}]`
      );
    }

    return actor;
  }

  obtener_referencias_a_clases() {
    let codigoDeExportacion = this.obtener_codigo_para_exportar_clases(
      this.codigo
    );
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
      lista_de_clases = codigo
        .match(re_creacion_de_clase)
        .map(e => e.match(re_solo_clase)[1]);
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

    if (this.pilas.depurador.mostrar_fisica) {
      if (!this.modo_fisica_activado) {
        this.modo_fisica_activado = true;
        this.matter.systems.matterPhysics.world.createDebugGraphic();
      }
    } else {
      this.pilas.modo.matter.systems.matterPhysics.world.debugGraphic.destroy();
    }

    try {
      if (this.permitir_modo_pausa) {
        this.guardar_foto_de_entidades();
      }

      this.pilas.escena.actualizar();
      this.pilas.escena.actualizar_actores();
    } catch (e) {
      console.error(e);
      this.pilas.mensajes.emitir_mensaje_al_editor("error_de_ejecucion", {
        mensaje: e.message,
        stack: e.stack.toString()
      });
      this.pausar();
    }
  }

  pausar() {
    console.warn("Pausando la escena a causa del error anterior.");
    this.scene.pause(undefined); // tslint:disable-line
  }

  guardar_foto_de_entidades() {
    this.pilas.historia.serializar_escena(this.pilas.escena);
  }

  dibujar_punto_de_control(graphics, _x, _y) {
    graphics.fillStyle(0xffffff, 1);
    let { x, y } = this.pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(
      _x,
      _y
    );
    graphics.fillRect(x - 3, y - 3, 6, 6);
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(x - 2, y - 2, 4, 4);
  }
}
