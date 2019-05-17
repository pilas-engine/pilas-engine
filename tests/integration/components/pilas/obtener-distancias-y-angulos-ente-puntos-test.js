import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module(
  "Integration | Pilas | obtener distancias y angulos entre puntos",
  function(hooks) {
    setupRenderingTest(hooks);

    test("puede calcular la distancia entre dos puntos", async function(assert) {
      const done = assert.async();

      this.set("cuandoInicia", pilas => {
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 0, 0, 0), 0);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 10, 0, 10), 0);
        assert.equal(pilas.obtener_distancia_entre_puntos(-10, 0, -10, 0), 0);

        assert.equal(pilas.obtener_distancia_entre_puntos(0, 10, 0, 0), 10);
        assert.equal(pilas.obtener_distancia_entre_puntos(10, 0, 0, 0), 10);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 0, -10, 0), 10);
        assert.equal(pilas.obtener_distancia_entre_puntos(0, 0, 0, 10), 10);

        let a = pilas.actores.aceituna();
        let b = pilas.actores.aceituna();
        b.x = 100;

        assert.equal(pilas.obtener_distancia_entre_actores(a, b), 100);

        done();
      });

      await render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
    });
  }
);
