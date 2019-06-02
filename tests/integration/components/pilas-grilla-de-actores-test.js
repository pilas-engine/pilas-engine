import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas grilla de actores", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    this.set("actores", [
      {
        nombre: "aceituna",
        imagen: "aceituna",
        tipo: "Aceituna"
      }
    ]);

    this.set("f", function() {});

    await render(hbs`{{pilas-grilla-de-actores actores=actores cuandoQuiereCrearActor=f}}`);

    assert.dom("[test-celda-actor]").hasText("aceituna aceituna");
  });
});
