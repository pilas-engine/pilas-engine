import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-phaser-experimental', 'Integration | Component | pilas phaser experimental', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-phaser-experimental}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-phaser-experimental}}
      template block text
    {{/pilas-phaser-experimental}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
