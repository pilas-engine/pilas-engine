import Ember from 'ember';

export default Ember.Component.extend({
  pilas: Ember.inject.service(),

  actions: {
    cuandoCarga(pilas) {
      console.log({pilas});
      pilas.definir_cuadros_por_segundo(60, 10);

      let id = pilas.crear_entidad('MiActor');
      let x = pilas.azar(-100, 100);
      let y = pilas.azar(-100, 100);

      pilas.agregar_componente(id, 'posicion', {x, y});
      pilas.agregar_componente(id, 'apariencia', {imagen: 'ember'});

      console.log({x, y});
    }
  }
});
