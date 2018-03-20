import { later } from '@ember/runloop';
import Service from "@ember/service";

export default Service.extend({
  iniciar() {},

  notificar_transicion(ruta) {
    if (ga) {
      later(() => {
        let params = {
          page: ruta,
          title: ruta
        };

        ga("send", "pageview", params);
      });
    }
  }
});
