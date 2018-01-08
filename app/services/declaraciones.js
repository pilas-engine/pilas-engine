import Service from "@ember/service";
import Ember from "ember";
import config from "pilas-engine/config/environment";

export default Service.extend({
  data: null,

  iniciar() {
    let data = this.get("data");
    let rootURL = config.rootURL;

    if (!data) {
      return Ember.$.get(`${rootURL}pilas-engine.d.ts`).then(result => {
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
