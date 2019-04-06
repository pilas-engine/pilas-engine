class Automata {
  actor: Actor;
  _estado: string;

  constructor(actor: Actor) {
    this.actor = actor;
    this._estado = "";
  }

  get estado() {
    return this._estado;
  }

  set estado(nombre: string) {
    this._estado = nombre;
    this.validar_que_existen_los_metodos_de_estado(nombre);
    this.iniciar_estado(nombre);
  }

  iniciar_estado(nombre: string) {
    this.actor[`${nombre}_iniciar`]();
  }

  actualizar() {
    if (this._estado !== "") {
      this.actor[`${this._estado}_actualizar`]();
    }
  }

  validar_que_existen_los_metodos_de_estado(nombre: string) {
    let nombre_del_metodo_iniciar = `${nombre}_iniciar`;
    let nombre_del_metodo_actualizar = `${nombre}_actualizar`;

    if (!this.actor[nombre_del_metodo_iniciar]) {
      console.log("no hay metodo iniciar");
      throw new Error(`Imposible usar el estado '${nombre}', porque no existe un método llamado '${nombre_del_metodo_iniciar}'`);
    }

    if (!this.actor[nombre_del_metodo_actualizar]) {
      console.log("no hay metodo actualizar");
      throw new Error(`Imposible usar el estado '${nombre}', porque no existe un método llamado '${nombre_del_metodo_actualizar}'`);
    }
  }
}
