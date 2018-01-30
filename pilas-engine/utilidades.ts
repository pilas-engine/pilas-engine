class Utilidades {
  pilas: Pilas;
  id: number;

  constructor(pilas) {
    this.pilas = pilas;
    this.id = 1;
  }

  obtener_id_autoincremental() {
    this.id = this.id + 1;
    return this.id;
  }

  acceso_incorrecto(v) {
    console.error(`No se puede definir esta propiedad (valor ${v}) porque es de solo lectura.`);
  }
}
