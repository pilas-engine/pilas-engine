import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  tagName: "",
  scroll_manual: 0,
  scroll_glosario: 0,
  scroll_atajos: 0,
  manual_seleccionado: true,
  atajos_seleccionado: false,
  glosario_seleccionado: false,

  fijar_scroll() {
    let iframe_manual = document.querySelector("#manual-en-modal");
    let iframe_glosario = document.querySelector("#glosario-en-modal");
    let iframe_atajos = document.querySelector("#atajos-en-modal");

    if (iframe_manual) {
      iframe_manual.contentWindow.scrollTo(0, this.scroll_manual);
    }

    if (iframe_glosario) {
      iframe_glosario.contentWindow.scrollTo(0, this.scroll_glosario);
    }

    if (iframe_atajos) {
      iframe_atajos.contentWindow.scrollTo(0, this.scroll_atajos);
    }
  },

  guardar_scroll() {
    let iframe_manual = document.querySelector("#manual-en-modal");
    let iframe_glosario = document.querySelector("#glosario-en-modal");
    let iframe_atajos = document.querySelector("#atajos-en-modal");

    if (iframe_manual) {
      this.set("scroll_manual", iframe_manual.contentWindow.scrollY);
    }

    if (iframe_glosario) {
      this.set("scroll_glosario", iframe_glosario.contentWindow.scrollY);
    }

    if (iframe_atajos) {
      this.set("scroll_atajos", iframe_atajos.contentWindow.scrollY);
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
    },

    seleccionar_manual() {
      this.set("manual_seleccionado", true);
      this.set("atajos_seleccionado", false);
      this.set("glosario_seleccionado", false);
    },

    seleccionar_atajos() {
      this.set("manual_seleccionado", false);
      this.set("atajos_seleccionado", true);
      this.set("glosario_seleccionado", false);
    },

    seleccionar_glosario() {
      this.set("manual_seleccionado", false);
      this.set("atajos_seleccionado", false);
      this.set("glosario_seleccionado", true);
    }
  }
});
