import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('boton-ocultar', 'Integration | Component | boton ocultar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{boton-ocultar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#boton-ocultar}}
      template block text
    {{/boton-ocultar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
