import { click, currentURL, visit } from "@ember/test-helpers";
import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import pulsar from "../helpers/pulsar";
import esperarElemento from "../helpers/esperar-elemento";
import esperar from "../helpers/esperar";

module("Acceptance | puede ingresar al editor", function(hooks) {
  setupApplicationTest(hooks);

  const PAUSA = 2;

  test("puede ingresar al editor y eliminar una escena", async function(assert) {
    await visit("/");

    await pulsar("Abrir el editor");
    localStorage.removeItem("pilas:proyecto_serializado");
    assert.equal(currentURL(), "/editor", "accede al editor correctamente");

    await esperarElemento("a#ejecutar");

    await pulsar("Ejecutar");
    await esperar(PAUSA);

    await pulsar("Detener");
    await esperar(PAUSA);

    assert.equal(
      document.querySelectorAll("[data-test='nombre-de-escena']").length,
      2,
      "Corrobora que hay dos escenas (escena1 y escena2)"
    );

    await click("#boton-eliminar-escena");
    await pulsar("Sí");

    assert.equal(
      document.querySelectorAll("[data-test='nombre-de-escena']").length,
      1,
      "Quedó una sola escena (escena2)"
    );

    await esperar(PAUSA);
  });
});
