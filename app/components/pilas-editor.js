import EmberObject from "@ember/object";
import { alias } from "@ember/object/computed";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import estados from "../estados/estados-de-pilas-editor";
import aplicar_nombre from "../utils/aplicar-nombre";
import obtener_nombre_sin_repetir from "../utils/obtener-nombre-sin-repetir";
import obtener_plantilla_de_escena from "../utils/obtener-plantilla-de-escena";
import { observer } from "@ember/object";

export default Component.extend({
  bus: service(),
  log: service(),
  compilador: service(),
  recursos: service(),
  codigo: "",
  tagName: "",
  actorSeleccionado: -1, //deprecated
  seleccion: -1,
  cargando: true,
  existe_un_error_reciente: false,
  instancia_seleccionada: null,
  tipo_de_la_instancia_seleccionada: null,

  historiaPosicion: 10,
  historiaMinimo: 0,
  historiaMaximo: 10,
  cantidadDeEscenas: alias("proyecto.escenas.length"),

  lista_de_eventos: null,

  hay_cambios_por_guardar: false,

  actualizar_titulo: observer("hay_cambios_por_guardar", function() {
    let titulo = "PilasEngine";

    if (this.hay_cambios_por_guardar) {
      titulo += " *";
    }

    window.document.title = titulo;
  }),

  didInsertElement() {
    this.set("lista_de_eventos", [
      "finaliza_carga",
      "error",
      "termina_de_mover_un_actor",
      "comienza_a_mover_un_actor",
      "inicia_modo_depuracion_en_pausa",
      "cuando_cambia_posicion_dentro_del_modo_pausa",
      "pulsa_la_tecla_escape"
    ]);
    this.set("estado", new estados.ModoCargando());
    this.conectar_eventos();

    if (this.seleccion != -1) {
      if (!this.existe_actor_o_escena_con_id(this.seleccion)) {
        this.set("seleccion", 1);
      }

      this.send("cuandoSelecciona", this.seleccion);
    }

    document.addEventListener("keydown", this.alPulsarTecla.bind(this));

    this.bus.trigger("hacer_foco_en_pilas", {});
  },

  debe_expandir_el_panel_de_previsualizacion: computed(
    "expandirJuego",
    "mostrarEditor",
    "mostrarPropiedades",
    function() {
      if (this.mostrarEditor) {
        return this.expandirJuego;
      } else {
        return true;
      }
    }
  ),

  puede_intentar_expandir_el_panel_de_previsualizacion: computed(
    "mostrarEditor",
    "mostrarPropiedades",
    function() {
      return this.mostrarEditor;
    }
  ),

  existe_actor_o_escena_con_id(id) {
    let escena = this.obtenerDetalleDeEscenaPorIndice(id);
    let actor = this.obtenerDetalleDeActorPorIndice(id);

    return actor || escena;
  },

  alPulsarTecla(/*evento*/) {},

  willDestroyElement() {
    this.desconectar_eventos();
    document.removeEventListener("keydown", this.alPulsarTecla);
  },

  conectar_eventos() {
    this.lista_de_eventos.map(evento => {
      this.bus.on(evento, this, evento);
    });
  },

  desconectar_eventos() {
    this.lista_de_eventos.map(evento => {
      this.bus.off(evento, this, evento);
    });
  },

  finaliza_carga() {
    this.set("cargando", false);
    //this.mostrar_la_escena_actual_sobre_pilas();
    this.mostrar_la_escena_inicial();
    this.set("estado", this.estado.cuandoTerminoDeCargarPilas());
  },

  mostrar_la_escena_inicial() {
    if (!this.proyecto) {
      throw Error("No se envió el parámetro proyecto a este componente.");
    }

    if (!this.get("proyecto.escenas")) {
      throw Error("El proyecto enviado no tiene escenas.");
    }

    if (!this.get("proyecto.escena_inicial")) {
      throw Error("El proyecto enviado no tiene una escena inicial.");
    }

    this.set("ultimaEscenaSeleccionada", this.get("proyecto.escena_inicial"));
    this.mostrar_la_escena_actual_sobre_pilas();
  },

  pulsa_la_tecla_escape() {
    if (this.get("estado.puedeDetener")) {
      this.send("detener");
    }
  },

  termina_de_mover_un_actor(datos) {
    this.set("hay_cambios_por_guardar", true);

    let escena = this.obtener_la_escena_actual();
    let actor = escena.actores.findBy("id", datos.id);

    actor.set("x", datos.x);
    actor.set("y", datos.y);
    /*

    this.get("log").grupo(
      "Cambió la posición del actor desde el editor:",
      `
      let actor = pilas.obtener_actor(${datos.id});
      actor.x = ${Math.round(datos.x)};
      actor.y = ${Math.round(datos.y)};
    `
    );
    */
  },

  comienza_a_mover_un_actor(datos) {
    this.send("cuandoSelecciona", datos.id);
  },

  inicia_modo_depuracion_en_pausa(datos) {
    this.set("posicion", datos.posicion);
    this.set("historiaPosicion", datos.posicion);
    this.set("historiaMinimo", datos.minimo);
    this.set("historiaMaximo", datos.maximo);
  },

  cuando_cambia_posicion_dentro_del_modo_pausa(datos) {
    this.set("historiaPosicion", datos.posicion);
    this.set("posicion", datos.posicion);
  },

  mostrar_la_escena_actual_sobre_pilas() {
    let escena = this.obtener_la_escena_actual();

    if (!escena) {
      this.set("ultimaEscenaSeleccionada", 1);
      escena = this.obtener_la_escena_actual();
    }

    let escenaComoJSON = JSON.parse(JSON.stringify(escena));
    this.bus.trigger("cargar_escena", {
      escena: escenaComoJSON,
      proyecto: this.proyecto
    });
  },

  obtener_la_escena_actual() {
    let indice = this.ultimaEscenaSeleccionada;

    if (!indice) {
      throw Error("No se puede acceder a la última escena seleccionada");
    }

    if (!this.proyecto) {
      throw Error("No se envió el parámetro proyecto a este componente.");
    }

    if (!this.get("proyecto.escenas")) {
      throw Error("El proyecto enviado no tiene escenas.");
    }

    return this.get("proyecto.escenas").findBy("id", indice);
  },

  eliminar_escena_actual() {
    this.set("hay_cambios_por_guardar", true);

    let escenaActual = this.obtener_la_escena_actual();
    let escenasSinLaEscenaActual = this.get("proyecto.escenas").without(
      escenaActual
    );
    this.set("proyecto.escenas", escenasSinLaEscenaActual);

    if (this.el_proyecto_no_tiene_escena()) {
      this.send("agregarEscena", this.proyecto);
    } else {
      this.seleccionar_primer_escena_del_proyecto();
    }
  },

  el_proyecto_no_tiene_escena() {
    return this.cantidadDeEscenas === 0;
  },

  eliminar_actor(id) {
    this.set("hay_cambios_por_guardar", true);

    let escenaActual = this.obtener_la_escena_actual();
    let actor = escenaActual.actores.findBy("id", id);
    this.bus.trigger("eliminar_actor_desde_el_editor", { id: actor.id });
    escenaActual.actores.removeObject(actor);

    if (this.tiene_actores(escenaActual)) {
      this.seleccionar_primer_actor_de_la_escena(escenaActual);
    } else {
      this.set("seleccion", -1);
    }
  },

  tiene_actores(escena) {
    return escena.actores.length > 0;
  },

  seleccionar_primer_actor_de_la_escena(escena) {
    let actor = escena.actores[0];
    this.send("cuandoSelecciona", actor.id);
  },

  seleccionar_primer_escena_del_proyecto() {
    let primer_escena = this.get("proyecto.escenas")[0];
    this.send("cuandoSelecciona", primer_escena.get("id"));
  },

  registrar_codigo_de_actor(nombre, codigo) {
    let proyecto = this.proyecto;
    let codigo_modificado = aplicar_nombre(nombre, codigo);

    proyecto.codigos.actores.pushObject(
      EmberObject.create({
        nombre: nombre,
        codigo: codigo_modificado
      })
    );
  },

  registrar_codigo_de_escena(nombre, codigo) {
    let proyecto = this.proyecto;

    proyecto.codigos.escenas.pushObject(
      EmberObject.create({
        nombre: nombre,
        codigo: aplicar_nombre(nombre, codigo)
      })
    );
  },

  generar_id() {
    return Math.floor(Math.random() * 999) + 1000;
  },

  obtener_actor_por_nombre(nombre) {
    return this.get("proyecto.codigos.actores").findBy("nombre", nombre);
  },

  obtenerDetalleDeActorPorIndice(indice) {
    let escena = this.obtener_la_escena_actual();

    if (escena) {
      let actor = escena.get("actores").findBy("id", indice);
      return actor;
    }

    return null;
  },

  obtenerDetalleDeEscenaPorIndice(indice) {
    return this.get("proyecto.escenas").findBy("id", indice);
  },

  guardar_codigo_en_el_proyecto(seleccion, codigo) {
    let actor = this.obtenerDetalleDeActorPorIndice(seleccion);

    if (actor) {
      this.definir_codigo_para_el_actor(actor, codigo);
    } else {
      let escena = this.obtenerDetalleDeEscenaPorIndice(seleccion);
      this.definir_codigo_para_la_escena(escena, codigo);
    }
  },

  obtener_todos_los_nombres_de_actores() {
    let escenas = this.get("proyecto.escenas");
    let actores = escenas.map(e => e.actores);
    return actores.reduce(e => e.concat()).map(e => e.get("nombre"));
  },

  obtener_nombres_de_escenas(proyecto) {
    return proyecto.escenas.map(e => e.nombre);
  },

  obtener_codigo_para_la_escena({ nombre }) {
    return this.get("proyecto.codigos.escenas").findBy("nombre", nombre).codigo;
  },

  obtener_codigo_para_el_actor({ nombre }) {
    return this.obtener_actor_por_nombre(nombre).get("codigo");
  },

  definir_codigo_para_la_escena({ nombre }, codigo) {
    this.get("proyecto.codigos.escenas")
      .findBy("nombre", nombre)
      .set("codigo", codigo);
  },

  error(/* data */) {
    this.set("existe_un_error_reciente", true);
  },

  definir_codigo_para_el_actor({ nombre }, codigo) {
    this.obtener_actor_por_nombre(nombre).set("codigo", codigo);
  },

  reiniciar_escena_actual() {
    this.send("cuandoSelecciona", this.escenaActual);
  },

  actions: {
    agregarEscena(model) {
      this.set("hay_cambios_por_guardar", true);
      let nombres_de_escenas = this.obtener_nombres_de_escenas(model);
      let nombre = obtener_nombre_sin_repetir(nombres_de_escenas, "escena");
      let id = this.generar_id();

      model.escenas.pushObject(
        EmberObject.create({
          id: id,
          nombre: nombre,
          camara_x: 0,
          camara_y: 0,
          fondo: "plano",
          actores: []
        })
      );

      let plantilla = obtener_plantilla_de_escena();

      this.registrar_codigo_de_escena(nombre, plantilla);
      this.send("cuandoSelecciona", id);

      this.mostrar_la_escena_actual_sobre_pilas();
    },

    agregar_actor(proyecto, actor) {
      this.set("hay_cambios_por_guardar", true);
      let escena = this.obtener_la_escena_actual();
      let nombres = this.obtener_todos_los_nombres_de_actores();
      let id = this.generar_id();

      let nombre = obtener_nombre_sin_repetir(nombres, actor.nombre);

      actor.propiedades.id = id;
      actor.propiedades.imagen = actor.imagen || "sin_imagen";

      actor.propiedades.nombre = nombre;

      escena.actores.pushObject(EmberObject.create(actor.propiedades));

      this.registrar_codigo_de_actor(nombre, actor.codigo);

      this.set("mostrarModalCreacionDeActor", false);

      this.mostrar_la_escena_actual_sobre_pilas();
      this.send("cuandoSelecciona", id);
    },

    cuando_termino_de_cargar_monaco_editor() {},

    cuando_cambia_el_codigo(codigo) {
      this.set("hay_cambios_por_guardar", true);
      this.set("codigo", codigo);
      this.guardar_codigo_en_el_proyecto(this.seleccion, codigo);
    },

    ejecutar() {
      this.bus.trigger("quitar_pausa", {});
      this.set("existe_un_error_reciente", false);
      this.set("estado", this.estado.ejecutar());

      let escena = this.obtener_la_escena_actual();

      let resultado = this.compilador.compilar_proyecto(this.proyecto);

      let datos = {
        nombre_de_la_escena_inicial: escena.nombre,
        codigo: resultado.codigo,
        permitir_modo_pausa: this.permitir_modo_pausa,
        proyecto: resultado.proyecto_serializado
      };

      this.bus.trigger("ejecutar_proyecto", datos);
      this.bus.trigger("hacer_foco_en_pilas", {});

      this.log.limpiar();
      this.log.info("Ingresando en modo ejecución");
      this.log.info("Puedes usar las variables pilas o actores.");
    },
    detener() {
      this.set("existe_un_error_reciente", false);
      this.mostrar_la_escena_actual_sobre_pilas();
      this.set("estado", this.estado.detener());
      this.bus.trigger("hacerFocoEnElEditor", {});
      this.log.limpiar();
      this.log.info("Ingresando al modo edición");
    },
    pausar() {
      this.set("existe_un_error_reciente", false);
      this.set("estado", this.estado.pausar());
      this.bus.trigger("pausar_escena", {});
      this.bus.trigger("hacer_foco_en_pilas", {});
      this.log.limpiar();
      this.log.info("Ingresando en modo pausa");
    },
    cambiarPosicion(valorNuevo) {
      this.set("hay_cambios_por_guardar", true);
      this.set("posicion", valorNuevo);
      this.bus.trigger("cambiar_posicion_desde_el_editor", {
        posicion: valorNuevo
      });
    },
    cuandoGuardaDesdeElEditor(/*editor*/) {
      this.send("alternarEstadoDeEjecucion");
    },
    alternarEstadoDeEjecucion() {
      let estado = this.estado;

      if (estado.puedeEjecutar) {
        this.send("ejecutar");
      } else {
        if (estado.puedeDetener) {
          this.send("detener");
        }
      }
    },
    cuandoSelecciona(seleccion) {
      if (seleccion === "proyecto") {
        this.set("seleccion", 0);
        this.set("instancia_seleccionada", this.proyecto);
        this.set("tipo_de_la_instancia_seleccionada", "proyecto");
        return;
      }

      this.set("seleccion", seleccion);

      let actor = this.obtenerDetalleDeActorPorIndice(seleccion);
      let escena = this.obtenerDetalleDeEscenaPorIndice(seleccion);

      if (actor) {
        this.set("instancia_seleccionada", actor);
        this.set("tipo_de_la_instancia_seleccionada", "actor");
        this.set("codigo", this.obtener_codigo_para_el_actor(actor));
        this.set("tituloDelCodigo", `Código del actor: ${seleccion}`);

        this.bus.trigger("selecciona_actor_desde_el_editor", {
          id: seleccion
        });
      }

      if (escena) {
        this.set("instancia_seleccionada", escena);
        this.set("tipo_de_la_instancia_seleccionada", "escena");
        this.set("ultimaEscenaSeleccionada", seleccion);
        this.mostrar_la_escena_actual_sobre_pilas();

        this.set("codigo", this.obtener_codigo_para_la_escena(escena));
        this.set("tituloDelCodigo", `Código de la escena: ${seleccion}`);
      }
    },
    cuandoModificaObjeto(objeto) {
      this.set("hay_cambios_por_guardar", true);
      this.bus.trigger("actualizar_actor_desde_el_editor", {
        id: objeto.id,
        actor: objeto
      });
    },
    cuando_modifica_escena(escena) {
      this.set("hay_cambios_por_guardar", true);
      this.bus.trigger("actualizar_escena_desde_el_editor", {
        id: escena.id,
        escena: escena
      });
    },
    cuando_modifica_proyecto(proyecto) {
      this.set("hay_cambios_por_guardar", true);
      this.bus.trigger("actualizar_proyecto_desde_el_editor", {
        proyecto: proyecto
      });

      this.mostrar_la_escena_actual_sobre_pilas();
      //this.reiniciar_escena_actual();
    },
    cuando_intenta_duplicar(id, aleatorio) {
      aleatorio = aleatorio || false;

      this.set("hay_cambios_por_guardar", true);
      let actor_original = this.obtenerDetalleDeActorPorIndice(id);
      let codigo = this.obtener_codigo_para_el_actor(actor_original);

      let actor = {
        nombre: actor_original.get("nombre"),
        codigo: codigo,
        imagen: actor_original.get("imagen"),
        propiedades: JSON.parse(JSON.stringify(actor_original))
      };

      if (aleatorio) {
        actor.propiedades.x = parseInt(Math.random() * 400) - 200;
        actor.propiedades.y = parseInt(Math.random() * 400) - 200;
      } else {
        actor.propiedades.x += 20;
        actor.propiedades.y -= 20;
      }

      this.send("agregar_actor", this.proyecto, actor);
    },

    cuando_intenta_duplicar_x5(id) {
      for (let i = 0; i < 5; i++) {
        this.send("cuando_intenta_duplicar", id, true);
      }
    },

    cuando_intenta_eliminar(id) {
      this.set("hay_cambios_por_guardar", true);

      let actor = this.obtenerDetalleDeActorPorIndice(id);

      if (actor) {
        this.eliminar_actor(id);
      } else {
        this.eliminar_escena_actual();
      }
    },

    cuando_guarda(proyecto) {
      this.set("hay_cambios_por_guardar", false);
      this.cuandoIntentaGuardar(proyecto);
    },

    cuando_abre() {
      this.cuandoIntentaAbrir();
    },

    plegar_codigo() {
      this.bus.trigger("plegar_codigo");
    },

    expandir_codigo() {
      this.bus.trigger("expandir_codigo");
    }
  }
});
