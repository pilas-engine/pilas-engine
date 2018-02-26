class EscenaBase {
  pilas: Pilas;
  actores: Actor[];
  id: number;
  camara: Camara;

  constructor(pilas) {
    this.pilas = pilas;
    this.actores = [];
    this.pilas.utilidades.obtener_id_autoincremental();
    this.camara = new Camara(pilas);
    this.pilas.escenas.definir_escena_actual(this);
  }

  agregar_actor(actor: Actor) {
    this.actores.push(actor);
  }
}
