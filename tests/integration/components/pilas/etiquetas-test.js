import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas", "Integration | Pilas | etiquetas", {
  integration: true
});

test("it renders", function(assert) {
  const done = assert.async();

  this.set("espera", 2);
  this.set("codigo", ``);

  let actor_caja = null;
  let actor_actor = null;
  let actor_demo = null;

  this.set("cuandoInicia", pilas => {
    actor_caja = pilas.actores.caja(100, 200);
    actor_actor = pilas.actores.actor(0, 0);
    actor_demo = pilas.actores.actor(10, 0);
    actor_demo.etiqueta = "personalizada";
  });

  this.set("cuandoTerminaLaEspera", () => {
    assert.equal(actor_caja.etiqueta, "caja");
    assert.equal(actor_actor.etiqueta, "actor");
    assert.equal(actor_demo.etiqueta, "personalizada");
    done();
  });

  this.render(hbs`{{pilas-test cuandoInicia=cuandoInicia codigo=codigo espera=espera cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
});
