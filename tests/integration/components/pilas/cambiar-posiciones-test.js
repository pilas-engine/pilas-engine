import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | cambiar posiciones", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("espera", 2);
  this.set("codigo", ``);

  this.set("cuandoInicia", pilas => {
    let actor = pilas.actores.aceituna(0, 0);

    let actores = pilas.obtener_actores_en(0, 0);
    assert.equal(actores.length, 1, "Tiene que haber un actor");

    actores = pilas.obtener_actores_en(100, 100);
    assert.equal(actores.length, 0, "En esta posición no tiene que haber ni un solo actor");
    window["actor"] = actor;
  });

  this.set("cuandoTerminaLaEspera", pilas => {
    assert.equal(pilas.obtener_cantidad_de_actores(), 1);
    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
});
