import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("helper:tiempo", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("inputValue", "88");
    await render(hbs`{{tiempo inputValue}}`);
    assert.dom("*").hasText("00:01:28");
  });
});
