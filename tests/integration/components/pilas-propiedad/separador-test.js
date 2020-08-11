import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas-propiedad/separador", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    this.set("propiedad", { nombre: "Título" });
    await render(hbs `{{pilas-propiedad/separador etiqueta="name" propiedad=propiedad}}`);

    assert.equal(this.element.textContent.trim(), "Nombre:");
  });
});