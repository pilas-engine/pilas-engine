import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  pos: "up",

  modoZoomReal: computed("modoZoom", function() {
    return this.modoZoom === 2;
  }),

  modoZoomExpandido: computed("modoZoom", function() {
    return this.modoZoom === 1;
  }),

  actions: {
    cambiarModo(modo) {
      this.set("modoZoom", modo);
    }
  }
});
