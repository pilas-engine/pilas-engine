import DS from "ember-data";

export default DS.Model.extend({
  tipo: DS.attr("string"),
  x: DS.attr("number"),
  y: DS.attr("number"),
  escalaX: DS.attr("number"),
  escalaY: DS.attr("number"),
  rotacion: DS.attr("number"),
  transparencia: DS.attr("number"),
  imagen: DS.attr("string"),
  nombre: DS.attr("string"),
  escena: DS.belongsTo("escena")
});
