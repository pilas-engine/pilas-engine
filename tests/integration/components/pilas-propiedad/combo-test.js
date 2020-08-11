import EmberObject from "@ember/object";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas propiedad/combo", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    let objeto = EmberObject.create({ figura: "circulo" });
    let propiedad = {
      tipo: "combo",
      propiedad: "figura",
      opciones: [{
          valor: "",
          texto: "ninguna"
        },
        {
          valor: "circulo",
          texto: "círculo"
        },
        {
          valor: "rectangulo",
          texto: "rectángulo"
        }
      ]
    };

    this.set("propiedad", propiedad);
    this.set("objeto", objeto);

    await render(hbs `{{pilas-propiedad/combo objeto=objeto propiedad=propiedad opciones=propiedad.opciones}}`);

    assert.dom("select option:checked").hasText("círculo");
  });
});