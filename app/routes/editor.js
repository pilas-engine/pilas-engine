import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      titulo: "demo",
      escenas: [
        Ember.Object.create({
          nombre: "escena principal",
          id: 1,
          actores: []
        }),
        Ember.Object.create({
          nombre: "Otra escena",
          id: 2,
          actores: []
        })
      ]
    });
  }
});
