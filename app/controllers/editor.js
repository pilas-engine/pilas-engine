import Ember from "ember";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import QueryParams from "ember-parachute";

const queryParams = new QueryParams({
  serializado: {
    defaultValue: null,
    refresh: true,
    replace: true
  },
  mostrarEditor: {
    as: "p3",
    defaultValue: true,
    replace: true
  },
  mostrarPropiedades: {
    as: "p1",
    defaultValue: true,
    replace: true
  },
  escenaActual: {
    defaultValue: 1,
    replace: true
  },
  actorSeleccionado: {
    defaultValue: -1,
    replace: true
  },
  mostrarModalCreacionDeActor: {
    defaultValue: false,
    replace: true
  },
  mostrarInterprete: {
    defaultValue: true,
    replace: true
  }
});

export default Ember.Controller.extend(queryParams.Mixin, {
  proyecto: null,
  bus: Ember.inject.service(),

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
    let proyectoComoObjetoEmber = Ember.Object.create(proyecto);

    proyectoComoObjetoEmber.escenas = proyecto.escenas.map(escena => {
      escena.actores = escena.actores.map(a => Ember.Object.create(a));
      return Ember.Object.create(escena);
    });

    proyectoComoObjetoEmber.tiposDeActores = proyecto.tiposDeActores.map(tipo => {
      return Ember.Object.create(tipo);
    });

    return proyectoComoObjetoEmber;
  },

  crearProyectoInicial() {
    let proyecto = {
      titulo: "Proyecto demo",
      ancho: 500,
      alto: 500,
      tiposDeActores: [
        {
          tipo: "Pelota",
          codigo: `class Pelota  extends ActorBase {

            iniciar() {
            }

          }`
        },
        {
          tipo: "Caja",
          codigo: `class Caja extends ActorBase {
            iniciar() {
              this.sprite.game.physics.p2.enable([this.sprite], true);
              this.sprite.body.static = false;
            }
          }`
        },
        {
          tipo: "Actor",
          codigo: `class Actor extends ActorBase {

          }`
        },
        {
          tipo: "Aceituna",
          codigo: `class Aceituna extends ActorBase {

              iniciar() {
              }

              actualizar() {
                if (pilas.control.izquierda) {
                  this.x -= 5;
                  this.rotacion += 10;
                }

                if (pilas.control.derecha) {
                  this.x += 5;
                  this.rotacion -= 10;
                }
              }

            }`
        }
      ],
      escenas: [
        {
          nombre: "escena principal",
          id: 1,
          actores: [
            {
              id: 1,
              x: 200,
              y: 100,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Pelota",
              imagen: "pelota"
            },
            {
              id: 2,
              x: 250,
              y: 140,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Caja",
              imagen: "caja"
            },
            {
              id: 3,
              x: 100,
              y: 0,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Actor",
              imagen: "sin_imagen"
            },
            {
              id: 4,
              x: 0,
              y: 40,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Aceituna",
              imagen: "aceituna"
            }
          ]
        },
        {
          nombre: "Otra escena",
          id: 4,
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
