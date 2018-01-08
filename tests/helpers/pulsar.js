import { registerAsyncHelper } from "@ember/test";
import Ember from "ember";

export default registerAsyncHelper("pulsar", function(app, texto) {
  return new Ember.RSVP.Promise(success => {
    let elemento = Ember.$(`a:contains('${texto}')`);

    if (elemento.length === 0) {
      throw new Error(`No existe un tag a con el texto: '${texto}'.`);
    }

    if (elemento.length > 1) {
      throw new Error(`Hay ${elemento.length} elemento con el texto: '${texto}', se esperaba solo uno.`);
    }

    elemento.animate({ opacity: 0.2 }, 100).animate({ opacity: 1 }, 100, function() {
      elemento.click();
      success();
    });
  });
});
