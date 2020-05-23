import { computed } from "@ember/object";
import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";
import { observer } from "@ember/object";

export default Component.extend({
  tagName: "",
  modalVisible: false,
  comoCelda: false, // TODO: eliminar una vez que las escenas tengan menú contextual, ahora se deja así porque aún se accede a este componente desde las escenas como un ícono simple.
  modalFixed: false,
  contador: false,
  tiempo: 0,

  idDialogo: computed("tipo", function() {
    return "dialogoEliminar" + this.tipo;
  }),

  lanzar_tarea_si_es_necesario: observer("modalVisible", function() {
    if (this.modalVisible && this.contador) {
      this.modificar_contador.perform();
    }
  }),

  texto_del_boton: computed("tiempo", function() {
    if (this.tiempo > 0) {
      return `Sí (${this.tiempo})`;
    } else {
      return `Sí`;
    }
  }),

  modificar_contador: task(function*() {
    this.set("tiempo", 3);
    console.log(3);
    yield timeout(1000);
    console.log(2);
    this.set("tiempo", 2);
    yield timeout(1000);
    console.log(1);
    this.set("tiempo", 1);
    yield timeout(1000);
    console.log(0);
    this.set("tiempo", 0);
  }),

  actions: {
    ocultar() {
      this.set("modalVisible", false);
    },
    mostrar() {
      this.set("modalVisible", true);
    },
    ocultarEjecutandoAccion() {
      this.send("ocultar");
      this.accion();
    }
  }
});
