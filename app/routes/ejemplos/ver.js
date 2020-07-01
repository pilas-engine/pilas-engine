import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";

export default Route.extend({
  ejemplos: service(),

  model(params) {
    return this.ejemplos.obtener_por_nombre(params.nombre);
  }
});
