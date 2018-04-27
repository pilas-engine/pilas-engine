import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas boton", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("demo", function() {});

    await render(hbs`{{pilas-boton accion=demo texto="Ejemplo"}}`);
    assert.equal(
      find('*').textContent
        .trim(),
      "Ejemplo"
    );
  });
});
