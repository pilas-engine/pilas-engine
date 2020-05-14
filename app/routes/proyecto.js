import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import string_a_json from "../utils/string-a-json";
import convertirProyectoEnObjetoEmber from "pilas-engine/utils/convertir-proyecto-en-objeto-ember";

export default Route.extend({
  api: service(),
  migraciones: service(),

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

    model.ver_codigo = model.proyecto.ver_codigo;
    model.proyecto = this.migraciones.migrar(convertirProyectoEnObjetoEmber(proyecto.proyecto));
  }
});
