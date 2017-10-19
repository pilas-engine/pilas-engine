import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('panel-ocultable', 'Integration | Component | panel ocultable', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{panel-ocultable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#panel-ocultable}}
      template block text
    {{/panel-ocultable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
