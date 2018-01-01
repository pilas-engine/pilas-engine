import Component from "@ember/component";
import Ember from "ember";

export default Component.extend({
  tagName: "",
  style: Ember.computed("ancho", "alto", function() {
    let { ancho, alto } = this.getProperties("ancho", "alto");
    return Ember.String.htmlSafe(`width: ${ancho}px; height: ${alto}px;`);
  })
});
