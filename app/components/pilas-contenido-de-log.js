import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  bus: Ember.inject.service(),
  classNames: ["flex1", "overflow-y-auto"],

  didInsertElement() {
    this.get("bus").on("se_actualiza_el_log", this, "realizarScroll");
  },

  willDestroyElement() {
    this.get("bus").off("se_actualiza_el_log", this, "realizarScroll");
  },

  realizarScroll() {
    Ember.run.later(() => {
      if (this.$()) {
        let elemento = this.$()[0];

        if (elemento && elemento.scroll) {
          elemento.scroll(0, elemento.scrollHeight);
        }
      }
    }, 10);
  }
});