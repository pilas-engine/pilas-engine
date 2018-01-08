import Service from "@ember/service";
import Ember from "ember";

export default Service.extend({
  data: "",

  iniciar() {
    return Ember.$.get("/pilas-engine.d.ts").then(data => {
      console.log("listo!");
      this.set("data", data);
    });
  },

  obtener() {
    console.log("obteniendo declaraciones");
    return this.get("data");
  }
});
