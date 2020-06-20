import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-panel-de-escenas/item-carpeta", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("carpeta", { id: 1, nombre: "demo", abierta: false });
    await render(hbs`{{pilas-panel-de-escenas/item-carpeta carpeta=carpeta}}`);
    assert.ok(this.element.textContent.trim());
  });
});
