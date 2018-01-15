import Service from "@ember/service";
import Ember from "ember";
import config from "pilas-engine/config/environment";

export default Service.extend({
  data: null,

  iniciar() {
    let data = this.get("data");

    if (!data) {
      return Ember.RSVP.hash({
        pilas: this._obtener_archivo("pilas-engine.d.ts"),
        typescript: this._obtener_archivo("phaser.d.ts"),
        p2: this._obtener_archivo("p2.d.ts")
      }).then(result => {
        this.set("data", result.typescript + "\n\n" + result.p2 + "\n\n" + result.pilas);
        return result;
      });
    } else {
      return new Ember.RSVP.Promise(success => {
        success(data);
      });
    }
  },

  _obtener_archivo(nombre) {
    return Ember.$.get(`${config.rootURL}${nombre}`);
  },

  obtener() {
    return this.get("data");
  }
});
