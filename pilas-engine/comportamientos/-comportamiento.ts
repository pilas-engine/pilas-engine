class Comportamiento {
  pilas: Pilas;
  actor: Actor;

  constructor(pilas: Pilas, actor: Actor) {
    this.pilas = pilas;
    this.actor = actor;
  }

  iniciar(parametros: any) {}

  actualizar(): boolean {
    return false;
  }

  terminar() {}
}
