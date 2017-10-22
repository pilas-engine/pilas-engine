import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dialogo-agregar-actor', 'Integration | Component | dialogo agregar actor', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dialogo-agregar-actor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dialogo-agregar-actor}}
      template block text
    {{/dialogo-agregar-actor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
