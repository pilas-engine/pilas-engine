import $ from "jquery";
import { test } from "qunit";
import moduleForAcceptance from "pilas-engine/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | puede ingresar al editor");

const PAUSA = 2;

test("puede ingresar al editor y eliminar una escena", async function(assert) {
  await visit("/");

  await pulsar("Abrir el editor");
  assert.equal(currentURL(), "/editor");

  await esperarElemento("a#ejecutar");

  await pulsar("Ejecutar");
  await esperar(PAUSA);

  await pulsar("Detener");
  await esperar(PAUSA);

  assert.equal($("[data-test='nombre-de-escena']").text(), "escena1escena2");

  await click("#boton-eliminar-escena");
  await pulsar("Si");
  assert.equal($("[data-test='nombre-de-escena']").text(), "escena2");
  await esperar(PAUSA);
});
