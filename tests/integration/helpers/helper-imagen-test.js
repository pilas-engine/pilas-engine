import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | helper-imagen", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("inputValue", "imagenes:aliens/alien_azul");

    await render(hbs`{{helper-imagen inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'this.imagen = "imagenes:aliens/alien_azul";');
  });
});
