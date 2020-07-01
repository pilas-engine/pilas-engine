import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";
import { observer } from "@ember/object";

export default Component.extend({
  classNames: ["unselectable"],
  ejemplos: service(),
  anterior: null,
  siguiente: null,

  cuando_cambia_ejemplo: observer("nombre", function() {
    this.iniciar.perform();
  }),

  didInsertElement() {
    this.iniciar.perform();
  },

  iniciar: task(function*() {
    yield this.ejemplos.obtener();

    this.set("anterior", this.ejemplos.obtener_anterior(this.nombre));
    this.set("siguiente", this.ejemplos.obtener_siguiente(this.nombre));
  }).drop()
});
