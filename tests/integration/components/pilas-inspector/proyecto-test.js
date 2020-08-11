import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas-inspector/proyecto", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    this.set("instancia_seleccionada", {
      ancho: 640,
      alto: 480,
      tamaño: "640x480",
      modo_de_video: "suavizado",
      fps: 60,
      nombre_de_la_escena_inicial: "demo",
      escenas: [{ nombre: "demo" }]
    });

    await render(hbs `{{pilas-inspector/proyecto
      instancia_seleccionada=instancia_seleccionada
      escenas=escenas
    }}`);

    assert.ok(this.element.textContent);
  });
});