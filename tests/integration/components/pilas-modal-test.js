import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas modal", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("visible", false);

    this.set("cerrar", () => {
      this.set("visible", false);
    });

    await render(hbs`
      <div id="modal"></div>
      {{pilas-modal visible=visible  itulo="Demo" alCerrar=cerrar}}
    `);
    assert.dom("*").hasText("");

    this.set("visible", true);

    await render(hbs`
      <div id="modal"></div>
      {{pilas-modal visible=visible titulo="Demo" alCerrar=cerrar}}
    `);
    assert.dom("#titulo").hasText("Demo");

    await click("#cerrar");
    assert.dom("*").hasText("");
  });
});
