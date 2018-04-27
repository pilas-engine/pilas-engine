import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  style: computed("ancho", "alto", function() {
    let { ancho, alto } = this;

    if (!isNaN(ancho)) {
      ancho += "px";
    }

    if (!isNaN(alto)) {
      alto += "px";
    }

    return htmlSafe(`width: ${ancho}; height: ${alto};`);
  })
});
