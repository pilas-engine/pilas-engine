import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-boton-eliminar-con-confirmacion', 'Integration | Component | pilas boton eliminar con confirmacion', {
  integration: true
});

test('it renders', function(assert) {
  this.set('accion', () => {

  });

  this.render(hbs`{{pilas-boton-eliminar-con-confirmacion accion=accion}}`);
  assert.ok(this.$().text());

  this.$('#boton-eliminar').click()
  assert.equal(this.$('#titulo').text(), '¿Realmente quieres eliminar la escena?');
});
