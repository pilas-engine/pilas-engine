import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | cambiar transparencia", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      let actor = pilas.actores.aceituna(0, 0);
      actor.transparencia = 50;
      assert.equal(actor.transparencia, 50);
    });

    this.set("cuandoTerminaLaEspera", pilas => {
      assert.equal(pilas.obtener_cantidad_de_actores(), 1);
      assert.equal(pilas.obtener_actores()[0].transparencia, 50);
      done();
    });

    await render(
      hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`
    );
  });
});
