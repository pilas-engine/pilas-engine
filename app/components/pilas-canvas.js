import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";
import utils from "../utils/utils";
import ENV from "pilas-engine/config/environment";
import animaciones_iniciales from "../fixtures/animaciones-iniciales";

export default Component.extend({
  bus: service(),
  log: service(),
  recursos: service(),
  ancho: 400,
  alto: 400,
  estado: null,
  contexto: null,
  mantenerFoco: false,
  classNames: ["flex1", "flex", "overflow-hidden", "unseletable", "bg-fondo-canvas"],
  classNameBindings: ["altoFijo:h250"],
  altoFijo: false,
  porcentajeDeCarga: 0,
  cuando_termina_de_cargar: null,
  nombre_del_contexto: null,

  didInsertElement() {
    let iframe = this.element.querySelector("iframe");

    if (!this.get("recursos.data")) {
      throw Error("No se inicializó el servicio recursos. Tienes que llamar a iniciar antes.");
    }

    iframe.onload = () => {
      let opciones_de_pilas = ENV.pilas;
      let contexto = iframe.contentWindow;
      this.set("contexto", contexto);

      opciones_de_pilas.pixelart = this.convertir_a_boolean(this.pixelart);

      let imagenes_para_cargar_desde_el_proyecto = [];

      if (this.proyecto && this.proyecto.imagenes) {
        imagenes_para_cargar_desde_el_proyecto = this.proyecto.imagenes;
      }

      if (!this.nombre_del_contexto) {
        throw new Error(`Imposible iniciar pilas-canvas sin nombre de contexto.`);
      }

      let data = {
        tipo: "iniciar_pilas",
        ancho: this.ancho,
        alto: this.alto,
        nombre_del_contexto: this.nombre_del_contexto,
        recursos: this.get("recursos.data"),
        opciones: opciones_de_pilas,
        imagenes: imagenes_para_cargar_desde_el_proyecto
      };

      this.set("funcionParaAtenderMensajes", e => {
        return this.atenderMensajesDePilas(contexto, e);
      });

      contexto.postMessage(data, utils.HOST);

      window.addEventListener("message", this.funcionParaAtenderMensajes, false);

      this.bus.on(`${this.nombre_del_contexto}:cargar_escena`, this, "cargar_escena");
      this.bus.on(`${this.nombre_del_contexto}:finaliza_carga`, this, "finaliza_carga");
      this.bus.on(`${this.nombre_del_contexto}:ejecutar_proyecto`, this, "ejecutar_proyecto");
      this.bus.on(`${this.nombre_del_contexto}:pausar_escena`, this, "pausar_escena");
      this.bus.on(`${this.nombre_del_contexto}:cambiar_posicion_desde_el_editor`, this, "cambiar_posicion_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:selecciona_actor_desde_el_editor`, this, "selecciona_actor_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:actualizar_actor_desde_el_editor`, this, "actualizar_actor_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:actualizar_escena_desde_el_editor`, this, "actualizar_escena_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:actualizar_proyecto_desde_el_editor`, this, "actualizar_proyecto_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, this, "hacer_foco_en_pilas");
      this.bus.on(`${this.nombre_del_contexto}:progreso_de_carga`, this, "progreso_de_carga");
      this.bus.on(`${this.nombre_del_contexto}:eliminar_actor_desde_el_editor`, this, "eliminar_actor_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, this, "cuando_termina_de_iniciar");
      this.bus.on(`${this.nombre_del_contexto}:cambiar_zoom`, this, "cuando_cambia_zoom");
    };
  },

  didReceiveAttrs() {
    if (this.contexto) {
      this.emitir_estados_de_depuracion_a_pilas();
    }
  },

  willDestroyElement() {
    window.removeEventListener("message", this.funcionParaAtenderMensajes);

    this.bus.off(`${this.nombre_del_contexto}:cargar_escena`, this, "cargar_escena");
    this.bus.off(`${this.nombre_del_contexto}:finaliza_carga`, this, "finaliza_carga");
    this.bus.off(`${this.nombre_del_contexto}:ejecutar_proyecto`, this, "ejecutar_proyecto");
    this.bus.off(`${this.nombre_del_contexto}:pausar_escena`, this, "pausar_escena");
    this.bus.off(`${this.nombre_del_contexto}:cambiar_posicion_desde_el_editor`, this, "cambiar_posicion_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:selecciona_actor_desde_el_editor`, this, "selecciona_actor_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:actualizar_actor_desde_el_editor`, this, "actualizar_actor_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:actualizar_escena_desde_el_editor`, this, "actualizar_escena_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:actualizar_proyecto_desde_el_editor`, this, "actualizar_proyecto_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, this, "hacer_foco_en_pilas");
    this.bus.off(`${this.nombre_del_contexto}:progreso_de_carga`, this, "progreso_de_carga");
    this.bus.off(`${this.nombre_del_contexto}:eliminar_actor_desde_el_editor`, this, "eliminar_actor_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, this, "cuando_termina_de_iniciar");
    this.bus.off(`${this.nombre_del_contexto}:cambiar_zoom`, this, "cuando_cambia_zoom");
  },

  convertir_a_boolean(valor) {
    if (valor === "true") {
      return true;
    }

    if (valor === "false") {
      return false;
    }

    return valor;
  },

  widthParaElModoZoomEnviado: computed("modoZoom", "ancho", function() {
    if (this.modoZoom === 1) {
      return htmlSafe("100%");
    }

    if (this.modoZoom === 2) {
      return htmlSafe(`${this.ancho}px`);
    }

    return Error(`No se puede usar el modoZoom ${this.modoZoom}`);
  }),

  heightParaElModoZoomEnviado: computed("modoZoom", "alto", function() {
    if (this.modoZoom === 1) {
      return htmlSafe("");
    }

    if (this.modoZoom === 2) {
      return htmlSafe(`${this.alto}px`);
    }

    return Error(`No se puede usar el modoZoom ${this.modoZoom}`);
  }),

  cargar_escena({ escena, proyecto }) {
    let data = {
      tipo: "define_escena",
      nombre: "editorState",
      nombre_del_contexto: this.nombre_del_contexto,
      escena: escena,
      proyecto: proyecto
    };

    this.contexto.postMessage(data, utils.HOST);
    this.emitir_estados_de_depuracion_a_pilas();
  },

  emitir_estados_de_depuracion_a_pilas() {
    let data = {
      tipo: "definir_estados_de_depuracion",
      nombre_del_contexto: this.nombre_del_contexto,
      pos: this.pos,
      fps: this.fps,
      fisica: this.fisica
    };
    this.contexto.postMessage(data, utils.HOST);
  },

  ejecutar_proyecto({ proyecto, nombre_de_la_escena_inicial, codigo, permitir_modo_pausa }) {
    this.agregar_animaciones_iniciales_al_proyecto_si_no_las_tiene(proyecto);

    let data = {
      tipo: "ejecutar_proyecto",
      nombre_del_contexto: this.nombre_del_contexto,
      proyecto: proyecto,
      nombre_de_la_escena_inicial: nombre_de_la_escena_inicial,
      permitir_modo_pausa: permitir_modo_pausa,
      codigo: codigo
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  agregar_animaciones_iniciales_al_proyecto_si_no_las_tiene(proyecto) {
    if (!proyecto.animaciones) {
      proyecto.animaciones = animaciones_iniciales;
    }
  },

  selecciona_actor_desde_el_editor({ id }) {
    let data = {
      tipo: "selecciona_actor_desde_el_editor",
      nombre_del_contexto: this.nombre_del_contexto,
      id
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  eliminar_actor_desde_el_editor({ id }) {
    let data = {
      tipo: "eliminar_actor_desde_el_editor",
      nombre_del_contexto: this.nombre_del_contexto,
      id
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  cuando_cambia_zoom(cantidad) {
    let data = {
      tipo: "cambiar_zoom",
      nombre_del_contexto: this.nombre_del_contexto,
      zoom: cantidad
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  actualizar_actor_desde_el_editor({ id, actor }) {
    let data = {
      tipo: "actualizar_actor_desde_el_editor",
      nombre_del_contexto: this.nombre_del_contexto,
      id,
      actor
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  actualizar_escena_desde_el_editor({ id, escena }) {
    let data = {
      tipo: "actualizar_escena_desde_el_editor",
      nombre_del_contexto: this.nombre_del_contexto,
      id,
      escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  actualizar_proyecto_desde_el_editor({ proyecto }) {
    let data = {
      tipo: "actualizar_proyecto_desde_el_editor",
      nombre_del_contexto: this.nombre_del_contexto,
      proyecto
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  finaliza_carga(pilas, contexto) {
    if (this.cuando_termina_de_cargar) {
      this.cuando_termina_de_cargar(pilas, contexto, this.id_canvas);
    }
  },

  cuando_termina_de_iniciar(pilas, contexto) {
    if (this.cuando_termina_de_iniciar_ejecucion) {
      this.cuando_termina_de_iniciar_ejecucion(pilas, contexto);
    }
  },

  pausar_escena({ escena }) {
    let data = {
      tipo: "pausar_escena",
      nombre_del_contexto: this.nombre_del_contexto,
      escena: escena
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  hacer_foco_en_pilas() {
    let iframe = this.element.querySelector("iframe");
    setTimeout(function() {
      iframe.contentWindow.focus();
    }, 10);
  },

  progreso_de_carga({ progreso }) {
    this.set("porcentajeDeCarga", progreso);
  },

  estilo_barra_de_progreso: computed("porcentajeDeCarga", function() {
    let porcentajeDeCarga = this.porcentajeDeCarga;
    return htmlSafe(`width: ${porcentajeDeCarga}%`);
  }),

  cambiar_posicion_desde_el_editor({ posicion }) {
    let data = {
      tipo: "cambiar_posicion",
      nombre_del_contexto: this.nombre_del_contexto,
      posicion: posicion
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  atenderMensajesDePilas(contexto, e) {
    let nombre_del_contexto = e.data.nombre_del_contexto;

    if (e.origin !== utils.HOST) {
      return;
    }

    // Evita atenerder mensajes que provien de otro iframe.
    if (e.data.tipo) {
      if (nombre_del_contexto !== this.nombre_del_contexto) {
        return;
      }
    }

    if (e.data.tipo === "finaliza_carga_de_recursos") {
      this.bus.trigger(`${nombre_del_contexto}:finaliza_carga`, contexto.pilasengine, contexto);
    }

    if (e.data.tipo === "pulsa_la_tecla_escape") {
      this.bus.trigger(`${this.nombre_del_contexto}:pulsa_la_tecla_escape`, e.data);
    }

    if (e.data.tipo === "progreso_de_carga") {
      this.bus.trigger(`${nombre_del_contexto}:progreso_de_carga`, e.data);
    }

    if (e.data.tipo === "termina_de_mover_un_actor") {
      this.bus.trigger(`${this.nombre_del_contexto}:termina_de_mover_un_actor`, e.data);
    }

    if (e.data.tipo === "mientras_mueve_la_camara") {
      this.bus.trigger(`${this.nombre_del_contexto}:mientras_mueve_la_camara`, e.data);
    }

    if (e.data.tipo === "comienza_a_mover_un_actor") {
      this.bus.trigger(`${this.nombre_del_contexto}:comienza_a_mover_un_actor`, e.data);
    }

    if (e.data.tipo === "comienza_a_depurar_en_modo_pausa") {
      this.bus.trigger(`${this.nombre_del_contexto}:inicia_modo_depuracion_en_pausa`, e.data);
    }

    if (e.data.tipo === "cambia_posicion_dentro_del_modo_pausa") {
      this.bus.trigger(`${this.nombre_del_contexto}:cuando_cambia_posicion_dentro_del_modo_pausa`, e.data);
    }

    if (e.data.tipo === "error_de_ejecucion") {
      this.bus.trigger(`${this.nombre_del_contexto}:error`, e.data);
    }

    if (e.data.tipo === "termina_de_iniciar_ejecucion") {
      this.bus.trigger(`${nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, contexto.pilasengine, contexto);
    }

    // Evento personalizado que solo se usa en el editor de animaciones.
    if (e.data.tipo === "cambia_cuadro_de_animacion") {
      this.bus.trigger(`${nombre_del_contexto}:cuando_cambia_cuadro_de_animacion`, contexto.pilasengine, e.data);
    }

    if (e.data.tipo === "cuando_pulsa_escape") {
      this.cuandoPulsaEscapeEnModoEjecucion();
    }
  },
  actions: {
    detener() {
      this.set("estado", this.estado.detener());
    }
  }
});
