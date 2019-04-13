import jQuery from "jquery";
import { hash, Promise as EmberPromise } from "rsvp";
import Service from "@ember/service";
import config from "pilas-engine/config/environment";

export default Service.extend({
  data: "",

  iniciar() {
    let data = this.data;

    if (!data) {
      return hash({
        pilas: this._obtener_archivo("pilas-engine.d.ts")
        //typescript: this._obtener_archivo("phaser.d.ts"),
        //p2: this._obtener_archivo("p2.d.ts")
      }).then(result => {
        if (!(this.isDestroyed || this.isDestroying)) {
          this.set(
            "data",
            [result.typescript, result.p2, result.pilas].join("\n")
          );
          return result;
        } else {
          return result;
        }
      });
    } else {
      return new EmberPromise(success => {
        success(data);
      });
    }
  },

  _obtener_archivo(nombre) {
    return jQuery.get(`${config.rootURL}${nombre}`);
  },

  obtener() {
    return this.data;
  }
});
