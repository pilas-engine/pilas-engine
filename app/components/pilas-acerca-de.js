import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  intl: service(),
  parrafos: computed('intl.locale', function() {
    return this.intl.t('about.text').split("\n\n");
  })
});