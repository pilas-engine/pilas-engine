import { alias } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  modalVisible: false,
  actores: service(),
  bus: service(),
  tarea: alias("actores.tareaConseguirActores"),

  didInsertElement() {
    this.bus.on("abrir_dialogo_para_crear_actor", this, "abrir_dialogo_desde_señal");
  },

  willDestroyElement() {
    this.bus.off("abrir_dialogo_para_crear_actor", this, "abrir_dialogo_desde_señal");
  },

  abrir_dialogo_desde_señal() {
    this.send("abrirModal");
  },

  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    abrirModal() {
      this.set("modalVisible", true);
    }
  }
});
