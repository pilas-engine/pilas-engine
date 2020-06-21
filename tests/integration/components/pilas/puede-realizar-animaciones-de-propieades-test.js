import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | puede realizar animación de propiedades", function(hooks) {
  setupRenderingTest(hooks);

  test("puede animar la rotación", async function(assert) {
    const done = assert.async();
    let actor = null;

    this.set("cuandoInicia", pilas => {
      actor = pilas.actores.aceituna();
      actor.imagen = "imagenes:nave/nave_enemiga_2";

      actor.animar().rotar(180);
    });

    this.set("cuandoTerminaLaEspera", () => {
      assert.equal(actor.rotacion, 180);
      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia espera=2 cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
  });

  test("puede animar la escala", async function(assert) {
    const done = assert.async();
    let actor = null;

    this.set("cuandoInicia", pilas => {
      actor = pilas.actores.aceituna();
      actor.imagen = "imagenes:nave/nave_enemiga_2";

      actor
        .animar()
        .escalar_hasta(2)
        .escalar_hasta(1);
    });

    this.set("cuandoTerminaLaEspera", () => {
      assert.equal(actor.escala, 1);
      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia espera=2.5 cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
  });

  test("puede animar la transparencia", async function(assert) {
    const done = assert.async();
    let actor = null;

    this.set("cuandoInicia", pilas => {
      actor = pilas.actores.aceituna();
      actor.imagen = "imagenes:nave/nave_enemiga_2";

      actor
        .animar()
        .ocultar()
        .mostrar();
    });

    this.set("cuandoTerminaLaEspera", () => {
      assert.equal(actor.transparencia, 0);
      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia espera=2.5 cuandoTerminaLaEspera=cuandoTerminaLaEspera}}`);
  });
});
