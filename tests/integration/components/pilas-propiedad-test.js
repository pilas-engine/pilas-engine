import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-propiedad/numero', 'Integration | Component | pilas propiedad', {
  integration: true
});

test('it renders', function(assert) {
  let propiedad_rotacion = { propiedad: "rotacion", incremento: 10 };
  let objeto = EmberObject.create({
    x: 0,
    y: 0,
    rotacion: 100
  });

  this.set('propiedad', propiedad_rotacion);
  this.set('objeto', objeto);

  this.render(hbs`{{pilas-propiedad/numero objeto=objeto propiedad=propiedad}}`);
  assert.ok(this.$().text().trim(), 'tiene que tener texto');
  assert.ok(this.$().text().trim().indexOf('100') > -1, 'debe aparecer el valor de la propiedad');
  assert.ok(this.$().text().trim().indexOf('rotacion') > -1, 'debe aparecer la etiqeuta de la propiedad');
});
