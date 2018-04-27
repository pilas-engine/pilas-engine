import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas boton duplicar actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("accion", function() {});

    await render(hbs`{{pilas-boton-duplicar-actor accion=accion}}`);

    assert.ok(find('*').textContent);
  });
});
