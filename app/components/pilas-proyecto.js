import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  servicioProyecto: service("proyecto"),

  proyecto: null,
  editor: null,

  didInsertElement() {
    this.servicioProyecto.vincular(this.proyecto, this.editor);
  }
});
