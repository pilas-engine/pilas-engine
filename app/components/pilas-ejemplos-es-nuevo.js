import Component from "@ember/component";
import { computed } from "@ember/object";
import config from "../config/environment";

const {
  APP: { version }
} = config;

export default Component.extend({
  esNuevo: computed("ejemplo.desde", function() {
    if (!this.ejemplo || !this.ejemplo.desde) {
      return false;
    }

    let version_actual = version.split("+")[0];

    return this.ejemplo.desde >= version_actual;
  })
});
