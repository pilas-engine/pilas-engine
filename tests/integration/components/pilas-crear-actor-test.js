import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas crear actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-crear-actor}}`);
    assert.equal(find("*").textContent.trim(), "Crear actor");

    await render(hbs`{{pilas-crear-actor cuandoQuiereCrearActor=f modalVisible=true}}`);
    assert.equal(find("#dialogoCrearActor #titulo").textContent.trim(), "Agregar un actor a la escena");
  });
});
