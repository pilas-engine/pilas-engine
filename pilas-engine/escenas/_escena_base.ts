class EscenaBase {
  actores: Actor[];
  id: number;

  constructor(pilas) {
    this.pilas = pilas;
    this.actores = [];
    this.pilas.utilidades.obtener_id_autoincremental();
  }

  agregar_actor(actor: Actor) {
    this.actores.push(actor);
  }
}
