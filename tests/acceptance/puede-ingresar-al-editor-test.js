import { test } from "qunit";
import moduleForAcceptance from "pilas-engine/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | puede ingresar al editor");

const PAUSA = 2;

test("puede ingresar a la pantalla principal", async function(assert) {
  await visit("/");

  assert.dom("#pilas-logo").exists();
  assert.equal(currentURL(), "/");

  await pulsar("Abrir el editor");
  assert.equal(currentURL(), "/editor");

  await esperarElemento("a#ejecutar");

  await pulsar("Ejecutar");
  await esperar(PAUSA);

  await pulsar("Detener");
  await esperar(PAUSA);

  await pulsar("Ejecutar");
  await esperar(PAUSA);

  await pulsar("Pausar");
  await esperar(PAUSA);

  await pulsar("Detener");
  await esperar(PAUSA);

  await pulsar("Volver");
  assert.equal(currentURL(), "/");
});
