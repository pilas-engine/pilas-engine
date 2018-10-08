import Component from "@ember/component";
import { computed } from '@ember/object';

export default Component.extend({
  tagName: "",
  s: 14,
  size: computed('s', function() {
    return `${this.s}px`;
  }),
});
