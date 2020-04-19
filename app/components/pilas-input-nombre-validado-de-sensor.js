import Component from "@ember/component";
import { later } from "@ember/runloop";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "span",
  nombreSugerido: "test",
  nombres_no_permitidos: "",

  didInsertElement() {
    let nombres_de_sensores = this.sensores.map(e => e.nombre);
    nombres_de_sensores.removeObject(this.valor_inicial);
    this.set("nombreSugerido", this.valor_inicial);
    this.set("nombres_no_permitidos", nombres_de_sensores);

    later(this, this.hacer_foco, 1);
  },

  hacer_foco() {
    this.element.getElementsByTagName("input")[0].focus();
    this.element.getElementsByTagName("input")[0].select();
  },

  invalido_por_duplicado: computed("nombreSugerido", function() {
    return this.nombres_no_permitidos.indexOf(this.nombreSugerido) > -1;
  }),

  invalido_por_vacio: computed("nombreSugerido", function() {
    return this.nombreSugerido.length < 1;
  }),

  invalido_por_caracteres: computed("nombreSugerido", function() {
    return !/^[a-zA-Z_][0-9a-zA-Z_]+$/.test(this.nombreSugerido);
  }),

  invalido: computed("invalido_por_caracteres", "invalido_por_vacio", "invalido_por_duplicado", function() {
    return this.invalido_por_caracteres || this.invalido_por_vacio || this.invalido_por_duplicado;
  }),

  actions: {
    confirmar() {
      if (this.invalido) {
        return;
      }

      this.cuandoCambia(this.nombreSugerido);
      this.dd.actions.close();
    }
  }
});
