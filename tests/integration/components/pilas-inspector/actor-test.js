import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-inspector/actor", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("instancia_seleccionada", { x: 200, y: 300 });

    await render(hbs`{{pilas-inspector/actor
      instancia_seleccionada=instancia_seleccionada
    }}`);

    assert.ok(this.element.textContent.includes("200"));
    assert.ok(this.element.textContent.includes("300"));
    assert.ok(this.element.textContent.includes("Centro x"));
  });
});
