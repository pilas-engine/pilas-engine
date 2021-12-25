import Component from '@ember/component';
import { later } from "@ember/runloop";

export default Component.extend({
  mostrar_ventana: false,
  invalido: false,
  classNames: ['relative'],

  hacer_foco() {
    let input = this.element.getElementsByTagName("input")[0]

    input.focus();
    input.select();
  },

  sanitizar_etiqueta(etiqueta) {
    etiqueta = etiqueta.replace(/ /gim,"-");
    etiqueta = etiqueta.replace(/[^a-z0-9áéíóúñü\.,_-]/gim,"");
    return etiqueta.trim().toLowerCase();
  },

  actions: {
    eliminar(etiqueta) {
      let etiquetas = [...this.valor];
      etiquetas.removeObject(etiqueta);
      this.cuandoCambia(etiquetas);
    },

    mostrar() {
      this.set("mostrar_ventana", true);
      later(this, this.hacer_foco, 1);
    },

    ocultar() {
      this.set("mostrar_ventana", false);
    },

    confirmar() {
      if (this.valor.indexOf(this.etiqueta) == -1) {
        let nueva_etiqueta = this.sanitizar_etiqueta(this.etiqueta);
        let etiquetas = [...this.valor, nueva_etiqueta];
        this.cuandoCambia(etiquetas);
      }

      this.send("ocultar");
      this.set("etiqueta", "");
    }
  }
});
