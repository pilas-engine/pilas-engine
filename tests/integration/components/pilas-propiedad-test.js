import EmberObject from "@ember/object";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas propiedad", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    let propiedad_rotacion = { propiedad: "rotacion", incremento: 10 };
    let objeto = EmberObject.create({
      x: 0,
      y: 0,
      rotacion: 100
    });

    this.set("propiedad", propiedad_rotacion);
    this.set("objeto", objeto);

    await render(
      hbs`{{pilas-propiedad/numero objeto=objeto propiedad=propiedad}}`
    );
    assert.ok(find("*").textContent.trim(), "tiene que tener texto");
    assert.ok(
      find("*")
        .textContent.trim()
        .indexOf("100") > -1,
      "debe aparecer el valor de la propiedad"
    );
    assert.ok(
      find("*")
        .textContent.trim()
        .indexOf("Rotacion") > -1,
      "debe aparecer la etiqueta de la propiedad"
    );
  });
});
