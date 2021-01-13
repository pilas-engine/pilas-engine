import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-mensaje-exportador", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("mensaje1", { mensaje: "Mensaje de prueba", link: "1" });
    await render(hbs`{{pilas-mensaje-exportador mensaje=mensaje1}}`);
    let contenido = this.element.textContent.replace(/[\n\r]+/g, "");
    assert.equal(
      contenido
        .replace("1", "")
        .replace("1", "")
        .replace(/\s{2,10}/g, "")
        .trim(),
      "Mensaje de prueba"
    );

    this.set("mensaje2", { codigo: "demo", codigoCompleto: "" });
    await render(hbs`{{pilas-mensaje-exportador mensaje=mensaje2}}`);
    assert.equal(this.element.textContent.trim(), "demo");
  });
});
