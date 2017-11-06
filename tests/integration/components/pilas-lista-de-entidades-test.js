import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-lista-de-entidades', 'Integration | Component | pilas lista de entidades', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-lista-de-entidades}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-lista-de-entidades}}
      template block text
    {{/pilas-lista-de-entidades}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
