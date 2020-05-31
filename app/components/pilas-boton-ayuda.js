import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  scroll: 0,

  fijar_scroll() {
    let iframe = document.querySelector("#manual-en-modal");

    if (iframe) {
      iframe.contentWindow.scrollTo(0, this.scroll);
    }
  },

  guardar_scroll() {
    let iframe = document.querySelector("#manual-en-modal");

    if (iframe) {
      this.set("scroll", iframe.contentWindow.scrollY);
    }
  },

  actions: {
    mostrar() {
      this.set("modal_visible", true);
      later(this, "fijar_scroll", 10);
    },

    ocultar() {
      this.set("modal_visible", false);
      this.guardar_scroll();
    }
  }
});
