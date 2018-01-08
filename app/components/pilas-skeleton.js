import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  tagName: "",
  style: Ember.computed("ancho", "alto", function() {
    let { ancho, alto } = this.getProperties("ancho", "alto");

    if (!isNaN(ancho)) {
      ancho += "px";
    }

    if (!isNaN(alto)) {
      alto += "px";
    }

    return Ember.String.htmlSafe(`width: ${ancho}; height: ${alto};`);
  })
});
