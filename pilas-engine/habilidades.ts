class Habilidades {
  pilas: Pilas;
  _habilidades: Array<any>;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this._habilidades = [];
  }

  vincular(nombre: string, objeto: any) {
    this.pilas.eventos.cuando_vincula_habilidad.emitir({nombre, objeto});
    this._habilidades[nombre] = objeto;
  }

}
