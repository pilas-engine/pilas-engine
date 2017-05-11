import Ember from 'ember';

export default Ember.Component.extend({
  pilas: Ember.inject.service(),

  didInsertElement() {

    this.get('pilas').iniciar();
  },

  didDestroyElement() {
    console.log("Eliminando elemento ...");
  }
});
