import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | obtener números aleatorios", function(hooks) {
  setupRenderingTest(hooks);

  test("puede calcular números aleatorios", async function(assert) {
    const done = assert.async();

    this.set("cuandoInicia", pilas => {
      for (let i = 0; i < 30; i++) {
        let numero = pilas.azar(0, 10);
        assert.ok(
          0 <= numero <= 10,
          "El número aleatorio entre 0 y 10 incluye los bordes"
        );
      }

      let numero = pilas.azar(2, 2);
      assert.equal(
        numero,
        2,
        "Si coinciden los extremos retorna el mismo número"
      );

      assert.throws(
        function() {
          pilas.azar(100, -100);
        },
        /Rango inválido/,
        "Muestra error de rango inválido"
      );

      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
  });
});
