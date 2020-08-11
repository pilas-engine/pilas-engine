import EmberObject from "@ember/object";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas propiedad/interruptor", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    let objeto = EmberObject.create({ invertir: true });
    let propiedad = {
      tipo: "interruptor",
      propiedad: "invertir"
    };

    this.set("propiedad", propiedad);
    this.set("objeto", objeto);

    await render(hbs `
      {{pilas-propiedad/interruptor
        etiqueta="nombre"
        objeto=objeto
        propiedad=propiedad
      }}
      `);

    assert.dom("*").hasText("t:nombre:()");
  });
});