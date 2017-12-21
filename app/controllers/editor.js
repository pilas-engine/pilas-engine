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
      let proyecto = this.crearProyectoInicial();
      this.set("proyecto", proyecto);
    }
  },

  cargarProyectoDesdeQueryParams(params) {
    let proyecto = string_a_json(params.serializado);
    let proyectoComoObjetoEmber = Ember.Object.create(proyecto);

    proyectoComoObjetoEmber.escenas = proyecto.escenas.map(escena => {
      escena.actores = escena.actores.map(a => Ember.Object.create(a));
      return Ember.Object.create(escena);
    });

    this.set("proyecto", proyectoComoObjetoEmber);
  },

  crearProyectoInicial() {
    return Ember.Object.create({
      titulo: "Proyecto demo",
      escenas: [
        Ember.Object.create({
          nombre: "escena principal",
          id: 1,
          actores: []
        }),
        Ember.Object.create({
          nombre: "Otra escena",
          id: 2,
          actores: []
        })
      ]
    });
  },

  reset({ queryParams }, isExiting) {
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
