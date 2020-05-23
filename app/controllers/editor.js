import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import QueryParams from "ember-parachute";
import { task, timeout } from "ember-concurrency";
import fixtureDeProyecto from "../fixtures/proyecto-inicial";
import convertirProyectoEnObjetoEmber from "pilas-engine/utils/convertir-proyecto-en-objeto-ember";

const queryParams = new QueryParams({
  //serializado: { defaultValue: null, refresh: true, replace: true },
  ruta: { defaultValue: null, refresh: true, replace: true },
  mostrarEditor: { as: "p3", defaultValue: false, replace: false },
  mostrarPropiedades: { as: "p1", defaultValue: true, replace: false },
  escenaActual: { defaultValue: 1, replace: true },
  actorSeleccionado: { defaultValue: -1, replace: true },
  //seleccion: { defaultValue: 1, replace: true },
  ultimaEscenaSeleccionada: { defaultValue: 1, replace: true },
  mostrarModalCreacionDeActor: { defaultValue: false, replace: true },
  mostrarInterprete: { defaultValue: false, replace: true },
  pos: { defaultValue: true, replace: true },
  fps: { defaultValue: true, replace: true },
  minimapa: { defaultValue: true, replace: true },
  fisica: { defaultValue: true, replace: true },
  fisica_en_modo_ejecucion: { defaultValue: false, replace: false },
  permitir_modo_pausa: { defaultValue: true, replace: true },
  oscuro: { defaultValue: true, replace: true },
  modoVim: { defaultValue: false, replace: true },
  modoZoom: { defaultValue: 1, replace: true },
  zoom: { defaultValue: 1, replace: true },
  grilla: { defaultValue: 0, replace: true },
  pixelart: { defaultValue: false, replace: true },
  ejemplo: { defaultValue: null, replace: true, refresh: true },
  hash: { defaultValue: null, replace: true, refresh: true },
  tamano: { defaultValue: 14, replace: true, refresh: true },
  mostrarModalDeAnimaciones: { defaultValue: false, replace: true },
  mostrarModalDeSonidos: { defaultValue: false, replace: true }
});

export default Controller.extend(queryParams.Mixin, {
  proyecto: null,
  bus: service(),
  ejemplos: service(),
  electron: service(),
  router: service(),
  api: service(),
  migraciones: service(),
  servicioProyecto: service("proyecto"),

  setup(event) {
    this.tareaCargarProyecto.perform(event.queryParams);
  },

  tareaCargarProyecto: task(function*(params) {
    if (params.ejemplo) {
      let proyecto = yield this.cargarProyectoDesdeEjemplo.perform(params.ejemplo);
      return this.migraciones.migrar(proyecto);
    }

    if (params.hash) {
      let datos = yield this.cargarProyectoDesdeHashDelBackend.perform(params.hash);

      if (!datos.ver_codigo) {
        alert("Lo siento, el código de este proyecto no se puede acceder.");
        return this.router.transitionTo("index");
      } else {
        return this.migraciones.migrar(datos);
      }
    }

    if (params.ruta) {
      let proyecto = yield this.cargar_proyecto_desde_ruta_archivo.perform(params.ruta);
      return this.migraciones.migrar(proyecto);
    }

    if (localStorage.getItem("pilas:proyecto_serializado")) {
      let proyecto_serializado = localStorage.getItem("pilas:proyecto_serializado");
      let proyecto = this.crear_proyecto_desde_cadena_serializada(proyecto_serializado);
      return this.migraciones.migrar(proyecto);
    }

    let proyecto = this.crearProyectoInicial();
    return this.migraciones.migrar(proyecto);
  }),

  reset(_, isExiting) {
    if (isExiting) {
      this.resetQueryParams();
    }
  },

  crear_proyecto_desde_cadena_serializada(serializado) {
    let proyecto = string_a_json(serializado);
    let proyectoComoObjetoEmber = convertirProyectoEnObjetoEmber(proyecto);
    return proyectoComoObjetoEmber;
  },

  cargarProyectoDesdeEjemplo: task(function*(nombre) {
    let data = yield this.ejemplos.obtener_por_nombre(nombre);
    return data.ejemplo.proyecto;
  }),

  cargarProyectoDesdeHashDelBackend: task(function*(hash) {
    let proyecto_serializado = yield this.api.obtener_proyecto(hash);
    let proyecto = string_a_json(proyecto_serializado.serializado);
    let objeto = convertirProyectoEnObjetoEmber(proyecto.proyecto);
    objeto.set("ver_codigo", proyecto_serializado.ver_codigo);
    return objeto;
  }),

  cargar_proyecto_desde_ruta_archivo: task(function*(ruta) {
    let proyecto = this.electron.abrir_proyecto_desde_archivo(ruta);
    yield timeout(100);
    return convertirProyectoEnObjetoEmber(proyecto);
  }),

  crearProyectoInicial() {
    let fixtureComoString = JSON.stringify(fixtureDeProyecto);
    let fixture = JSON.parse(fixtureComoString);
    let proyecto = convertirProyectoEnObjetoEmber(fixture);
    return proyecto;
  },

  actions: {
    al_guardar(proyecto) {
      let str = json_a_string(proyecto);

      if (this.electron.enElectron) {
        let json = string_a_json(str);

        this.electron.guardar_proyecto(this.ruta).then(ruta => {
          let proyecto = json;
          this.electron.guardar_proyecto_en_archivo(proyecto, ruta);
        });
      } else {
        this.set("serializado", str);
        saveTextAs(JSON.stringify(proyecto, null, 2), "proyecto.pilas");
        this.servicioProyecto.guardar_proyecto_serializado(str);
      }
    },

    al_crear_proyecto() {
      this.router.transitionTo("app.crear_proyecto");
    },

    al_abrir() {
      if (this.electron.enElectron) {
        this.electron.abrir_proyecto().then(ruta => {
          try {
            this.router.transitionTo("app.abrir_proyecto", ruta);
          } catch (err) {
            console.error(err);
            alert("Error, el archivo está mal formateado: " + err.name);
          }
        });
      } else {
        let input = window.document.getElementById("input-abrir-archivo");

        input.onchange = e => {
          var file = e.target.files[0];

          if (file.name.indexOf(".pilas") === -1) {
            alert("Solo puede abrir con extensión .pilas");
          } else {
            const reader = new FileReader();
            reader.onload = event => {
              let proyecto = JSON.parse(event.target.result);
              let serializado = json_a_string(proyecto);
              this.router.transitionTo("app.abrir_proyecto_serializado", serializado);
            };
            reader.readAsText(file);
          }
        };

        input.click();
      }
    }
  }
});
