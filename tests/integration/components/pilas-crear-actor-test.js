import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas crear actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-crear-actor}}`);
    assert.dom("*").hasText("Crear actor");

    await render(hbs`{{pilas-crear-actor cuandoQuiereCrearActor=f modalVisible=true}}`);
    assert.dom("#dialogoCrearActor #titulo").hasText("Agregar un actor a la escena");
  });
});
