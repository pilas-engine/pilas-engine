import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | helper-animacion", function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test("it renders", async function(assert) {
    this.set("inputValue", "caminar");

    await render(hbs`{{helper-animacion inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'this.animacion = "caminar";');
  });
});
