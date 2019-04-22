import EmberObject from "@ember/object";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas-propiedad/habilidades", function(
  hooks
) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    let objeto = EmberObject.create({ habilidades: [] });
    let propiedad = {
      tipo: "habilidades",
      propiedad: "habilidades"
    };

    this.set("propiedad", propiedad);
    this.set("objeto", objeto);

    await render(hbs`{{pilas-propiedad/habilidades
      objeto=objeto
      propiedad=propiedad}}`);
    assert.ok(this.element);
  });
});
