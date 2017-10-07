import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-phaser-experimental', 'Integration | Component | pilas phaser experimental', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{pilas-phaser-experimental}}`);
  assert.ok(this.$().text());
});
