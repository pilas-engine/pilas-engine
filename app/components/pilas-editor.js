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
import fixture_workspace_bloques_de_escena_nueva from "../fixtures/workspace-bloques-de-escena-nueva";
import { observer } from "@ember/object";
import base64_encode from "../utils/base64-encode";
import { run } from "@ember/runloop";
import { debounce } from "@ember/runloop";
import { later } from "@ember/runloop";

export default Component.extend({
  bus: service(),
  log: service(),
  intl: service(),
  memento: service(),
  compilador: service(),
  recursos: service(),
  serviceProyecto: service("proyecto"),

  codigo: "",
  bloques: "",
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
      "duplicar_el_actor_seleccionado_con_click",
      "eliminar_el_actor_seleccionado",
      "crear_un_actor_desde_atajo",
      "mover_al_actor_con_el_teclado",
      "imprimir_en_consola"
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

    this.capturar_ctrl_s();
  },

  capturar_ctrl_s() {
    document.addEventListener("keydown", e => {
      e = e || window.event;

      if (!e.ctrlKey && !e.metaKey) {
        return;
      }

      var code = e.which || e.keyCode;

      switch (code) {
        case 83:
          this.send("alternarEstadoDeEjecucion");
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    });
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
    document.removeEventListener("keydown", this.alPulsarTecla);

    this.bus.off("selecciona_un_actor_en_modo_pausa", this, "seleccionaUnActorEnModoPausa");
    this.bus.off("cierra_dialogo_de_animaciones", this, "cierra_dialogo_de_animaciones");
    this.bus.off("cambia_folding_en_el_editor", this, "cambia_folding_en_el_editor");
    this.bus.off("cuando_cambia_el_estado_de_la_camara_en_el_editor", this, "cuando_cambia_el_estado_de_la_camara_en_el_editor");
  },

  conectar_eventos() {
    this.lista_de_eventos.map(evento => {
      this.bus.on(`${this.nombre_del_contexto}:${evento}`, this, evento);
    });

    this.bus.on("selecciona_un_actor_en_modo_pausa", this, "seleccionaUnActorEnModoPausa");
    this.bus.on("cierra_dialogo_de_animaciones", this, "cierra_dialogo_de_animaciones");
    this.bus.on("cambia_folding_en_el_editor", this, "cambia_folding_en_el_editor");

    this.bus.on("cuando_cambia_el_estado_de_la_camara_en_el_editor", this, "cuando_cambia_el_estado_de_la_camara_en_el_editor");
  },

  seleccionaUnActorEnModoPausa(actor) {
    try {
      let codigo = this.obtener_codigo_para_el_actor({ nombre: actor.nombre });
      this.set("codigo", codigo);
      this.set("tituloDelCodigo", actor.nombre);
      this.set("identificador", actor.id);
    } catch (TypeError) {
      console.warn("No se puede encontrar el código de este actor", actor);
    }
  },

  desconectar_eventos() {
    this.lista_de_eventos.map(evento => {
      this.bus.off(`${this.nombre_del_contexto}:${evento}`, this, evento);
    });

    this.bus.on("selecciona_un_actor_en_modo_pausa", this, "seleccionaUnActorEnModoPausa");
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

  duplicar_el_actor_seleccionado_con_click(data) {
    debounce(
      this,
      () => {
        if (this.get("tipo_de_la_instancia_seleccionada") == "actor") {
          let actor = this.get("instancia_seleccionada");
          this.send("cuando_intenta_duplicar", actor.id, false, data.x, data.y);
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

  imprimir_en_consola(data) {
    this.log.imprimir_desde_el_editor(data.mensaje, data.tipo_de_dato);
  },

  mover_al_actor_con_el_teclado(data) {
    if (this.get("tipo_de_la_instancia_seleccionada") == "actor") {
      let delta = 1;

      if (this.get("grilla") > 0) {
        delta = this.get("grilla");
      }

      let actor = this.get("instancia_seleccionada");

      // guarda la posición actual para deshacer en caso de error.
      this.memento.accion("mueve_actor", {
        id: actor.id,
        x: actor.x,
        y: actor.y
      });

      if (data.x) {
        actor.set("x", Math.round(actor.x + delta * data.x));
      }

      if (data.y) {
        actor.set("y", Math.round(actor.y + delta * data.y));
      }

      this.send("cuandoModificaObjeto", actor);
    }
  },

  finaliza_carga() {
    if (!(this.get("isDestroyed") || this.get("isDestroying"))) {
      this.set("cargando", false);
      this.mostrar_la_escena_inicial();

      this.actualizar_enumeraciones_del_proyecto();

      if (this.estado.ModoCargando) {
        this.set("estado", this.estado.cuandoTerminoDeCargarPilas());
      } else {
        console.warn("Se ha reiniciando el canvas, se omite cambiar el autómata de estados.");
      }
    }
  },

  actualizar_enumeraciones_del_proyecto() {
    let animaciones = this.proyecto.animaciones || [];
    let sonidos = this.proyecto.sonidos || [];

    this.bus.trigger("actualizar_enumeraciones", {
      animaciones: animaciones.map(e => e.nombre),
      sonidos: sonidos.map(e => e.nombre),
      teclas: [
        "izquierda", //
        "derecha",
        "arriba",
        "abajo",
        "espacio",
        "tecla_0",
        "tecla_1",
        "tecla_2",
        "tecla_3",
        "tecla_4",
        "tecla_5",
        "tecla_6",
        "tecla_7",
        "tecla_8",
        "tecla_9",
        "tecla_a",
        "tecla_b",
        "tecla_c",
        "tecla_d",
        "tecla_e",
        "tecla_f",
        "tecla_g",
        "tecla_h",
        "tecla_i",
        "tecla_j",
        "tecla_k",
        "tecla_l",
        "tecla_m",
        "tecla_n",
        "tecla_ñ",
        "tecla_o",
        "tecla_p",
        "tecla_q",
        "tecla_r",
        "tecla_s",
        "tecla_t",
        "tecla_u",
        "tecla_v",
        "tecla_w",
        "tecla_x",
        "tecla_y",
        "tecla_z"
      ]
    });
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

  // Se ejecuta cuando el usuario mueve la cámara o
  // ajusta el zoom de la cámara del editor.
  cuando_cambia_el_estado_de_la_camara_en_el_editor(datos) {
    console.assert(datos.x);
    console.assert(datos.y);

    this.set("proyecto.editor_camara_x", datos.x);
    this.set("proyecto.editor_camara_y", datos.y);

    if (datos.zoom) {
      this.set("proyecto.editor_camara_zoom", datos.zoom);
    }
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

    // Elimina los actores de la escena.
    let nombres_de_actores_a_eliminar = escenaActual.actores.map(n => n.nombre);

    nombres_de_actores_a_eliminar.map(nombre => {
      let objetoCodigo = this.proyecto.codigos.actores.findBy("nombre", nombre);
      this.proyecto.codigos.actores.removeObject(objetoCodigo);
    });

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

  registrar_bloques_de_actor(nombre, bloques) {
    let proyecto = this.proyecto;

    proyecto.bloques.actores.pushObject(
      EmberObject.create({
        nombre,
        bloques
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

  registrar_bloques_de_escena(nombre, bloques) {
    let proyecto = this.proyecto;

    proyecto.bloques.escenas.pushObject(
      EmberObject.create({
        nombre,
        bloques
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

  obtener_bloques_del_actor_por_nombre(nombre) {
    return this.get("proyecto.bloques.actores").findBy("nombre", nombre);
  },

  obtener_bloques_de_la_escena_por_nombre(nombre) {
    return this.get("proyecto.bloques.escenas").findBy("nombre", nombre);
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

  obtenerEscenaDesdeActorID(indice) {
    let escenas = this.get("proyecto.escenas");

    return escenas.filter(escena => {
      return escena.actores.findBy("id", indice);
    }).firstObject;
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

  guardar_bloques_en_el_proyecto(seleccion, bloques) {
    if (seleccion === 0) {
      this.definir_bloques_para_el_proyecto(bloques);
    } else {
      let actor = this.obtenerDetalleDeActorPorIndice(seleccion);

      if (actor) {
        this.definir_bloques_para_el_actor(actor, bloques);
      } else {
        let escena = this.obtenerDetalleDeEscenaPorIndice(seleccion);
        this.definir_bloques_para_la_escena(escena, bloques);
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

  definir_bloques_para_el_proyecto(bloques) {
    this.proyecto.bloques.proyecto = bloques;
  },

  error(data) {
    this.log.error(data.mensaje, "");
    this.set("existe_un_error_reciente", true);
  },

  definir_codigo_para_el_actor({ nombre }, codigo) {
    this.obtener_actor_por_nombre(nombre).set("codigo", codigo);
  },

  definir_bloques_para_el_actor({ nombre }, bloques) {
    this.obtener_bloques_del_actor_por_nombre(nombre).set("bloques", bloques.texto);
    this.obtener_bloques_del_actor_por_nombre(nombre).set("codigo_de_bloques", bloques.codigo_de_bloques);
  },

  definir_bloques_para_la_escena({ nombre }, bloques) {
    this.obtener_bloques_de_la_escena_por_nombre(nombre).set("bloques", bloques);
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
    let plantilla_de_bloques = fixture_workspace_bloques_de_escena_nueva;

    this.registrar_codigo_de_escena(nombre, plantilla);
    this.registrar_bloques_de_escena(nombre, plantilla_de_bloques);

    return escena;
  },

  obtener_escena_por_id(proyecto, id) {
    return proyecto.escenas.findBy("id", id);
  },

  normalizar_a_la_grilla(valor) {
    let grilla = this.get("grilla") || 1;
    return Math.round(valor / grilla) * grilla;
  },

  cierra_dialogo_de_animaciones() {
    this.actualizar_enumeraciones_del_proyecto();
  },

  cambia_folding_en_el_editor(datos) {
    this.guardar_folding_en_el_proyecto(datos.titulo, datos.estado);
  },

  guardar_folding_en_el_proyecto(titulo, estado_folding) {
    this.get("proyecto.plegados")[titulo] = estado_folding;
  },

  obtener_estado_de_plegado(titulo) {
    if (this.proyecto.plegados && this.proyecto.plegados[titulo]) {
      return this.proyecto.plegados[titulo];
    } else {
      return null;
    }
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

      // si el actor está en una carpeta lo tiene que quitar.
      actor.set("carpeta", undefined);

      escena_origen.actores.removeObject(actor);
      escena_nueva.actores.pushObject(actor);
      this.send("cuandoSelecciona", escena_nueva.id);
    },

    mover_actor_a_una_escena(proyecto, actor, escena_origen_id, escena_seleccionada) {
      let escena_origen = this.obtener_escena_por_id(proyecto, escena_origen_id);

      // si el actor está en una carpeta lo tiene que quitar.
      actor.set("carpeta", undefined);

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

      if (!actor.propiedades.lasers) {
        actor.propiedades.lasers = [];
      }

      escena.actores.pushObject(EmberObject.create(actor.propiedades));

      this.registrar_codigo_de_actor(nombre, preparar_codigo_para_el_editor(actor.codigo));

      if (actor.bloques.get && actor.bloques.get("bloques")) {
        this.registrar_bloques_de_actor(nombre, actor.bloques.get("bloques"));
      } else {
        this.registrar_bloques_de_actor(nombre, actor.bloques);
      }

      this.set("mostrarModalCreacionDeActor", false);

      this.mostrar_la_escena_actual_sobre_pilas();
      this.send("cuandoSelecciona", id);

      if (!omitir_deshacer) {
        this.memento.accion("agrega_actor", { id });
      }
    },

    cuando_termino_de_cargar_monaco_editor() {},

    cuando_cambia_el_codigo(codigo /*, titulo*/) {
      // Cuando cambia el código en el modo pausa se tiene
      // que ignorar el cambio y no alterar el código del proyecto.
      if (this.estado.es_modo_pausa) {
        return;
      }

      if (!this.cargando) {
        this.serviceProyecto.cuando_realiza_un_cambio();
      }

      this.set("codigo", codigo);
      this.guardar_codigo_en_el_proyecto(this.seleccion, codigo);
    },

    cuando_cambia_bloques(bloques) {
      // Cuando cambia el código en el modo pausa se tiene
      // que ignorar el cambio y no alterar el código del proyecto.
      if (this.estado.es_modo_pausa) {
        return;
      }

      this.guardar_bloques_en_el_proyecto(this.seleccion, bloques);
    },

    ejecutar() {
      this.bus.trigger(`${this.nombre_del_contexto}:quitar_pausa`, {});

      this.bus.trigger(`formatear`);

      later(() => {
        this.set("existe_un_error_reciente", false);
        this.set("estado", this.estado.ejecutar());

        let escena = this.obtener_la_escena_actual();

        /* El compilador llevará el código TypeScript del proyecto a un AST, aplicará
           la instrumentación del código y luego retornará el resultado como código
           JavaScript listo para ejecutar. */
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
        }

        this.bus.trigger(`${this.nombre_del_contexto}:recargar_proyecto`, hash, true);

        this.bus.trigger(`${this.nombre_del_contexto}:ejecutar_proyecto`, datos);
        this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});

        this.log.limpiar();
        this.log.info(this.intl.t("interpreter.entering.run"));
        this.log.info(this.intl.t("interpreter.scope"));
      }, 10);
    },

    detener() {
      // Vuelve a seleccionar el actor o escena actual para que el
      // editor de código muestre el actor actual. Esto se hace porque
      // el usuario podría cambiar el texto del editor seleccionando otro
      // actor mientras está en el modo pausa.
      this.send("cuandoSelecciona", this.seleccion);

      this.set("existe_un_error_reciente", false);
      this.mostrar_la_escena_actual_sobre_pilas();
      this.set("estado", this.estado.detener());
      this.bus.trigger("hacerFocoEnElEditor", {});
      this.log.limpiar();
      this.log.info(this.intl.t("interpreter.entering.edit"));
      this.bus.trigger("regresa_al_modo_editor");
    },

    pausar() {
      this.set("existe_un_error_reciente", false);
      this.set("estado", this.estado.pausar());
      this.bus.trigger(`${this.nombre_del_contexto}:pausar_escena`, {});
      this.bus.trigger(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, {});
      this.log.limpiar();
      this.log.info(this.intl.t("interpreter.entering.pause"));
    },

    deshacer() {
      this.memento.deshacer(this);
    },

    cambiarPosicion(valorNuevo) {
      this.serviceProyecto.cuando_realiza_un_cambio();
      this.set("posicion", valorNuevo);

      this.bus.trigger(`${this.nombre_del_contexto}:cambiar_posicion_del_modo_historia_desde_el_editor`, {
        posicion: valorNuevo
      });
    },

    cuandoGuardaDesdeElEditorDeBloques() {
      this.send("cuandoGuardaDesdeElEditor");
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
        this.set("tituloDelCodigo", "proyecto");
        this.set("identificador", "");
        this.set("plegadoDelCodigo", this.obtener_estado_de_plegado("proyecto"));
        return;
      }

      this.set("seleccion", seleccion);

      let actor = this.obtenerDetalleDeActorPorIndice(seleccion);
      let escena = this.obtenerDetalleDeEscenaPorIndice(seleccion);

      if (!actor && !escena) {
        // Si no encuentra el actor es probable que tenga que seleccionar
        // otra escena y volver a lanzar la búsqueda.

        let objeto_escena = this.obtenerEscenaDesdeActorID(seleccion);

        if (objeto_escena) {
          let escenaID = objeto_escena.id;
          this.set("ultimaEscenaSeleccionada", escenaID);
          this.mostrar_la_escena_actual_sobre_pilas();

          // Luego de seleccionar la escena vuelve a buscar al actor.
          actor = this.obtenerDetalleDeActorPorIndice(seleccion);
        }
      }

      if (escena) {
        this.memento.limpiar();
        this.set("instancia_seleccionada", escena);
        this.set("tipo_de_la_instancia_seleccionada", "escena");
        this.set("ultimaEscenaSeleccionada", seleccion);
        this.mostrar_la_escena_actual_sobre_pilas();

        this.set("codigo", this.obtener_codigo_para_la_escena(escena));
        this.set("tituloDelCodigo", escena.nombre);
        this.set("identificador", escena.id);
        this.set("plegadoDelCodigo", this.obtener_estado_de_plegado(escena.nombre));
      }

      if (actor) {
        this.set("instancia_seleccionada", actor);
        this.set("tipo_de_la_instancia_seleccionada", "actor");

        this.set("codigo", this.obtener_codigo_para_el_actor(actor));
        this.set("tituloDelCodigo", actor.nombre);
        this.set("identificador", actor.id);
        this.set("plegadoDelCodigo", this.obtener_estado_de_plegado(actor.nombre));

        this.bus.trigger(`${this.nombre_del_contexto}:selecciona_actor_desde_el_editor`, {
          id: seleccion
        });
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

    cuando_intenta_duplicar(id, aleatorio, x, y) {
      aleatorio = aleatorio || false;

      this.serviceProyecto.cuando_realiza_un_cambio();
      let actor_original = this.obtenerDetalleDeActorPorIndice(id);
      let codigo = this.obtener_codigo_para_el_actor(actor_original);

      let bloques = this.obtener_bloques_del_actor_por_nombre(actor_original.get("nombre"));

      let actor = {
        nombre: actor_original.get("nombre"),
        codigo: codigo,
        bloques: bloques,
        imagen: actor_original.get("imagen"),
        propiedades: JSON.parse(JSON.stringify(actor_original))
      };

      if (aleatorio) {
        actor.propiedades.x = parseInt(Math.random() * 400) - 200;
        actor.propiedades.y = parseInt(Math.random() * 400) - 200;
      } else {
        let tamaño_de_grilla = this.get("grilla");

        if (x !== undefined && y !== undefined) {
          actor.propiedades.x = this.normalizar_a_la_grilla(x);
          actor.propiedades.y = this.normalizar_a_la_grilla(y);
        } else {
          if (tamaño_de_grilla > 0) {
            actor.propiedades.x += tamaño_de_grilla;
          } else {
            actor.propiedades.x += 20;
            actor.propiedades.y -= 20;
          }
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

      // invoca a la acción "al_guardar" dentro de controllers/editor.js
      // esta función es la que hace la captura de pantalla, la guarda en
      // local storage y además abre el cuadro de dialogo para guardar
      // el archivo .pilas
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

      this.set("tituloDelCodigo", actor.nombre);
      this.set("identificador", actor.id);
    },

    cuando_cambia_un_nombre_de_escena(/*nombre*/) {
      // Intenta recargar el editor, para eso vuelve a seleccionar la escena
      // actual y asigna un tituloDelCodigo aleatorio para que se cargue de nuevo.
      let escena = this.obtenerDetalleDeEscenaPorIndice(this.seleccion);

      this.set("instancia_seleccionada", escena);
      this.set("tipo_de_la_instancia_seleccionada", "escena");
      this.set("codigo", this.obtener_codigo_para_la_escena(escena));

      this.set("tituloDelCodigo", escena.nombre);
      this.set("identificador", escena.id);
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
