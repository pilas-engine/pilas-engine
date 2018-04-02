import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | contar actores", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("espera", 2);
  this.set("codigo", ``);

  this.set("cuandoInicia", pilas => {
    pilas.actores.caja(100, 200);
  });

  this.set("cuandoTerminaLaEspera", pilas => {
    assert.equal(pilas.obtener_cantidad_de_actores(), 1);
    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
});
