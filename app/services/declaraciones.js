import { hash, Promise as EmberPromise } from "rsvp";
import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { Promise } from "rsvp";

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
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", `${config.rootURL}${nombre}`);

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      };

      xhr.send();
    });
  },

  obtener() {
    return this.data;
  }
});
