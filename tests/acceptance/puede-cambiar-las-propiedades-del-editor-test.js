import { currentURL, visit } from "@ember/test-helpers";
import $ from "jquery";
import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import pulsar from "../helpers/pulsar";
import esperarElemento from "../helpers/esperar-elemento";
import esperar from "../helpers/esperar";

module("Acceptance | puede ingresar al editor", function(hooks) {
  setupApplicationTest(hooks);

  const PAUSA = 2;

  test("puede cambiar las propiedades del editor", async function(assert) {
    await visit("/");

    await pulsar("Abrir el editor");
    assert.equal(currentURL(), "/editor", "accede al editor correctamente");

    await esperarElemento("a#ejecutar");

    $("[data-test='panel-derecho']").click();

    await esperar(PAUSA);
    $("[data-test='boton-preferencias-del-editor']").click();

    await esperar(PAUSA);
    $("[data-test='boton-modo-oscuro']").click();

    await esperar(PAUSA);
    $("[data-test='boton-modo-vim']").click();

    for (let i = 0; i < 3; i++) {
      await esperar(PAUSA / 5);
      $("[data-test='boton-disminuir']").click();
    }

    for (let i = 0; i < 5; i++) {
      await esperar(PAUSA / 5);
      $("[data-test='boton-aumentar']").click();
    }
  });
});
