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
  classNames: ["flex1", "flex", "unseletable", "bg-fondo-canvas"],
  classNameBindings: ["altoFijo:h250", "desactivarScroll:overflow-hidden"],
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

      if (this.proyecto) {
        switch (this.proyecto.modo_de_video) {
          case "suavizado": {
            opciones_de_pilas.pixelart = false;
            break;
          }

          case "pixelart": {
            opciones_de_pilas.pixelart = true;
            break;
          }

          default: {
            opciones_de_pilas.pixelart = false;
            let valor = this.proyecto.modo_de_video;
            console.warn(`Hay un valor incorrecto en modo_de_video del proyecto, dice ${valor}`);
            break;
          }
        }
      }

      if (this.proyecto && this.proyecto.fps) {
        opciones_de_pilas.fps = this.proyecto.fps;
      }

      let imagenes_para_cargar_desde_el_proyecto = [];

      if (this.proyecto && this.proyecto.imagenes) {
        imagenes_para_cargar_desde_el_proyecto = this.proyecto.imagenes;
      }

      let sonidos_para_cargar_desde_el_proyecto = [];

      if (this.proyecto && this.proyecto.sonidos) {
        sonidos_para_cargar_desde_el_proyecto = this.proyecto.sonidos;
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
        imagenes: imagenes_para_cargar_desde_el_proyecto,
        sonidos: sonidos_para_cargar_desde_el_proyecto
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
      this.bus.on(`${this.nombre_del_contexto}:cambiar_posicion_del_modo_historia_desde_el_editor`, this, "cambiar_posicion_del_modo_historia_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:selecciona_actor_desde_el_editor`, this, "selecciona_actor_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:actualizar_actor_desde_el_editor`, this, "actualizar_actor_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:actualizar_escena_desde_el_editor`, this, "actualizar_escena_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, this, "hacer_foco_en_pilas");
      this.bus.on(`${this.nombre_del_contexto}:progreso_de_carga`, this, "progreso_de_carga");
      this.bus.on(`${this.nombre_del_contexto}:eliminar_actor_desde_el_editor`, this, "eliminar_actor_desde_el_editor");
      this.bus.on(`${this.nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, this, "cuando_termina_de_iniciar");
      this.bus.on(`cuando_cambia_grilla_desde_el_selector_manual`, this, "cuando_cambia_grilla_desde_el_selector_manual");
      this.bus.on(`${this.nombre_del_contexto}:termina_de_reproducir_sonido`, this, "termina_de_reproducir_sonido");
      this.bus.on(`ubicar_camara_en_el_actor`, this, "ubicar_camara_en_el_actor");
      this.bus.on(`selecciona_un_actor_en_modo_pausa`, this, "selecciona_un_actor_en_modo_pausa");
      this.bus.on(`selecciona_la_escena_completa_en_modo_pausa`, this, "selecciona_la_escena_completa_en_modo_pausa");
      this.bus.on(`capturar_pantalla`, this, "capturar_pantalla");
      this.bus.on("cuando_cambia_el_tamaño_del_escenario", this, "cuando_cambia_el_tamaño_del_escenario");
    };
  },

  didReceiveAttrs() {
    if (this.contexto) {
      console.warn("TODO: Aquí se emiten los estados de depuración, evitar hacer esto y notificar desde la barra de botones.");
      this.emitir_estados_de_depuracion_a_pilas();
    }
  },

  willDestroyElement() {
    window.removeEventListener("message", this.funcionParaAtenderMensajes);

    this.bus.off(`${this.nombre_del_contexto}:cargar_escena`, this, "cargar_escena");
    this.bus.off(`${this.nombre_del_contexto}:finaliza_carga`, this, "finaliza_carga");
    this.bus.off(`${this.nombre_del_contexto}:ejecutar_proyecto`, this, "ejecutar_proyecto");
    this.bus.off(`${this.nombre_del_contexto}:pausar_escena`, this, "pausar_escena");
    this.bus.off(`${this.nombre_del_contexto}:cambiar_posicion_del_modo_historia_desde_el_editor`, this, "cambiar_posicion_del_modo_historia_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:selecciona_actor_desde_el_editor`, this, "selecciona_actor_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:actualizar_actor_desde_el_editor`, this, "actualizar_actor_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:actualizar_escena_desde_el_editor`, this, "actualizar_escena_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:hacer_foco_en_pilas`, this, "hacer_foco_en_pilas");
    this.bus.off(`${this.nombre_del_contexto}:progreso_de_carga`, this, "progreso_de_carga");
    this.bus.off(`${this.nombre_del_contexto}:eliminar_actor_desde_el_editor`, this, "eliminar_actor_desde_el_editor");
    this.bus.off(`${this.nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, this, "cuando_termina_de_iniciar");
    this.bus.off(`cuando_cambia_grilla_desde_el_selector_manual`, this, "cuando_cambia_grilla_desde_el_selector_manual");
    this.bus.off(`${this.nombre_del_contexto}:termina_de_reproducir_sonido`, this, "termina_de_reproducir_sonido");
    this.bus.off(`${this.nombre_del_contexto}:ubicar_camara_en_el_actor`, this, "ubicar_camara_en_el_actor");
    this.bus.off(`selecciona_un_actor_en_modo_pausa`, this, "selecciona_un_actor_en_modo_pausa");
    this.bus.off(`selecciona_la_escena_completa_en_modo_pausa`, this, "selecciona_la_escena_completa_en_modo_pausa");
    this.bus.off(`capturar_pantalla`, this, "capturar_pantalla");
    this.bus.off("cuando_cambia_el_tamaño_del_escenario", this, "cuando_cambia_el_tamaño_del_escenario");
  },

  cuando_cambia_el_tamaño_del_escenario(datos) {
    let data = {
      tipo: "cuando_cambia_el_tamaño_del_escenario",
      nombre_del_contexto: this.nombre_del_contexto,
      ancho: datos.ancho,
      alto: datos.alto,
    };

    this.contexto.postMessage(data, utils.HOST);
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

  clasesDeAcuerdoAlModoZoom: computed("modoZoom", function() {
    if (this.modoZoom === 1) {
      return `flex1 height-revert`;
    } else {
      return `overflow-scroll`;
    }
  }),

  activarScroll: computed("modoZoom", function() {
    return (this.modoZoom !== 1);
  }),

  desactivarScroll: computed("modoZoom", function() {
    return (this.modoZoom === 1);
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
    //this.definir_zoom_inicial_para_el_modo_editor();
    this.definir_grilla_inicial_para_el_modo_editor();
  },

  definir_zoom_inicial_para_el_modo_editor() {
    let data = {
      tipo: "definir_zoom_inicial_para_el_modo_editor",
      nombre_del_contexto: this.nombre_del_contexto,
      zoom: this.zoom
    };
    this.contexto.postMessage(data, utils.HOST);
  },

  definir_grilla_inicial_para_el_modo_editor() {
    this.cuando_cambia_grilla_desde_el_selector_manual(this.grilla);
  },

  emitir_estados_de_depuracion_a_pilas() {
    let data = {
      tipo: "definir_estados_de_depuracion",
      nombre_del_contexto: this.nombre_del_contexto,
      pos: this.pos,
      fps: this.fps,
      fisica: this.fisica,
      minimapa: this.minimapa,
      fisica_en_modo_ejecucion: this.fisica_en_modo_ejecucion
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

  termina_de_reproducir_sonido(sonido) {
    let data = {
      tipo: "termina_de_reproducir_sonido",
      nombre_del_contexto: this.nombre_del_contexto,
      sonido: sonido
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  selecciona_un_actor_en_modo_pausa(actor) {
    let data = {
      tipo: "selecciona_un_actor_en_modo_pausa",
      nombre_del_contexto: this.nombre_del_contexto,
      actor
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  capturar_pantalla() {
    let data = {
      tipo: "capturar_pantalla",
      nombre_del_contexto: this.nombre_del_contexto
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  selecciona_la_escena_completa_en_modo_pausa() {
    let data = {
      tipo: "selecciona_un_actor_en_modo_pausa",
      nombre_del_contexto: this.nombre_del_contexto,
      actor: null
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  cuando_cambia_grilla_desde_el_selector_manual(grilla) {
    let data = {
      tipo: "cuando_cambia_grilla_desde_el_selector_manual",
      nombre_del_contexto: this.nombre_del_contexto,
      grilla: grilla
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

  ubicar_camara_en_el_actor(actor_id) {
    let data = {
      tipo: "ubicar_camara_en_el_actor",
      nombre_del_contexto: this.nombre_del_contexto,
      actor_id: actor_id
    };

    this.contexto.postMessage(data, utils.HOST);
  },

  cambiar_posicion_del_modo_historia_desde_el_editor({ posicion }) {
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

    if (!e.data.tipo) {
      return;
    }

    if (e.data.tipo === "finaliza_carga_de_recursos") {
      this.bus.trigger(`${nombre_del_contexto}:finaliza_carga`, contexto.pilasengine, contexto);
      return;
    }

    if (e.data.tipo === "pulsa_la_tecla_escape") {
      this.bus.trigger(`${this.nombre_del_contexto}:pulsa_la_tecla_escape`, e.data);
      return;
    }

    if (e.data.tipo === "progreso_de_carga") {
      this.bus.trigger(`${nombre_del_contexto}:progreso_de_carga`, e.data);
      return;
    }

    if (e.data.tipo === "termina_de_mover_un_actor") {
      this.bus.trigger(`${this.nombre_del_contexto}:termina_de_mover_un_actor`, e.data);
      return;
    }

    if (e.data.tipo === "mientras_mueve_la_camara") {
      this.bus.trigger(`${this.nombre_del_contexto}:mientras_mueve_la_camara`, e.data);
      return;
    }

    if (e.data.tipo === "comienza_a_mover_un_actor") {
      this.bus.trigger(`${this.nombre_del_contexto}:comienza_a_mover_un_actor`, e.data);
      return;
    }

    if (e.data.tipo === "duplicar_el_actor_seleccionado") {
      this.bus.trigger(`${this.nombre_del_contexto}:duplicar_el_actor_seleccionado`, e.data);
      return;
    }

    if (e.data.tipo === "duplicar_el_actor_seleccionado_con_click") {
      this.bus.trigger(`${this.nombre_del_contexto}:duplicar_el_actor_seleccionado_con_click`, e.data);
      return;
    }

    if (e.data.tipo === "eliminar_el_actor_seleccionado") {
      this.bus.trigger(`${this.nombre_del_contexto}:eliminar_el_actor_seleccionado`, e.data);
      return;
    }

    if (e.data.tipo === "crear_un_actor_desde_atajo") {
      this.bus.trigger(`${this.nombre_del_contexto}:crear_un_actor_desde_atajo`, e.data);
      return;
    }

    if (e.data.tipo === "mover_al_actor_con_el_teclado") {
      this.bus.trigger(`${this.nombre_del_contexto}:mover_al_actor_con_el_teclado`, e.data);
      return;
    }

    if (e.data.tipo === "comienza_a_depurar_en_modo_pausa") {
      this.bus.trigger(`${this.nombre_del_contexto}:inicia_modo_depuracion_en_pausa`, e.data);
      return;
    }

    if (e.data.tipo === "comienza_el_modo_edicion") {
      this.bus.trigger(`${this.nombre_del_contexto}:inicia_modo_edicion`, e.data);
      return;
    }

    if (e.data.tipo === "cambia_posicion_dentro_del_modo_pausa") {
      this.bus.trigger(`${this.nombre_del_contexto}:cuando_cambia_posicion_dentro_del_modo_pausa`, e.data);
      return;
    }

    if (e.data.tipo === "error_de_ejecucion") {
      this.bus.trigger(`${this.nombre_del_contexto}:error`, e.data);
      return;
    }

    if (e.data.tipo === "termina_de_iniciar_ejecucion") {
      this.bus.trigger(`${nombre_del_contexto}:cuando_termina_de_iniciar_ejecucion`, contexto.pilasengine, contexto);
      return;
    }

    // Evento personalizado que solo se usa en el editor de animaciones.
    if (e.data.tipo === "cambia_cuadro_de_animacion") {
      this.bus.trigger(`${nombre_del_contexto}:cuando_cambia_cuadro_de_animacion`, contexto.pilasengine, e.data);
      return;
    }

    if (e.data.tipo === "cuando_pulsa_escape") {
      this.cuandoPulsaEscapeEnModoEjecucion();
      return;
    }

    if (e.data.tipo === "termina_de_reproducir_sonido") {
      this.bus.trigger(`${nombre_del_contexto}:termina_de_reproducir_sonido`, e.data);
      return;
    }

    if (e.data.tipo === "codigo_ejecutado") {
      // Emite el mensaje codigo_ejecutado que lo suele atender el editor de código.
      this.bus.trigger("codigo_ejecutado", e.data);
      return;
    }

    if (e.data.tipo === "aplica_el_cambio_de_posicion_en_el_modo_pausa") {
      this.bus.trigger("aplica_el_cambio_de_posicion_en_el_modo_pausa", e.data);
      return;
    }

    if (e.data.tipo === "imprimir_en_consola") {
      this.bus.trigger(`${nombre_del_contexto}:imprimir_en_consola`, e.data);
      return;
    }

    if (e.data.tipo === "captura_de_pantalla_realizada") {
      this.bus.trigger("captura_de_pantalla_realizada", e.data);
      return;
    }

    if (e.data.tipo === "cuando_cambia_el_estado_de_la_camara_en_el_editor") {
      this.bus.trigger("cuando_cambia_el_estado_de_la_camara_en_el_editor", e.data);
      return;
    }

    throw Error(`En pilas-canvas.js se recibió el mensaje ${e.data.tipo}, pero este no se re-envió al servicio bus. Busque el método atenderMensajesDePilas`);
  },
  actions: {
    detener() {
      this.set("estado", this.estado.detener());
    }
  }
});
