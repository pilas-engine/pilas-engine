import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Pilas | obtener actores por etiquetas", function(hooks) {
  setupRenderingTest(hooks);

  test("puede obtener actores por etiquetas", async function(assert) {
    const done = assert.async();

    this.set("cuandoInicia", pilas => {
      let actor1 = pilas.actores.aceituna();
      let actor2 = pilas.actores.aceituna();
      actor1.etiqueta = "aceituna";
      actor2.etiqueta = "aceituna";

      actor1.x = -100;
      actor2.x = 100;

      let actor = pilas.obtener_actor_por_etiqueta("aceituna");
      assert.equal(actor.x, -100);

      let actores = pilas.obtener_todos_los_actores_con_la_etiqueta("aceituna");
      assert.equal(actores.length, 2);

      let vacío = pilas.obtener_todos_los_actores_con_la_etiqueta(
        "etiqueta inexistente"
      );
      assert.equal(vacío.length, 0);

      done();
    });

    await render(hbs`{{pilas-test cuandoInicia=cuandoInicia}}`);
  });
});
