import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-boton-interruptor', 'Integration | Component | pilas boton interruptor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-boton-interruptor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-boton-interruptor}}
      template block text
    {{/pilas-boton-interruptor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
