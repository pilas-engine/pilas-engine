import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Component from "@ember/component";

export default Component.extend({
  bus: service(),
  classNames: ["flex1", "overflow-y-auto"],

  didInsertElement() {
    this.get("bus").on("se_actualiza_el_log", this, "realizarScroll");
  },

  willDestroyElement() {
    this.get("bus").off("se_actualiza_el_log", this, "realizarScroll");
  },

  realizarScroll() {
    later(() => {
      if (this.$()) {
        let elemento = this.$()[0];

        if (elemento && elemento.scroll) {
          elemento.scroll(0, elemento.scrollHeight);
        }
      }
    }, 10);
  }
});
