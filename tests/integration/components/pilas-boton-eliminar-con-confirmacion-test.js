import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, click, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas boton eliminar con confirmacion", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("accion", () => {});

    await render(
      hbs`{{pilas-boton-eliminar-con-confirmacion tipo='escena' titulo="¿Realmente quieres eliminar la escena?" accion=accion}}`
    );
    assert.ok(find('*').textContent);

    await click("#boton-eliminar-escena");
    assert.dom("#titulo").hasText('Cuidado');
  });
});
