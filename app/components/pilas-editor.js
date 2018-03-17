import Component from "@ember/component";
import Ember from "ember";
import estados from "../estados/estados-de-pilas-editor";
import aplicar_nombre from "../utils/aplicar-nombre";
import obtener_nombre_sin_repetir from "../utils/obtener-nombre-sin-repetir";
import obtener_plantilla_de_escena from "../utils/obtener-plantilla-de-escena";

export default Component.extend({
  bus: Ember.inject.service(),
  log: Ember.inject.service(),
  compilador: Ember.inject.service(),
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
  cantidadDeEscenas: Ember.computed.alias("proyecto.escenas.length"),

  lista_de_eventos: ["finaliza_carga", "error", "termina_de_mover_un_actor", "comienza_a_mover_un_actor", "inicia_modo_depuracion_en_pausa", "cuando_cambia_posicion_dentro_del_modo_pausa"],

  didInsertElement() {
    this.set("estado", new estados.ModoCargando());
    this.conectar_eventos();

    if (this.get("seleccion") != -1) {
      if (!this.existe_actor_o_escena_con_id(this.get("seleccion"))) {
        this.set("seleccion", 1);
      }

      this.send("cuandoSelecciona", this.get("seleccion"));
    }

    document.addEventListener("keydown", this.alPulsarTecla.bind(this));

    this.get("bus").trigger("hacer_foco_en_pilas", {});
  },

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
    this.get("lista_de_eventos").map(evento => {
      this.get("bus").on(evento, this, evento);
    });
  },

  desconectar_eventos() {
    this.get("lista_de_eventos").map(evento => {
      this.get("bus").off(evento, this, evento);
    });
  },

  finaliza_carga() {
    this.set("cargando", false);
    this.mostrar_la_escena_actual_sobre_pilas();
    this.set("estado", this.get("estado").cuandoTerminoDeCargarPilas());
  },

  termina_de_mover_un_actor(datos) {
    let escena = this.obtener_la_escena_actual();
    let actor = escena.actores.findBy("id", datos.id);

    actor.set("x", datos.x);
    actor.set("y", datos.y);

    this.get("log").grupo(
      "Cambió la posición del actor desde el editor:",
      `
      let actor = pilas.obtener_actor(${datos.id});
      actor.x = ${Math.round(datos.x)};
      actor.y = ${Math.round(datos.y)};
    `
    );
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
    this.get("bus").trigger("cargar_escena", { escena: escenaComoJSON });
  },

  obtener_la_escena_actual() {
    let indice = this.get("ultimaEscenaSeleccionada");
    return this.get("proyecto.escenas").findBy("id", indice);
  },

  eliminar_escena_actual() {
    let escenaActual = this.obtener_la_escena_actual();
    let escenasSinLaEscenaActual = this.get("proyecto.escenas").without(escenaActual);
    this.set("proyecto.escenas", escenasSinLaEscenaActual);

    if (this.el_proyecto_no_tiene_escena()) {
      this.send("agregarEscena", this.get("proyecto"));
    } else {
      this.seleccionar_primer_escena_del_proyecto();
    }
  },

  el_proyecto_no_tiene_escena() {
    return this.get('cantidadDeEscenas') === 0;
  },

  eliminar_actor(id) {
    let escenaActual = this.obtener_la_escena_actual();
    let actor = escenaActual.actores.findBy("id", id);
    this.get("bus").trigger("eliminar_actor_desde_el_editor", { id: actor.id });
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

  registrar_codigo_de_actor(tipo, codigo) {
    let proyecto = this.get("proyecto");

    proyecto.codigos.actores.pushObject(
      Ember.Object.create({
        tipo: tipo,
        codigo: aplicar_nombre(tipo, codigo)
      })
    );
  },

  registrar_codigo_de_escena(nombre, codigo) {
    let proyecto = this.get("proyecto");

    proyecto.codigos.escenas.pushObject(
      Ember.Object.create({
        nombre: nombre,
        codigo: aplicar_nombre(nombre, codigo)
      })
    );
  },

  generar_id() {
    return Math.floor(Math.random() * 999) + 1000;
  },

  obtenerTipoDeActor(tipoDelActor) {
    return this.get("proyecto.codigos.actores").findBy("tipo", tipoDelActor);
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
    return actores.reduce(e => e.concat()).map(e => e.get("tipo"));
  },

  obtener_nombres_de_escenas(proyecto) {
    return proyecto.escenas.map(e => e.nombre);
  },

  obtener_codigo_para_la_escena({ nombre }) {
    return this.get("proyecto.codigos.escenas").findBy("nombre", nombre).codigo;
  },

  obtener_codigo_para_el_actor({ tipo }) {
    return this.obtenerTipoDeActor(tipo).get("codigo");
  },

  definir_codigo_para_la_escena({ nombre }, codigo) {
    this.get("proyecto.codigos.escenas")
      .findBy("nombre", nombre)
      .set("codigo", codigo);
  },

  error(/* data */) {
    this.set("existe_un_error_reciente", true);
  },

  definir_codigo_para_el_actor({ tipo }, codigo) {
    this.obtenerTipoDeActor(tipo).set("codigo", codigo);
  },

  actions: {
    agregarEscena(model) {
      let nombres_de_escenas = this.obtener_nombres_de_escenas(model);
      let nombre = obtener_nombre_sin_repetir(nombres_de_escenas, "Escena");
      let id = this.generar_id();

      model.escenas.pushObject(
        Ember.Object.create({
          id: id,
          nombre: nombre,
          camara_x: 0,
          camara_y: 0,
          actores: []
        })
      );

      let plantilla = obtener_plantilla_de_escena();

      this.registrar_codigo_de_escena(nombre, plantilla);
      this.send("cuandoSelecciona", id);

      this.mostrar_la_escena_actual_sobre_pilas();
    },

    agregar_actor(proyecto, actor) {
      let escena = this.obtener_la_escena_actual();
      let nombres = this.obtener_todos_los_nombres_de_actores();
      let id = this.generar_id();
      let nombre = obtener_nombre_sin_repetir(nombres, actor.tipo);

      actor.propiedades.id = id;
      actor.propiedades.imagen = actor.imagen;
      actor.propiedades.tipo = actor.tipo;

      escena.actores.pushObject(
        Ember.Object.create(actor.propiedades)
      );

      this.registrar_codigo_de_actor(nombre, actor.codigo);

      this.send("cuandoSelecciona", id);
      this.set("mostrarModalCreacionDeActor", false);

      this.mostrar_la_escena_actual_sobre_pilas();
    },

    cuando_termino_de_cargar_monaco_editor() {},

    cuando_cambia_el_codigo(codigo) {
      this.set("codigo", codigo);
      this.guardar_codigo_en_el_proyecto(this.get("seleccion"), codigo);
    },

    ejecutar() {
      this.get("bus").trigger("quitar_pausa", {});
      this.set("existe_un_error_reciente", false);
      this.set("estado", this.get("estado").ejecutar());

      let escena = this.obtener_la_escena_actual();

      let resultado = this.get("compilador").compilar_proyecto(this.get("proyecto"));

      let datos = {
        nombre_de_la_escena_inicial: escena.nombre,
        codigo: resultado.codigo,
        permitir_modo_pausa: this.get("permitir_modo_pausa"),
        proyecto: resultado.proyecto_serializado
      };

      this.get("bus").trigger("ejecutar_proyecto", datos);
      this.get("bus").trigger("hacer_foco_en_pilas", {});

      this.get("log").limpiar();
      this.get("log").info("Ingresando en modo ejecución");
    },
    detener() {
      this.get("bus").trigger("quitar_pausa_de_phaser", {});
      this.set("existe_un_error_reciente", false);
      this.mostrar_la_escena_actual_sobre_pilas();
      this.set("estado", this.get("estado").detener());
      this.get("bus").trigger("hacerFocoEnElEditor", {});
      this.get("log").limpiar();
      this.get("log").info("Ingreando al modo edición");
    },
    pausar() {
      this.get("bus").trigger("quitar_pausa_de_phaser", {});
      this.set("existe_un_error_reciente", false);
      this.set("estado", this.get("estado").pausar());
      this.get("bus").trigger("pausar_escena", {});
      this.get("bus").trigger("hacer_foco_en_pilas", {});
      this.get("log").limpiar();
      this.get("log").info("Ingresando en modo pausa");
    },
    cambiarPosicion(valorNuevo) {
      this.set("posicion", valorNuevo);
      this.get("bus").trigger("cambiar_posicion_desde_el_editor", {
        posicion: valorNuevo
      });
    },
    cuandoGuardaDesdeElEditor(/*editor*/) {
      this.send("alternarEstadoDeEjecucion");
    },
    alternarEstadoDeEjecucion() {
      let estado = this.get("estado");

      if (estado.puedeEjecutar) {
        this.send("ejecutar");
      } else {
        if (estado.puedeDetener) {
          this.send("detener");
        }
      }
    },
    cuandoSelecciona(seleccion) {
      this.set("seleccion", seleccion);

      let actor = this.obtenerDetalleDeActorPorIndice(seleccion);
      let escena = this.obtenerDetalleDeEscenaPorIndice(seleccion);

      if (actor) {
        this.set("instancia_seleccionada", actor);
        this.set("tipo_de_la_instancia_seleccionada", "actor");
        this.set("codigo", this.obtener_codigo_para_el_actor(actor));
        this.set("tituloDelCodigo", `Código del actor: ${seleccion}`);
      } else {
        this.set("instancia_seleccionada", escena);
        this.set("tipo_de_la_instancia_seleccionada", "escena");
        this.set("ultimaEscenaSeleccionada", seleccion);
        this.mostrar_la_escena_actual_sobre_pilas();

        this.set("codigo", this.obtener_codigo_para_la_escena(escena));
        this.set("tituloDelCodigo", `Código de la escena: ${seleccion}`);
      }

      this.get("bus").trigger("selecciona_actor_desde_el_editor", {
        id: seleccion
      });
    },
    cuandoModificaObjeto(objeto) {
      this.get("bus").trigger("actualizar_actor_desde_el_editor", {
        id: objeto.id,
        actor: objeto
      });
    },
    cuando_modifica_escena(escena) {
      this.get("bus").trigger("actualizar_escena_desde_el_editor", {
        id: escena.id,
        escena: escena
      });
    },
    cuando_intenta_eliminar(id) {
      let actor = this.obtenerDetalleDeActorPorIndice(id);

      if (actor) {
        this.eliminar_actor(id);
      } else {
        this.eliminar_escena_actual();
      }
    }
  }
});
