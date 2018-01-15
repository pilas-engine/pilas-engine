import Service from "@ember/service";
import Ember from "ember";
import config from "pilas-engine/config/environment";

export default Service.extend({
  data: "",

  iniciar() {
    let data = this.get("data");

    if (!data) {
      return Ember.RSVP.hash({
        pilas: this._obtener_archivo("pilas-engine.d.ts"),
        typescript: this._obtener_archivo("phaser.d.ts"),
        p2: this._obtener_archivo("p2.d.ts")
      }).then(result => {
        if (!(this.get("isDestroyed") || this.get("isDestroying"))) {
          this.set("data", [result.typescript, result.p2, result.pilas].join("\n"));
          return result;
        } else {
          return result;
        }
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
