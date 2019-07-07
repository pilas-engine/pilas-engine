import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import string_a_json from "../utils/string-a-json";

export default Route.extend({
  api: service(),

  model(params) {
    return this.api.obtener_proyecto(params.hash);
  },

  afterModel(model) {
    model.modoZoom = 2;
    let proyecto = string_a_json(model.serializado);
    model.proyecto = proyecto.proyecto;
  }
});
