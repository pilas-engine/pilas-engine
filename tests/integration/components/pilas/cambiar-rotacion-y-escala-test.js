import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | cambiar rotación y escala", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      let actor = pilas.actores.aceituna(0, 0);

      actor.rotacion = 45;
      assert.equal(Math.round(actor.rotacion), 45, "Tiene que haber un actor.");

      actor.rotacion = 360 + 20;
      assert.equal(Math.round(actor.rotacion), 20, "Un angulo que supera 360 tiene un equivalente.");

      actor.rotacion = 390;
      assert.equal(Math.round(actor.rotacion), 30, "Un angulo de 390 grados tiene un equivalente de 30 grados.");
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
