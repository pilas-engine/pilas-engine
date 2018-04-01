import EmberObject from "@ember/object";
import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import QueryParams from "ember-parachute";

const queryParams = new QueryParams({
  serializado: { defaultValue: null, refresh: true, replace: true },
  mostrarEditor: { as: "p3", defaultValue: true, replace: true },
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
  oscuro: { defaultValue: false, replace: true }
});

export default Controller.extend(queryParams.Mixin, {
  proyecto: null,
  bus: service(),

  setup(event) {
    let params = event.queryParams;

    if (params.serializado) {
      this.cargarProyectoDesdeQueryParams(params);
    } else {
      this.crearProyectoInicial();
    }
  },

  reset(_, isExiting) {
    if (isExiting) {
      this.resetQueryParams();
    }
  },

  cargarProyectoDesdeQueryParams(params) {
    let proyecto = string_a_json(params.serializado);
    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    this.set("proyecto", proyectoComoObjetoEmber);
  },

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
    let proyecto = {
      titulo: "Proyecto demo",
      ancho: 500,
      alto: 500,
      codigos: {
        escenas: [
          {
            nombre: "escena1",
            codigo: `class escena1 extends Escena {
              iniciar() {
              }

              actualizar() {
              }
            }`
          },
          {
            nombre: "escena2",
            codigo: `class escena2 extends Escena {
              iniciar() {
              }

              actualizar() {
              }
            }`
          }
        ],
        actores: [
          {
            nombre: "pelota",
            codigo: `class pelota extends ActorBase {

            iniciar() {
            }

            actualizar() {
            }
          }`
          },
          {
            nombre: "caja",
            codigo: `class caja extends ActorBase {
            iniciar() {
            }

            actualizar() {
            }
          }`
          }
        ]
      },
      escenas: [
        {
          nombre: "escena1",
          id: 1,
          camara_x: 0,
          camara_y: 0,
          actores: [
            {
              id: 2,
              x: 200,
              y: 100,
              centro_x: 0.5,
              centro_y: 0.5,
              rotacion: 30,
              escala_x: 1,
              escala_y: 1,
              nombre: "pelota",
              imagen: "pelota",
              transparencia: 0,
              espejado: false,
              espejado_vertical: false,
              figura: "circulo",
              figura_dinamica: true,
              figura_ancho: 100,
              figura_alto: 100,
              figura_radio: 25,
              figura_sin_rotacion: false,
              figura_rebote: 1
            }
          ]
        },
        {
          nombre: "escena2",
          id: 6,
          camara_x: 0,
          camara_y: 0,
          actores: []
        }
      ]
    };

    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    this.set("proyecto", proyectoComoObjetoEmber);
  },

  actions: {
    alGuardar(proyecto) {
      let str = json_a_string(proyecto);
      this.set("serializado", str);
      string_a_json(str);
    }
  }
});
