import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas crear actor", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    await render(hbs `
        <div id="modal"></div>
        {{pilas-crear-actor}}
    `);
    assert.dom("*").hasText("Crear actor");

    await render(hbs `
      <div id="modal"></div>
      {{pilas-crear-actor cuandoQuiereCrearActor=f modalVisible=true}}
    `);
    assert.dom("#dialogoCrearActor #titulo").hasText("Crear actor");
  });
});