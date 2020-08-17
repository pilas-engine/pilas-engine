import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas panel de escenas", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    this.set("cuandoSelecciona", () => {});
    await render(hbs`{{pilas-panel-de-escenas cuandoSelecciona=cuandoSelecciona}}`);
    let elemento = find("*");
    assert.ok(elemento.textContent)
  });
});
