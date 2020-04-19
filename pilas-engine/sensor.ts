class Sensor {
  private _figura;

  constructor(figura) {
    this._figura = figura;
  }

  get colisiones() {
    return this._figura.colisiones;
  }

  colisiona_con_etiqueta(etiqueta: string) {
    if (this._figura.colisiones.find(actor => actor.tiene_etiqueta(etiqueta))) {
      return true;
    } else {
      return false;
    }
  }

  get cantidad_de_colisiones() {
    return this._figura.colisiones.length;
  }
}
