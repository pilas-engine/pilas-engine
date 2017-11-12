import DS from "ember-data";

export default DS.Model.extend({
  titulo: DS.attr("string"),
  detalle: DS.attr("string"),
  escenas: DS.hasMany("escena")
});
