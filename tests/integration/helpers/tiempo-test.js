
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tiempo', 'helper:tiempo', {
  integration: true
});

test('it renders', function(assert) {
  this.set('inputValue', '88');
  this.render(hbs`{{tiempo inputValue}}`);
  assert.equal(this.$().text().trim(), '00:01:28');
});
