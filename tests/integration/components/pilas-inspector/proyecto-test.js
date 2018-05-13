import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-inspector/proyecto", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("instancia_seleccionada", {
      ancho: 640,
      alto: 480
    });

    await render(hbs`{{pilas-inspector/proyecto
      instancia_seleccionada=instancia_seleccionada
    }}`);

    assert.ok(this.element.textContent.includes("640"));
    assert.ok(this.element.textContent.includes("480"));
  });
});
