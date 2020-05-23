import EmberObject from "@ember/object";
import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import estados from "../estados/estados-de-pilas-editor";
import aplicar_nombre from "../utils/aplicar-nombre";
import copiar from "../utils/copiar";
import obtener_nombre_sin_repetir from "../utils/obtener-nombre-sin-repetir";
import obtener_plantilla_de_escena from "../utils/obtener-plantilla-de-escena";
import preparar_codigo_para_el_editor from "../utils/preparar-codigo-para-el-editor";
import { observer } from "@ember/object";
import base64_encode from "../utils/base64-encode";
import { run } from "@ember/runloop";
import { debounce } from "@ember/runloop";
import { later } from "@ember/runloop";

export default Component.extend({
  bus: service(),
  log: service(),
  memento: service(),
  compilador: service(),
  recursos: service(),
  serviceProyecto: service("proyecto"),

  codigo: "",
  tagName: "",
  actorSeleccionado: -1, //en desuso
  seleccion: -1,
  cargando: true,
  existe_un_error_reciente: false,
  instancia_seleccionada: null,
  tipo_de_la_instancia_seleccionada: null,
  nombre_del_contexto: "prueba-editor",
  panelMaximizado: null,

  historiaPosicion: 10,
  historiaMinimo: 0,
  historiaMaximo: 10,
  cantidadDeEscenas: alias("proyecto.escenas.length"),

  lista_de_eventos: null,

  hay_cambios_por_guardar: false,
  tamaño_de_pantalla_del_proyecto: null,

  didInsertElement() {
    this.set("lista_de_eventos", [
      //
      "finaliza_carga",
      "error",
      "mientras_mueve_la_camara",
      "termina_de_mover_un_actor",
      "comienza_a_mover_un_actor",
      "inicia_modo_depuracion_en_pausa",
      "cuando_cambia_posicion_dentro_del_modo_pausa",
      "pulsa_la_tecla_escape",
      "duplicar_el_actor_seleccionado",
      "eliminar_el_actor_seleccionado",
      "crear_un_actor_desde_atajo"
    ]);

    this.set("estado", new estados.ModoCargando());
    this.conectar_eventos();

    this.memento.iniciar();

    if (this.seleccion != -1) {
      if (!this.existe_actor_o_escena_con_id(this.seleccion)) {
        this.set("seleccion", 1);
      }

      this.send("cuandoSelecciona", this.seleccion);
    }

    document.addEventListener("keydown", this.alPulsarTecla.bind(this));

    this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});
    this.instanciarSplitJS();
  },

  instanciarSplitJS() {
    if (this.mostrarEditor && !this.splitjs) {
      let splitjs = Split(["#panel-canvas", "#panel-editor"], {
        sizes: [50, 50],
        minSize: [150, 200],
        expandToMin: false
      });

      this.set("splitjs", splitjs);
    }
  },

  instanciarSplitJSSoloCuandoEsNecesario: observer("mostrarEditor", function() {
    if (this.mostrarEditor && !this.splitjs) {
      run.scheduleOnce("afterRender", () => {
        this.instanciarSplitJS();
      });
    } else {
      this.splitjs.destroy();
      this.set("splitjs", null);
    }
  }),

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
      this.bus.on(`${this.nombre_del_contexto}:${evento}`, this, evento);
    });
  },

  desconectar_eventos() {
    this.lista_de_eventos.map(evento => {
      this.bus.off(`${this.nombre_del_contexto}:${evento}`, this, evento);
    });
  },

  duplicar_el_actor_seleccionado() {
    debounce(
      this,
      () => {
        if (this.get("tipo_de_la_instancia_seleccionada") == "actor") {
          let actor = this.get("instancia_seleccionada");
          this.send("cuando_intenta_duplicar", actor.id, false);
        }
      },
      10
    );
  },

  eliminar_el_actor_seleccionado() {
    debounce(
      this,
      () => {
        if (this.get("tipo_de_la_instancia_seleccionada") == "actor") {
          let actor = this.get("instancia_seleccionada");
          this.send("cuando_intenta_eliminar", actor.id);
        }
      },
      10
    );
  },

  crear_un_actor_desde_atajo() {
    debounce(
      this,
      () => {
        this.bus.trigger(`abrir_dialogo_para_crear_actor`, {});
      },
      10
    );
  },

  finaliza_carga() {
    this.set("cargando", false);
    this.mostrar_la_escena_inicial();

    if (this.estado.ModoCargando) {
      this.set("estado", this.estado.cuandoTerminoDeCargarPilas());
    } else {
      console.warn("Se ha reiniciando el canvas, se omite cambiar el autómata de estados.");
    }
  },

  mostrar_la_escena_inicial() {
    if (!this.proyecto) {
      throw Error("No se envió el parámetro proyecto a este componente.");
    }

    if (!this.get("proyecto.escenas")) {
      throw Error("El proyecto enviado no tiene escenas.");
    }

    if (!this.get("proyecto.nombre_de_la_escena_inicial")) {
      throw Error("El proyecto enviado no tiene una escena inicial.");
    }

    let escena_inicial = this.obtener_la_escena_inicial();
    this.set("ultimaEscenaSeleccionada", escena_inicial.id);
    this.mostrar_la_escena_actual_sobre_pilas();
  },

  obtener_la_escena_inicial() {
    let escenas = this.proyecto.escenas;
    let escena_incial = this.proyecto.nombre_de_la_escena_inicial;
    let objeto_escena = escenas.find(e => e.nombre === escena_incial);

    if (!objeto_escena) {
      return escenas.get("firstObject");
    } else {
      return objeto_escena;
    }
  },

  pulsa_la_tecla_escape() {
    this.send("detener_y_volver_al_editor");
  },

  termina_de_mover_un_actor(datos) {
    this.serviceProyecto.cuando_realiza_un_cambio();

    let escena = this.obtener_la_escena_actual();
    let actor = escena.actores.findBy("id", datos.id);

    this.memento.accion("mueve_actor", {
      id: datos.id,
      x: actor.x,
      y: actor.y
    });

    actor.set("x", datos.x);
    actor.set("y", datos.y);
  },

  mientras_mueve_la_camara(datos) {
    let escena = this.obtener_la_escena_actual();
    escena.set("camara_x", datos.x);
    escena.set("camara_y", datos.y);
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
    this.bus.trigger(`${this.nombre_del_contexto}:cargar_escena`, {
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
    this.serviceProyecto.cuando_realiza_un_cambio();

    let escenaActual = this.obtener_la_escena_actual();
    let escenasSinLaEscenaActual = this.get("proyecto.escenas").without(escenaActual);
    this.set("proyecto.escenas", escenasSinLaEscenaActual);

    let codigo = this.proyecto.codigos.escenas.findBy("nombre", escenaActual.nombre);

    if (codigo) {
      this.proyecto.codigos.escenas.removeObject(codigo);
    }

    if (this.el_proyecto_no_tiene_escena()) {
      this.send("agregarEscena", this.proyecto);
    } else {
      this.seleccionar_primer_escena_del_proyecto();
    }
  },

  el_proyecto_no_tiene_escena() {
    return this.cantidadDeEscenas === 0;
  },

  eliminar_actor(id, omitir_deshacer) {
    this.serviceProyecto.cuando_realiza_un_cambio();

    let escenaActual = this.obtener_la_escena_actual();
    let actor = escenaActual.actores.findBy("id", id);
    let codigo = this.proyecto.codigos.actores.findBy("nombre", actor.nombre);

    if (!omitir_deshacer) {
      this.memento.accion("elimina_actor", {
        actor: {
          nombre: actor.nombre,
          codigo: copiar(codigo.codigo),
          imagen: actor.imagen,
          propiedades: copiar(actor)
        },
        id: id
      });
    }

    this.bus.trigger(`${this.nombre_del_contexto}:eliminar_actor_desde_el_editor`, { id: actor.id });
    escenaActual.actores.removeObject(actor);

    if (codigo) {
      this.proyecto.codigos.actores.removeObject(codigo);
    }

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
    let id = primer_escena.get("id");
    this.set("proyecto.escena_inicial", id);
    this.send("cuandoSelecciona", id);
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
    let id = Math.floor(Math.random() * 9999999999999999) + 10000000000000000;
    return id;
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
    if (seleccion === 0) {
      this.definir_codigo_para_el_proyecto(codigo);
    } else {
      let actor = this.obtenerDetalleDeActorPorIndice(seleccion);

      if (actor) {
        this.definir_codigo_para_el_actor(actor, codigo);
      } else {
        let escena = this.obtenerDetalleDeEscenaPorIndice(seleccion);
        this.definir_codigo_para_la_escena(escena, codigo);
      }
    }
  },

  obtener_todos_los_nombres_de_actores() {
    let escenas = this.get("proyecto.escenas");
    let actores = escenas.map(e => e.actores);
    return actores.reduce((a, b) => a.concat(b)).map(e => e.get("nombre"));
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

  definir_codigo_para_el_proyecto(codigo) {
    this.proyecto.codigos.proyecto = codigo;
  },

  error(data) {
    this.log.error(data.mensaje, "");
    this.set("existe_un_error_reciente", true);
  },

  definir_codigo_para_el_actor({ nombre }, codigo) {
    this.obtener_actor_por_nombre(nombre).set("codigo", codigo);
  },

  reiniciar_escena_actual() {
    this.send("cuandoSelecciona", this.escenaActual);
  },

  crear_escena_nueva(proyecto) {
    let model = proyecto;

    this.serviceProyecto.cuando_realiza_un_cambio();

    let nombres_de_escenas = this.obtener_nombres_de_escenas(model);
    let nombre = obtener_nombre_sin_repetir(nombres_de_escenas, "escena");
    let id = this.generar_id();
    let escena = EmberObject.create({
      id: id,
      nombre: nombre,
      ancho: 1000,
      alto: 1000,
      camara_x: 0,
      camara_y: 0,
      gravedad_x: 0,
      gravedad_y: 1,
      fondo: "decoracion:fondos/fondo-plano",
      actores: []
    });

    model.escenas.pushObject(escena);

    let plantilla = obtener_plantilla_de_escena();

    this.registrar_codigo_de_escena(nombre, plantilla);
    return escena;
  },

  obtener_escena_por_id(proyecto, id) {
    return proyecto.escenas.findBy("id", id);
  },

  actions: {
    agregarEscena(proyecto) {
      let escena = this.crear_escena_nueva(proyecto);
      this.send("cuandoSelecciona", escena.id);
      this.mostrar_la_escena_actual_sobre_pilas();
    },

    mover_actor_a_escena_nueva(proyecto, actor, escena_origen_id) {
      let escena_origen = this.obtener_escena_por_id(proyecto, escena_origen_id);
      let escena_nueva = this.crear_escena_nueva(proyecto);

      escena_origen.actores.removeObject(actor);
      escena_nueva.actores.pushObject(actor);
      this.send("cuandoSelecciona", escena_nueva.id);
    },

    mover_actor_a_una_escena(proyecto, actor, escena_origen_id, escena_seleccionada) {
      let escena_origen = this.obtener_escena_por_id(proyecto, escena_origen_id);
      escena_origen.actores.removeObject(actor);
      escena_seleccionada.actores.pushObject(actor);
      this.send("cuandoSelecciona", escena_seleccionada.id);
    },

    agregar_actor(proyecto, actor, omitir_deshacer) {
      this.serviceProyecto.cuando_realiza_un_cambio();

      let escena = this.obtener_la_escena_actual();
      let nombres = this.obtener_todos_los_nombres_de_actores();
      let id = this.generar_id();

      if (omitir_deshacer) {
        // caso especial, si está creando el actor desde una acción
        // como "deshacer" tiene que respetar el id original.
        id = actor.id;
      }

      let nombre = obtener_nombre_sin_repetir(nombres, actor.nombre);

      actor.propiedades.id = id;
      actor.propiedades.imagen = actor.imagen || "sin_imagen";

      if (!actor.propiedades.x && !actor.propiedades.y) {
        actor.propiedades.x = escena.get("camara_x");
        actor.propiedades.y = escena.get("camara_y");
      }

      actor.propiedades.activo = true;
      actor.propiedades.nombre = nombre;
      actor.propiedades.habilidades = [];

      if (!actor.propiedades.sensores) {
        actor.propiedades.sensores = [];
      }

      escena.actores.pushObject(EmberObject.create(actor.propiedades));

      this.registrar_codigo_de_actor(nombre, preparar_codigo_para_el_editor(actor.codigo));

      this.set("mostrarModalCreacionDeActor", false);

      this.mostrar_la_escena_actual_sobre_pilas();
      this.send("cuandoSelecciona", id);

      if (!omitir_deshacer) {
        this.memento.accion("agrega_actor", { id });
      }
    },

    cuando_termino_de_cargar_monaco_editor() {},

    cuando_cambia_el_codigo(codigo) {
      if (!this.cargando) {
        this.serviceProyecto.cuando_realiza_un_cambio();
      }

      this.set("codigo", codigo);
      this.guardar_codigo_en_el_proyecto(this.seleccion, codigo);
    },

    ejecutar() {
      this.bus.trigger(`${this.nombre_del_contexto}:quitar_pausa`, {});
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

      let hash = base64_encode(datos);

      let tamaño = `${this.proyecto.ancho}x${this.proyecto.alto}`;

      if (this.tamaño_de_pantalla_del_proyecto !== tamaño) {
        this.set("tamaño_de_pantalla_del_proyecto", tamaño);
        this.bus.trigger(`${this.nombre_del_contexto}:recargar_proyecto`, hash, true);
      } else {
        this.bus.trigger(`${this.nombre_del_contexto}:recargar_proyecto`, hash, false);
      }

      this.bus.trigger(`${this.nombre_del_contexto}:ejecutar_proyecto`, datos);
      this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});

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
      this.bus.trigger(`${this.nombre_del_contexto}:pausar_escena`, {});
      this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});
      this.log.limpiar();
      this.log.info("Ingresando en modo pausa");
    },

    deshacer() {
      this.memento.deshacer(this);
    },

    cambiarPosicion(valorNuevo) {
      this.serviceProyecto.cuando_realiza_un_cambio();
      this.set("posicion", valorNuevo);

      this.bus.trigger(`${this.nombre_del_contexto}:cambiar_posicion_desde_el_editor`, {
        posicion: valorNuevo
      });
    },

    cuandoGuardaDesdeElEditor(/*editor*/) {
      this.send("alternarEstadoDeEjecucion");

      if (this.get("panelMaximizado")) {
        this.set("maximizarEditor", false);
        this.set("ocultar_interfaz", true);

        later(
          this,
          () => {
            this.set("ocultar_interfaz", false);
            this.set("maximizarCanvas", true);
            this.set("panelMaximizado", "canvas-desde-el-editor");
          },
          1
        );
      }
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

        this.set("codigo", this.proyecto.codigos.proyecto);
        this.set("tituloDelCodigo", `Codigo del proyecto`);

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

        this.bus.trigger(`${this.nombre_del_contexto}:selecciona_actor_desde_el_editor`, {
          id: seleccion
        });
      }

      if (escena) {
        this.memento.limpiar();
        this.set("instancia_seleccionada", escena);
        this.set("tipo_de_la_instancia_seleccionada", "escena");
        this.set("ultimaEscenaSeleccionada", seleccion);
        this.mostrar_la_escena_actual_sobre_pilas();

        this.set("codigo", this.obtener_codigo_para_la_escena(escena));
        this.set("tituloDelCodigo", `Código de la escena: ${seleccion}`);
      }
    },

    cuandoModificaObjeto(objeto) {
      this.serviceProyecto.cuando_realiza_un_cambio();
      this.bus.trigger(`${this.nombre_del_contexto}:actualizar_actor_desde_el_editor`, {
        id: objeto.id,
        actor: objeto
      });
    },

    cuando_modifica_escena(escena, recargar) {
      this.serviceProyecto.cuando_realiza_un_cambio();
      this.bus.trigger(`${this.nombre_del_contexto}:actualizar_escena_desde_el_editor`, {
        id: escena.id,
        escena: escena
      });

      if (recargar) {
        this.mostrar_la_escena_actual_sobre_pilas();
      }
    },

    cuando_modifica_proyecto() {
      this.serviceProyecto.cuando_realiza_un_cambio();
      this.bus.trigger("recargarCanvasDePilas");
    },

    cuando_intenta_duplicar(id, aleatorio) {
      aleatorio = aleatorio || false;

      this.serviceProyecto.cuando_realiza_un_cambio();
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
        let tamaño_de_grilla = this.get("grilla");

        if (tamaño_de_grilla > 0) {
          actor.propiedades.x += tamaño_de_grilla;
        } else {
          actor.propiedades.x += 20;
          actor.propiedades.y -= 20;
        }
      }

      this.send("agregar_actor", this.proyecto, actor);
    },

    cuando_intenta_duplicar_x5(id) {
      for (let i = 0; i < 5; i++) {
        this.send("cuando_intenta_duplicar", id, true);
      }
    },

    cuando_intenta_eliminar(id) {
      this.serviceProyecto.cuando_realiza_un_cambio();

      let actor = this.obtenerDetalleDeActorPorIndice(id);

      if (actor) {
        this.eliminar_actor(id);
      } else {
        this.eliminar_escena_actual();
      }
    },

    cuando_guarda(proyecto) {
      this.serviceProyecto.cuando_guarda();
      this.cuandoIntentaGuardar(proyecto);
    },

    cuando_abre() {
      this.cuandoIntentaAbrir();
    },

    cuando_crea_un_proyecto() {
      this.cuandoIntentaCrearUnProyecto();
    },

    cuando_cambia_un_nombre_de_actor(/*nombre*/) {
      // Intenta recargar el editor, para eso vuelve a seleccionar el actor
      // actual y asigna un tituloDelCodigo aleatorio para que se cargue de nuevo.
      let actor = this.obtenerDetalleDeActorPorIndice(this.seleccion);

      this.set("instancia_seleccionada", actor);
      this.set("tipo_de_la_instancia_seleccionada", "actor");
      this.set("codigo", this.obtener_codigo_para_el_actor(actor));

      let r = Math.random();
      this.set("tituloDelCodigo", `Código del actor: ${this.seleccion} ${r}`);
    },

    cuando_cambia_un_nombre_de_escena(/*nombre*/) {
      // Intenta recargar el editor, para eso vuelve a seleccionar la escena
      // actual y asigna un tituloDelCodigo aleatorio para que se cargue de nuevo.
      let escena = this.obtenerDetalleDeEscenaPorIndice(this.seleccion);

      this.set("instancia_seleccionada", escena);
      this.set("tipo_de_la_instancia_seleccionada", "escena");
      this.set("codigo", this.obtener_codigo_para_la_escena(escena));

      let r = Math.random();
      this.set("tituloDelCodigo", `Código de la escena: ${this.seleccion} ${r}`);
    },

    alternar(propiedad) {
      this.toggleProperty(propiedad);
    },

    detener_y_volver_al_editor() {
      if (this.get("estado.puedeDetener")) {
        this.send("detener");
      }

      if (this.get("panelMaximizado") == "canvas-desde-el-editor") {
        this.set("panelMaximizado", "editor");
        this.set("maximizarCanvas", false);
        this.set("maximizarEditor", true);
      }
    }
  }
});
