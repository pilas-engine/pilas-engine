import { currentURL, visit } from "@ember/test-helpers";
import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import pulsar from "pilas-engine/tests/helpers/pulsar";
import esperar from "pilas-engine/tests/helpers/esperar";
//import esperarElemento from "pilas-engine/tests/helpers/esperar-elemento";

module("Acceptance | puede visitar cada uno de los ejemplos", function(hooks) {
  setupApplicationTest(hooks);

  const PAUSA = 3;

  test("puede visitar cada uno de los ejemplos", async function(assert) {
    await visit("/");

    assert.dom("#pilas-logo").exists();
    assert.equal(currentURL(), "/", "Está en la ruta principal");

    await pulsar("Ver ejemplos");
    assert.equal(currentURL(), "/ejemplos", "Ingresó en la sección de ejemplos");

    await esperar(PAUSA);

    let items = document.querySelectorAll("a.ejemplo");

    assert.equal(1, 1, `Prueba los ${items.length} ejemplos:`);

    for (let i = 0; i < items.length; i++) {
      let link = items[i].getAttribute("href");

      assert.equal(1, 1, `Probando ejemplo ${i}/${items.length}`);
      await visit(link);
      await esperar(PAUSA);
    }
  });
});
