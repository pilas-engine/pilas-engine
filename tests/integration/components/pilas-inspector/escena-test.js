import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-inspector/escena", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("instancia_seleccionada", {
      nombre: "prueba",
      camara_x: 100,
      camara_y: 200
    });

    await render(hbs`{{pilas-inspector/escena
      instancia_seleccionada=instancia_seleccionada
    }}`);

    assert.ok(this.element.textContent.includes("prueba"));
  });
});
