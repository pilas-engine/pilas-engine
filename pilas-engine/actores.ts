class Actores {
  pilas: Pilas;

  constructor(pilas) {
    this.pilas = pilas;
  }

  Caja(x, y) {
    let actor = new Caja(this.pilas, x, y, "caja");

    this.pilas.game.world.add(actor.sprite);
    actor.sprite["actor"] = actor;

    return actor;
  }

  Aceituna(x: number = 0, y: number = 0) {
    let actor = new Aceituna(this.pilas, x, y);

    this.pilas.game.world.add(actor.sprite);
    actor.sprite["actor"] = actor;

    return actor;
  }
}
