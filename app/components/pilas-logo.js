import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$('img').visibility({
      onTopVisible: () => {
        this.$('img').transition('scale');
      },
    });
  }
});
