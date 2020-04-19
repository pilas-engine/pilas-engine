import Service from "@ember/service";
import config from "pilas-engine/config/environment";
import { task, timeout } from "ember-concurrency";
import { Promise } from "rsvp";

export default Service.extend({
  iniciado: false,
  data: null,
  lista_de_actores: null,

  tareaConseguirActores: task(function*() {
    yield timeout(500);

    let metadata = yield this.obtenerActores();
    let codigo_del_actor_base = metadata.actores[0].codigo;

    let propiedades_base = this.extraer_diccionario("propiedades_base", codigo_del_actor_base);

    for (let i = 0; i < metadata.actores.length; i++) {
      let actor = metadata.actores[i];

      let propiedades = this.extraer_diccionario("propiedades", actor.codigo);
      actor.imagen = propiedades.imagen;
      actor.propiedades = this.combinar_propiedades(propiedades_base, propiedades);
    }

    let actores_accesibles = metadata.actores.filter(actor => {
      return !actor.nombre.startsWith("-");
    });

    this.set("lista_de_actores", actores_accesibles);

    return { actores: actores_accesibles };
  }).drop(),

  obtenerActores() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", `${config.rootURL}actores.json`);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.status);
        }
      };

      xhr.send();
    });
  },

  extraer_diccionario(diccionario, codigo) {
    let regex = new RegExp(`${diccionario}\\s+=\\s+(\\{[\\s\\S]*?\\};)`, "g");
    let resultado = regex.exec(codigo);

    let propiedades = {};

    if (resultado && resultado.length > 1) {
      propiedades = eval("(" + resultado[1].replace("};", "}") + ")");
    }

    return propiedades;
  },

  combinar_propiedades(propiedades_iniciales, propiedades) {
    function extend(obj, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
      }
      return obj;
    }

    return extend(JSON.parse(JSON.stringify(propiedades_iniciales)), propiedades);
  },

  iniciar() {
    return this.tareaConseguirActores.perform();
  }
});
