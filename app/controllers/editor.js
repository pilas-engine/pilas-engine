import Ember from "ember";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";

export default Ember.Controller.extend({
  serializado: null,

  actions: {
    serializar(model) {
      let str = json_a_string(model);
      string_a_json(str);
    },
    agregarEscena(model) {
      model.escenas.pushObject({
        nombre: "demo",
        id: 3
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
