import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, findAll } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas celda de actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("actor", {
      nombre: "aceituna",
      imagen: "aceituna"
    });

    this.set("f", function() {});

    await render(
      hbs`{{pilas-celda-de-actor actor=actor cuandoQuiereCrearActor=f}}`
    );
    assert.ok(findAll("div.sprite").length, 1);
  });
});
