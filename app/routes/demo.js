import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    let proyecto = {
      entidades: [
        {
          id: "demo-001",
          nombre: "demo",
          tipo: "pelota",
          x: 250,
          y: 50,
          imagen: "pelota",
          centro_x: 30,
          centro_y: 30
        }
      ]
    };

    return proyecto;
  }
});
