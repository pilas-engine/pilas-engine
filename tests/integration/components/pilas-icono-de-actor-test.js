import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-icono-de-actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("actor", { imagen: "" });
    await render(hbs`{{pilas-icono-de-actor actor=actor}}`);
    assert.equal(this.element.textContent.trim(), "");
  });
});
