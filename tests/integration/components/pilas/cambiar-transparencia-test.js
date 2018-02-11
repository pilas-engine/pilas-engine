import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | cambiar transparencia", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("espera", 2);
  this.set("codigo", ``);

  this.set("cuandoInicia", pilas => {
    let actor = pilas.actores.Aceituna(0, 0);
    actor.transparencia = 50;
    assert.equal(actor.transparencia, 50);
  });

  this.set("cuandoTerminaLaEspera", pilas => {
    assert.equal(pilas.obtener_cantidad_de_actores(), 1);
    assert.equal(pilas.obtener_actores()[0].transparencia, 50);
    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
});
