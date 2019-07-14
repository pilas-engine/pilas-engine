import Component from "@ember/component";

export default Component.extend({
  tagName: "span",

  classNames: ["sprite"],
  classNameBindings: ["icono", "conSeparacion:mr2", "class"],
  conSeparacion: false
});
