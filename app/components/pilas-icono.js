import Ember from "ember";

export default Ember.Component.extend({
  tagName: "span",

  classNames: ["css-icon"],
  classNameBindings: ["icono", "conSeparacion:mr2"],
  conSeparacion: false
});
