import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas/puede-crear-actor', 'Integration | Component | pilas/puede crear actor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas/puede-crear-actor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas/puede-crear-actor}}
      template block text
    {{/pilas/puede-crear-actor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
