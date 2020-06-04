class Sonidos {
  pilas: Pilas;
  _sonidos: [string?];

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this._sonidos = [];
  }

  agregar_sonido(nombre: string) {
    this._sonidos.push(nombre);
  }

  existe_sonido(nombre: string) {
    return this._sonidos.indexOf(nombre) > -1;
  }

  obtener_sonido_con_nombre_similar(nombre: string) {
    return this.pilas.utilidades.obtener_mas_similar(nombre, this._sonidos);
  }

  hay_sonidos_cargados() {
    return this._sonidos.length > 0;
  }
}
