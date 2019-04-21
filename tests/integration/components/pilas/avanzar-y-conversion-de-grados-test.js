import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | avanzar y conversion de grados", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("espera", 2);
    this.set("codigo", ``);

    this.set("cuandoInicia", pilas => {
      let actor = pilas.actores.aceituna(0, 0);

      assert.equal(actor.y, 0, "Está en la posición inicial.");

      actor.avanzar(90);
      assert.equal(actor.y, 1, "Avanzó un solo pixel.");

      actor.avanzar(0, 50);
      assert.equal(actor.y, 1, "Mantiene y=1.");
      assert.equal(
        actor.x,
        50,
        "Avanzó 50 pixeles porque se movió en el ángulo 0."
      );

      assert.equal(pilas.utilidades.convertir_radianes_a_angulos(0), 0);
      assert.equal(pilas.utilidades.convertir_radianes_a_angulos(Math.PI), 180);
      assert.equal(
        pilas.utilidades.convertir_angulo_a_radianes(90),
        Math.PI / 2
      );
      assert.equal(pilas.utilidades.convertir_angulo_a_radianes(180), Math.PI);
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
