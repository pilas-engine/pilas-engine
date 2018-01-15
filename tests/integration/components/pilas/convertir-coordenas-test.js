import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | convertir coordenadas", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("cuandoInicia", pilas => {
    let coordenada = {};

    coordenada = pilas.convertir_coordenada_de_pilas_a_phaser(0, 0);
    assert.equal(coordenada.x, 300);
    assert.equal(coordenada.y, 300);

    coordenada = pilas.convertir_coordenada_de_phaser_a_pilas(300, 300);
    assert.equal(coordenada.x, 0);
    assert.equal(coordenada.y, 0);

    coordenada = pilas.convertir_coordenada_de_pilas_a_phaser(0, -200);
    assert.equal(coordenada.x, 300);
    assert.equal(coordenada.y, 500);

    coordenada = pilas.convertir_coordenada_de_phaser_a_pilas(300, 500);
    assert.equal(coordenada.x, 0);
    assert.equal(coordenada.y, -200);

    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
});
