import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | habilidades", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 3);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      let actor = pilas.actores.aceituna(0, 0);
      actor.imagen = "imagenes:enemigos/fantasma_asustando";
      actor.aprender("oscilar verticalmente");
      actor.aprender("oscilar rotacion");
      actor.aprender("oscilar transparencia");

      assert.equal(actor._habilidades.length, 3);
      actor.olvidar("oscilar transparencia");
      assert.equal(actor._habilidades.length, 2);
    });

    this.set("cuandoTerminaLaEspera", pilas => {
      let actor = pilas.obtener_actor_por_nombre("aceituna");
      actor.aprender("oscilar transparencia");
      assert.equal(actor._habilidades.length, 3);
      assert.equal(pilas.obtener_cantidad_de_actores(), 1);
      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
  });
});
