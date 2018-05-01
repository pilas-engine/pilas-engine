import Component from "@ember/component";
import { EKMixin } from "ember-keyboard";
import { getCode } from "ember-keyboard";
import { keyUp } from "ember-keyboard";

export default Component.extend(EKMixin, {
  tagName: "",
  truncate: true,
  class: `
    ba pa2 button
    dib br2
    verdana f6 link pointer
    black bg-animate hover-bg-black-10 b--black-20
    unselectable
  `,
  didInsertElement() {
    if (this.atajo) {
      this.set("keyboardActivated", true);
    }
  },

  cuando_suelta_tecla: Ember.on(keyUp(), function(event) {
    if (this.atajo) {
      if (this.atajo === getCode(event)) {
        this.sendAction("accion");
      }
    }
  }),
  accion: () => {}
});
