import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  ejemplos: service(),

  model(params) {
    return this.get("ejemplos")
      .obtener()
      .then(data => {
        return data.ejemplos.findBy("nombre", params.nombre);
      });
  }
});
