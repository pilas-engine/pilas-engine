import { registerAsyncHelper } from "@ember/test";
import Ember from "ember";

export default registerAsyncHelper("esperarElemento", function(app, selector) {
  return new Ember.RSVP.Promise((success, fail) => {
    let cantidadDeIntentos = 0;

    function existeElemento() {
      return Ember.$(selector).length > 0;
    }

    consultarExistenciaDiferida();

    function consultarExistenciaDiferida() {
      Ember.run.later(() => {
        if (existeElemento()) {
          success();
        } else {
          cantidadDeIntentos += 1;

          if (cantidadDeIntentos > 20) {
            fail(new Error(`No se encontró el elemento '${selector}', incluso con una espera.`));
          } else {
            consultarExistenciaDiferida();
          }
        }
      }, 1000);
    }
  });
});
