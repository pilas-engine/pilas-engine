import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-propiedad/combo', 'Integration | Component | pilas propiedad/combo', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-propiedad/combo}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-propiedad/combo}}
      template block text
    {{/pilas-propiedad/combo}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
