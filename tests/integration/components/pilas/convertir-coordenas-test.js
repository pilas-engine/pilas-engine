import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | convertir coordenadas", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    const done = assert.async();

    this.set("cuandoInicia", pilas => {
      let coordenada = {};

      coordenada = pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, 0);
      assert.equal(coordenada.x, 175);
      assert.equal(coordenada.y, 175);

      coordenada = pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(350 / 2, 350 / 2);
      assert.equal(coordenada.x, 0);
      assert.equal(coordenada.y, 0);

      coordenada = pilas.utilidades.convertir_coordenada_de_pilas_a_phaser(0, -200);
      assert.equal(coordenada.x, 175);
      assert.equal(coordenada.y, 200 + 175);

      coordenada = pilas.utilidades.convertir_coordenada_de_phaser_a_pilas(300, 500);
      assert.equal(coordenada.x, -175 + 300);
      assert.equal(coordenada.y, -325);

      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
  });
});
