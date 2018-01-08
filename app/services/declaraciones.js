import Service from "@ember/service";
import Ember from "ember";

export default Service.extend({
  data: null,

  iniciar() {
    let data = this.get("data");

    if (!data) {
      return Ember.$.get("/pilas-engine.d.ts").then(result => {
        this.set("data", result);
        return result;
      });
    } else {
      return data;
    }
  },

  obtener() {
    return this.get("data");
  }
});
