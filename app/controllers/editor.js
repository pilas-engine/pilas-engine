import Ember from "ember";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";
import QueryParams from "ember-parachute";

const queryParams = new QueryParams({
  serializado: {
    defaultValue: null,
    refresh: true,
    replace: true
  }
});

export default Ember.Controller.extend(queryParams.Mixin, {
  proyecto: null,

  setup(event) {
    let params = event.queryParams;

    if (params.serializado) {
      this.cargarProyectoDesdeQueryParams(params);
    } else {
      this.crearProyectoInicial();
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

    return proyectoComoObjetoEmber;
  },

  crearProyectoInicial() {
    let proyecto = {
      titulo: "Proyecto demo",
      escenas: [
        {
          nombre: "escena principal",
          id: 1,
          actores: [
            {
              x: 0,
              y: 0,
              tipo: "actor"
            }
          ]
        },
        {
          nombre: "Otra escena",
          id: 2,
          actores: []
        }
      ]
    };

    let proyectoComoObjetoEmber = this.convertirEscenaEnObjetoEmber(proyecto);
    this.set("proyecto", proyectoComoObjetoEmber);
  },

  reset(_, isExiting) {
    if (isExiting) {
      this.resetQueryParams();
    }
  },

  actions: {
    serializar(model) {
      let str = json_a_string(model);
      this.set("serializado", str);
      string_a_json(str);
    },
    agregarEscena(model) {
      model.escenas.pushObject({
        nombre: "demo",
        id: 3,
        actores: []
      });
    },
    agregarActor(model) {
      model.escenas[0].actores.pushObject(
        Ember.Object.create({
          x: 1,
          y: 30,
          tipo: "actor"
        })
      );
    },
    moverActores(model) {
      model.escenas[0].actores.forEach(actor => {
        actor.set("x", Math.floor(Math.random() * 10));
      });
    },
    cambiarEscena(model) {
      model.escenas[0].set("nombre", "asdasd");
    }
  }
});
