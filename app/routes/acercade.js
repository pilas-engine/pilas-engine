import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      codigo: '// demo ...',
    };
  },

  actions: {
    cuandoCambiaElCodigo(codigo) {
      console.log(codigo);
    }
  }
});
