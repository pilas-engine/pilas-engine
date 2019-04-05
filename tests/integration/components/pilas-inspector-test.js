import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas inspector", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-inspector}}`);
    assert.dom("*").hasText("");

    this.set("instancia_seleccionada", {
      id: 123,
      x: 20,
      y: 30,
      imagen: "demo"
    });

    this.set("tipo_de_la_instancia_seleccionada", "actor");

    await render(hbs`{{pilas-inspector
      instancia_seleccionada=instancia_seleccionada
      tipo_de_la_instancia_seleccionada=tipo_de_la_instancia_seleccionada}}`);

    function tiene_texto(t, texto) {
      return (
        t
          .$()
          .text()
          .toLowerCase()
          .indexOf(texto.toLowerCase()) > -1
      );
    }

    assert.ok(tiene_texto(this, "nombre"));
    assert.ok(tiene_texto(this, "imagen"));
    assert.ok(tiene_texto(this, "demo"));
    assert.ok(tiene_texto(this, "x"));
    assert.ok(tiene_texto(this, "y"));
  });
});
