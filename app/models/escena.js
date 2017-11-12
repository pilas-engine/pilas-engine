import DS from "ember-data";

export default DS.Model.extend({
  nombre: DS.attr("string"),
  actores: DS.hasMany("actor"),
  proyecto: DS.belongsTo("proyecto")
});
