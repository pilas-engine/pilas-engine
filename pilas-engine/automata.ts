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
    this.actor.cuadro_del_estado = 0;
  }

  iniciar_estado(nombre: string) {
    this.actor[`${nombre}_iniciar`]();
  }

  actualizar() {
    this.actor.cuadro_del_estado += 1;

    if (this._estado !== "") {
      this.actor[`${this._estado}_actualizar`]();

      if (this.actor.cuadro_del_estado > 0 && this.actor.cuadro_del_estado % 60 === 0) {
        let segundos_transcurridos = Math.floor(this.actor.cuadro_del_estado / 60);
        this.cada_segundo(segundos_transcurridos);
      }
    }
  }

  cuando_finaliza_animacion(nombre: string) {
    if (this._estado !== "") {
      let metodo = this.actor[`${this._estado}_cuando_finaliza_animacion`];

      if (metodo) {
        metodo.call(this.actor, nombre);
      }
    }
  }

  cada_segundo(segundos_transcurridos: number) {
    if (this._estado !== "") {
      let metodo = this.actor[`${this._estado}_cada_segundo`];

      if (metodo) {
        metodo.call(this.actor, segundos_transcurridos);
      }
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
