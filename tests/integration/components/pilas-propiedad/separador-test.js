import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-propiedad/separador", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("propiedad", { nombre: "Título" });
    await render(hbs`{{pilas-propiedad/separador propiedad=propiedad}}`);

    assert.equal(this.element.textContent.trim(), "Título:");
  });
});
