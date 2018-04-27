import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | cambiar posiciones", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      let actor = pilas.actores.aceituna(0, 0);

      let actores = pilas.obtener_actores_en(0, 0);
      assert.equal(actores.length, 1, "Tiene que haber un actor");

      actores = pilas.obtener_actores_en(100, 100);
      assert.equal(actores.length, 0, "En esta posición no tiene que haber ni un solo actor");
      window["actor"] = actor;
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
