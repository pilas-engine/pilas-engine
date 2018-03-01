import Service from "@ember/service";
import Ember from "ember";

export default Service.extend({
  iniciar() {},

  notificar_transicion(ruta) {
    if (ga) {
      Ember.run.later(() => {
        let params = {
          page: ruta,
          title: ruta
        };

        ga("send", "pageview", params);
      });
    }
  }
});
