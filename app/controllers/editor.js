import EmberObject from "@ember/object";
import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import QueryParams from "ember-parachute";
import { task } from "ember-concurrency";
import proyecto from "../fixtures/proyecto-inicial";

const queryParams = new QueryParams({
  serializado: { defaultValue: null, refresh: true, replace: true },
  mostrarEditor: { as: "p3", defaultValue: false, replace: true },
  expandirJuego: { as: "p2", defaultValue: true, replace: true },
  mostrarPropiedades: { as: "p1", defaultValue: true, replace: true },
  escenaActual: { defaultValue: 1, replace: true },
  actorSeleccionado: { defaultValue: -1, replace: true },
  seleccion: { defaultValue: 1, replace: true },
  ultimaEscenaSeleccionada: { defaultValue: 1, replace: true },
  mostrarModalCreacionDeActor: { defaultValue: false, replace: true },
  mostrarInterprete: { defaultValue: false, replace: true },
  pos: { defaultValue: true, replace: true },
  fps: { defaultValue: true, replace: true },
  fisica: { defaultValue: true, replace: true },
  permitir_modo_pausa: { defaultValue: true, replace: true },
  maximizar: { defaultValue: false, replace: true },
  oscuro: { defaultValue: false, replace: true },
  ejemplo: { defaultValue: null, replace: true, refresh: true }
});

export default Controller.extend(queryParams.Mixin, {
  proyecto: null,
  bus: service(),
  ejemplos: service(),
  electron: service(),

  setup(event) {
    this.tareaCargarProyecto.perform(event.queryParams);
  },

  tareaCargarProyecto: task(function*(params) {
    if (params.serializado) {
      return this.cargarProyectoDesdeQueryParams(params);
    }

    if (params.ejemplo) {
      return yield this.cargarProyectoDesdeEjemplo.perform(params.ejemplo);
    }

    return this.crearProyectoInicial();
  }),

  reset(_, isExiting) {
    if (isExiting) {
      this.resetQueryParams();
    }
  },

  cargarProyectoDesdeQueryParams(params) {
    let proyecto = string_a_json(params.serializado);
    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    return proyectoComoObjetoEmber;
  },

  cargarProyectoDesdeEjemplo: task(function*(nombre) {
    let ejemplos = yield this.ejemplos.obtener();
    let proyecto = ejemplos.ejemplos.findBy("nombre", nombre).proyecto;
    return this.convertirEscenaEnObjetoEmber(proyecto);
  }),

  convertirEscenaEnObjetoEmber(proyecto) {
    let proyectoComoObjetoEmber = EmberObject.create(proyecto);

    proyectoComoObjetoEmber.escenas = proyecto.escenas.map(escena => {
      escena.actores = escena.actores.map(a => EmberObject.create(a));
      return EmberObject.create(escena);
    });

    proyectoComoObjetoEmber.codigos.actores = proyecto.codigos.actores.map(tipo => {
      return EmberObject.create(tipo);
    });

    proyectoComoObjetoEmber.codigos.escenas = proyecto.codigos.escenas.map(tipo => {
      return EmberObject.create(tipo);
    });

    return proyectoComoObjetoEmber;
  },

  crearProyectoInicial() {
    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    return proyectoComoObjetoEmber;
  },

  actions: {
    al_guardar(proyecto) {
      let str = json_a_string(proyecto);
      this.set("serializado", str);
      let json = string_a_json(str);
      console.log(json);

      if (this.electron.enElectron) {
        console.log("En electron, guardar....");
      } else {
        console.log("En un navegador, serializar....");
      }


    },
  }
});
