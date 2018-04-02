import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | cambiar centros", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("espera", 2);
  this.set("codigo", ``);

  this.set("cuandoInicia", pilas => {
    let actor = pilas.actores.aceituna(0, 0);

    actor.centro_x = 1;
    actor.centro_y = 0;

    assert.equal(actor.centro_x, 1);
    assert.equal(actor.centro_y, 0);

    actor.centro_x = "centro";
    assert.equal(actor.centro_x, 0.5);

    actor.centro_x = "izquierda";
    assert.equal(actor.centro_x, 0);

    actor.centro_x = "derecha";
    assert.equal(actor.centro_x, 1);

    actor.centro_y = "medio";
    assert.equal(actor.centro_y, 0.5);

    actor.centro_y = "arriba";
    assert.equal(actor.centro_y, 0);

    actor.centro_y = "abajo";
    assert.equal(actor.centro_y, 1);
  });

  this.set("cuandoTerminaLaEspera", () => {
    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
});
