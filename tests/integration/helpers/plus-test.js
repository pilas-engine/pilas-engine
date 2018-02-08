
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plus', 'helper:plus', {
  integration: true
});

test('it renders', function(assert) {
  this.set('inputValue', '2');
  this.render(hbs`{{plus inputValue}}`);
  assert.equal(this.$().text().trim(), '3');
});
