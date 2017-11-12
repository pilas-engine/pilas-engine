import Ember from "ember";

export function initialize() {
  Ember.Inflector.inflector.irregular("actor", "actores");
  Ember.Inflector.inflector.irregular("escena", "escenas");
  Ember.Inflector.inflector.irregular("proyecto", "proyectos");
}

export default {
  name: "inflections",
  before: "ember-cli-mirage",
  initialize: initialize
};
