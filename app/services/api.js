import Service from "@ember/service";
import ENV from "pilas-engine/config/environment";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";

export default Service.extend({
  electron: service(),
  enElectron: alias("electron.enElectron"),

  publicar_juego(proyecto_como_string, serializado, ver_codigo) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = null;

      if (this.enElectron) {
        url = `${ENV.remoteBackendURL}/proyecto/subir`;
      } else {
        url = `${ENV.backendURL}/proyecto/subir`;
      }

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");

      xhr.onload = function() {
        if (xhr.status == 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject(url);
        }
      };

      xhr.onerror = function() {
        reject(url);
      };

      var data = JSON.stringify({
        codigo: proyecto_como_string,
        codigo_serializado: serializado,
        ver_codigo: ver_codigo
      });

      xhr.send(data);
    });
  },

  obtener_proyecto(hash) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let url = `${ENV.backendURL}/proyecto/obtener/${hash}`;

      xhr.open("GET", url, true);

      xhr.onload = function() {
        if (xhr.status == 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject(url);
        }
      };

      xhr.onerror = function() {
        reject(url);
      };

      xhr.send();
    });
  }
});
