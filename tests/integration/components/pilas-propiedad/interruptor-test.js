import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('pilas-propiedad/interruptor', 'Integration | Component | pilas propiedad/interruptor', {
  integration: true
});

test('it renders', function(assert) {
  let objeto = Ember.Object.create({ invertir: true });
  let propiedad = {
    tipo: "interruptor",
    propiedad: "invertir",
  };

  this.set("propiedad", propiedad);
  this.set("objeto", objeto);


  this.render(hbs`
    {{pilas-propiedad/interruptor objeto=objeto
      propiedad=propiedad
    }}
    `);

  assert.equal(this.$().text().trim(), 'invertir');

});
