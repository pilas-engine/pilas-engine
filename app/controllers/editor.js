import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    serializar(model) {
      console.log(JSON.parse(JSON.stringify(model)));
    },
    agregarEscena(model) {
      model.escenas.pushObject({
        nombre: "demo",
        id: 3
      });
    },
    agregarActor(model) {
      model.escenas[0].actores.pushObject(
        Ember.Object.create({
          x: 1,
          y: 30,
          tipo: "actor"
        })
      );
    },
    moverActores(model) {
      model.escenas[0].actores.forEach(actor => {
        actor.set("x", Math.floor(Math.random() * 10));
      });
    },
    cambiarEscena(model) {
      model.escenas[0].set("nombre", "asdasd");
    }
  }
});
