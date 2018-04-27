import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | cambiar centros", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      let actor = pilas.actores.aceituna(0, 0);

      actor.centro_x = 1;
      actor.centro_y = 0;

      assert.equal(actor.centro_x, 1);
      assert.equal(actor.centro_y, 0);

      actor.centro_x = "centro";
      assert.equal(actor.centro_x, 0.5);

      actor.centro_x = "izquierda";
      assert.equal(actor.centro_x, 0);

      actor.centro_x = "derecha";
      assert.equal(actor.centro_x, 1);

      actor.centro_y = "medio";
      assert.equal(actor.centro_y, 0.5);

      actor.centro_y = "arriba";
      assert.equal(actor.centro_y, 0);

      actor.centro_y = "abajo";
      assert.equal(actor.centro_y, 1);
    });

    this.set("cuandoTerminaLaEspera", () => {
      done();
    });

    await render(
      hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`
    );
  });
});
