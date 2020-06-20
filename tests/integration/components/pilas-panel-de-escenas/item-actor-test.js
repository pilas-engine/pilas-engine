import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-panel-de-escenas/item-actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("actor", {});
    await render(hbs`{{pilas-panel-de-escenas/item-actor actor=actor}}`);
    assert.equal(this.element.textContent.trim(), "");
  });
});
