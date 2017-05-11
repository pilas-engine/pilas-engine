class Actores {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    // Alias de los métodos.
    this['Aceituna'] = this.aceituna;
  }

  aceituna(x: number = 0, y: number = 0) {
    let id = this.pilas.crear_entidad('MiActor');

    this.pilas.validadores.solo_numero_o_interpolacion(x, 'definir valor inicial de x para el actor');
    this.pilas.validadores.solo_numero_o_interpolacion(y, 'definir valor inicial de y para el actor');

    this.pilas.agregar_componente(id, 'posicion', {x, y});
    this.pilas.agregar_componente(id, 'apariencia', {imagen: 'ember'});
    this.pilas.agregar_componente(id, this.pilas.componentes.etiquetable);

    return this.pilas.crear_actor_desde_entidad(id);
  }

}
