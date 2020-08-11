import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import EmberObject from "@ember/object";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas inspector", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    await render(hbs `{{pilas-inspector}}`);
    assert.dom("*").hasText("");

    this.set(
      "instancia_seleccionada",
      EmberObject.create({
        id: 123,
        x: 20,
        y: 30,
        imagen: "demo",
        sensores: []
      })
    );

    this.set("tipo_de_la_instancia_seleccionada", "actor");

    await render(hbs `{{pilas-inspector
      etiqueta="name"
      instancia_seleccionada=instancia_seleccionada
      tipo_de_la_instancia_seleccionada=tipo_de_la_instancia_seleccionada}}`);

    function tiene_texto(t, texto) {
      return t.element.innerHTML.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    }

    assert.ok(tiene_texto(this, "nombre"), "tiene texto nombre");
    assert.ok(tiene_texto(this, "imagen"), "tiene texto imagen");
    assert.ok(tiene_texto(this, "demo"), "tiene texto demo");
    assert.ok(tiene_texto(this, "x"), "tiene texto x");
    assert.ok(tiene_texto(this, "y"), "tiene texto y");
  });
});