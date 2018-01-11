import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-celda-de-actor-skeleton', 'Integration | Component | pilas celda de actor skeleton', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-celda-de-actor-skeleton}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-celda-de-actor-skeleton}}
      template block text
    {{/pilas-celda-de-actor-skeleton}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
