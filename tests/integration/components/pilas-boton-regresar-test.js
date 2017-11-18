import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-boton-regresar', 'Integration | Component | pilas boton regresar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-boton-regresar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-boton-regresar}}
      template block text
    {{/pilas-boton-regresar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
