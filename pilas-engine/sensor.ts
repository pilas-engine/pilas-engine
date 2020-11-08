class Sensor {
  private _figura;

  constructor(figura) {
    this._figura = figura;
  }

  get colisiones() {
    return this._figura.colisiones;
  }

  colisiones_con_la_etiqueta(etiqueta: string) {
    return this._figura.colisiones.filter((actor: Actor) => actor.tiene_etiqueta(etiqueta));
  }

  colisiona_con_etiqueta(etiqueta: string) {
    if (this._figura.colisiones.find((actor: Actor) => actor.tiene_etiqueta(etiqueta))) {
      return true;
    } else {
      return false;
    }
  }

  get cantidad_de_colisiones() {
    return this._figura.colisiones.length;
  }

  cantidad_de_colisiones_con_la_etiqueta(etiqueta: string) {
    return this.colisiones_con_la_etiqueta(etiqueta).length;
  }
}
