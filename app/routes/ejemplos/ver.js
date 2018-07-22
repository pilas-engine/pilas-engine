import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  ejemplos: service(),

  model(params) {
    return this.ejemplos.obtener().then(data => {
      return {
        nombre: params.nombre,
        ejemplo: data.ejemplos.findBy("nombre", params.nombre)
      };
    });
  }
});
