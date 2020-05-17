import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  memento: service(),

  deshacer: null, // acción que se envía como parámetro.
  rehacer: null // acción que se envía como parámetro.
});
