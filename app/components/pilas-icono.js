import Component from '@ember/component';

export default Component.extend({
  tagName: "span",

  classNames: ["css-icon"],
  classNameBindings: ["icono", "conSeparacion:mr2"],
  conSeparacion: false
});
