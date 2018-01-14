class Actores {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  Caja(x, y) {
    console.log("Creando caja!");
    let actor = new Caja(this.pilas, x, y, "caja");

    this.pilas.game.world.add(actor.sprite);
    actor.sprite["actor"] = actor;

    return actor;
  }
}
