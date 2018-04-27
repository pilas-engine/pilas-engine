import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | etiquetas", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    let actor_caja = null;
    let actor_actor = null;
    let actor_demo = null;

    this.set("cuandoInicia", pilas => {
      actor_caja = pilas.actores.caja(100, 200);
      actor_actor = pilas.actores.actor(0, 0);
      actor_demo = pilas.actores.actor(10, 0);
      actor_demo.etiqueta = "personalizada";
    });

    this.set("cuandoTerminaLaEspera", () => {
      assert.equal(actor_caja.etiqueta, "caja");
      assert.equal(actor_actor.etiqueta, "actor");
      assert.equal(actor_demo.etiqueta, "personalizada");
      done();
    });

    await render(
      hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`
    );
  });
});
