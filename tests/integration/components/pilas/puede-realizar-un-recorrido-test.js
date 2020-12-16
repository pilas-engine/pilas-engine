import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | puede realizar un recorrido", function(hooks) {
  setupRenderingTest(hooks);

  test("puede realizar un recorrido", async function(assert) {
    const done = assert.async();
    let actor = null;

    this.set("cuandoInicia", pilas => {
      actor = pilas.actores.aceituna();
      actor.imagen = "imagenes:carreras/auto_rojo";

      actor.y = 300;

      actor.hacer_recorrido(
        [
          0,
          0, // a
          0,
          100, // b
          -100,
          100, //c
          100,
          100, //d
          -100,
          100, //e
          -150,
          0, //f
          0,
          0
        ],
        1.8,
        1,
        true
      );
    });

    this.set("cuandoTerminaLaEspera", () => {
      assert.equal(actor.x, 0);
      assert.equal(actor.y, 0);
      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia espera=5 cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
  });
});
