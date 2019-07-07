import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import string_a_json from "../utils/string-a-json";

export default Route.extend({
  api: service(),

  model(params) {
    return this.api.obtener_proyecto(params.hash).then(data => {
      return {
        hash: params.hash,
        proyecto: data
      };
    });
  },

  afterModel(model) {
    model.modoZoom = 2;
    let proyecto = string_a_json(model.proyecto.serializado);

    // TODO: tomar esta configuración del backend;
    model.ver_codigo = true;
    model.proyecto = proyecto.proyecto;
  }
});
