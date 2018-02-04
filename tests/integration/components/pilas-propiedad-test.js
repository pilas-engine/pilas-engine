import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('pilas-propiedad', 'Integration | Component | pilas propiedad', {
  integration: true
});

test('it renders', function(assert) {
  let propiedad_rotacion = { propiedad: "rotacion", incremento: 10 };
  let objeto = Ember.Object.create({
    x: 0,
    y: 0,
    rotacion: 100
  });

  this.set('propiedad', propiedad_rotacion);
  this.set('objeto', objeto);

  this.render(hbs`{{pilas-propiedad objeto=objeto propiedad=propiedad}}`);
  assert.ok(this.$().text().trim(), 'tiene que tener texto');
  assert.ok(this.$().text().trim().indexOf('100') > -1, 'debe aparecer el valor de la propiedad');
  assert.ok(this.$().text().trim().indexOf('rotacion') > -1, 'debe aparecer la etiqeuta de la propiedad');
});
