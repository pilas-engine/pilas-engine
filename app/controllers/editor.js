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
  ocultarEditor: {
    as: "p3",
    defaultValue: false,
    replace: true
  },
  ocultarPropiedades: {
    as: "p1",
    defaultValue: false,
    replace: true
  }
});

export default Ember.Controller.extend(queryParams.Mixin, {
  proyecto: null,
  bus: Ember.inject.service(),
  escenaActual: 1,

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
          codigo: `class Pelota  extends Actor{

            iniciar() {
              console.log("iniciando pelota");
            }

          }`
        },
        {
          tipo: "Caja",
          codigo: `class Caja extends Actor {
          }`
        },
        {
          tipo: "ActorBasico",
          codigo: `class ActorBasico extends Actor {

          }`
        },
        {
          tipo: "Aceituna",
          codigo: `class Aceituna extends Actor {

              iniciar() {
                console.log("iniciando actor!!!");
              }

              actualizar() {
                if (pilas.control.izquierda) {
                  this.x -= this.velocidad;
                }

                if (pilas.control.derecha) {
                  this.x += this.velocidad;
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
              x: 300,
              y: 200,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Pelota",
              imagen: "pelota"
            },
            {
              id: 2,
              x: 350,
              y: 240,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "Caja",
              imagen: "caja"
            },
            {
              id: 3,
              x: 200,
              y: 100,
              centro_x: 0.5,
              centro_y: 0.5,
              tipo: "ActorBasico",
              imagen: "sin_imagen"
            },
            {
              id: 4,
              x: 100,
              y: 140,
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
