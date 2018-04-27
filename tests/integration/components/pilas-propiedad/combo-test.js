import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas propiedad/combo", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    let objeto = EmberObject.create({ figura: "circulo" });
    let propiedad = {
      tipo: "combo",
      propiedad: "figura",
      opciones: [
        {
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

    await render(hbs`{{pilas-propiedad/combo objeto=objeto propiedad=propiedad opciones=propiedad.opciones}}`);

    assert.equal(
      find('select option:checked').textContent
        .trim(),
      "círculo"
    );
  });
});
