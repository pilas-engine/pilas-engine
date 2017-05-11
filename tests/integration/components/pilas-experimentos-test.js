import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-experimentos', 'Integration | Component | pilas experimentos', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-experimentos}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-experimentos}}
      template block text
    {{/pilas-experimentos}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
