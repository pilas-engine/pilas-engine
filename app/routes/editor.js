import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import ENV from "pilas-engine/config/environment";

export default Route.extend({
  serviceProyecto: service("proyecto"),

  model() {
    return this.paramsFor("application");
  },

  actions: {
    willTransition: function(transition) {
      /*
       * Este método previene que el usuario pulse "cmd-left" o el botón
       * regresar y el navegador haga la transición directamente, haciendo
       * que el usuario pierda los cambios del proyecto.
       *
       * Hay un caso particular en donde este método no interviene: si el
       * usuario el botón volver de la interfaz, y se le pregunta si quiere
       * perder los cambios, el mismo componente "pilas-boton-regresar" lo
       * envía a la ruta "app.editor.abandonar-proyecto" para que este método
       * no haga nada y deje seguir la transición.
       */

      if (transition.to.name == "app.editor.abandonar-proyecto") {
        return true;
      }

      if (ENV.environment !== "test" && this.serviceProyecto.hay_cambios_por_guardar) {
        if (window.confirm("¿Realmente quieres salir?")) {
          return true;
        } else {
          transition.abort();
        }
      } else {
        return true;
      }
    }
  }
});
