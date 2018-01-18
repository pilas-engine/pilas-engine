import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-contenido-de-log', 'Integration | Component | pilas contenido de log', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-contenido-de-log}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-contenido-de-log}}
      template block text
    {{/pilas-contenido-de-log}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
