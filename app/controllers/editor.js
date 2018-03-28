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
  maximizar: { defaultValue: false, replace: true }
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
            nombre: "Escena1",
            codigo: `class Escena1 extends Escena {
              iniciar() {
              }

              actualizar() {
              }
            }`
          },
          {
            nombre: "Escena2",
            codigo: `class Escena2 extends Escena {
              iniciar() {
              }

              actualizar() {
              }
            }`
          }
        ],
        actores: [
          {
            tipo: "Pelota",
            codigo: `class Pelota  extends ActorBase {

            iniciar() {
            }

            actualizar() {
            }
          }`
          },
          {
            tipo: "Caja",
            codigo: `class Caja extends ActorBase {
            iniciar() {
            }

            actualizar() {
            }
          }`
          },
          {
            tipo: "Actor",
            codigo: `class Actor extends ActorBase {
              iniciar() {
              }

              actualizar() {
              }
          }`
          },
          {
            tipo: "Aceituna",
            codigo: `class Aceituna extends ActorBase {

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
          nombre: "Escena1",
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
              tipo: "Pelota",
              imagen: "pelota",
              transparencia: 0,
              espejado: false,
              espejado_vertical: false,
              figura: "circulo",
              figura_dinamica: true,
              figura_ancho: 100,
              figura_alto: 100,
              figura_radio: 40,
              figura_sin_rotacion: false,
              figura_rebote: 1
            },
            {
              id: 3,
              x: 250,
              y: 140,
              centro_x: 0.5,
              centro_y: 0.5,
              rotacion: 30,
              escala_x: 1,
              escala_y: 1,
              tipo: "Caja",
              imagen: "caja",
              transparencia: 0,
              espejado: false,
              espejado_vertical: false,
              figura: "",
              figura_dinamica: true,
              figura_ancho: 100,
              figura_alto: 100,
              figura_radio: 40,
              figura_sin_rotacion: false,
              figura_rebote: 1
            },
            {
              id: 4,
              x: 100,
              y: 0,
              centro_x: 0.5,
              centro_y: 0.5,
              rotacion: 30,
              escala_x: 1,
              escala_y: 1,
              tipo: "Actor",
              imagen: "sin_imagen",
              transparencia: 0,
              espejado: false,
              espejado_vertical: false,
              figura: "rectangulo",
              figura_dinamica: true,
              figura_ancho: 100,
              figura_alto: 100,
              figura_radio: 40,
              figura_sin_rotacion: false,
              figura_rebote: 0.9
            },
            {
              id: 5,
              x: 0,
              y: 40,
              centro_x: 0.5,
              centro_y: 0.5,
              rotacion: 10,
              escala_x: 1,
              escala_y: 1,
              tipo: "Aceituna",
              imagen: "aceituna",
              transparencia: 0,
              espejado: false,
              espejado_vertical: false,
              figura: "",
              figura_dinamica: true,
              figura_ancho: 100,
              figura_alto: 100,
              figura_radio: 40,
              figura_sin_rotacion: false,
              figura_rebote: 1
            }
          ]
        },
        {
          nombre: "Escena2",
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
