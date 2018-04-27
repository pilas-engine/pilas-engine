import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | contar actores", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      pilas.actores.caja(100, 200);
    });

    this.set("cuandoTerminaLaEspera", pilas => {
      assert.equal(pilas.obtener_cantidad_de_actores(), 1);
      done();
    });

    await render(
      hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`
    );
  });
});
