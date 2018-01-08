import { test } from "qunit";
import moduleForAcceptance from "pilas-engine/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | puede ingresar al editor");

const TIEMPO_DE_CARGA = 4;
const PAUSA = 2;

test("puede ingresar a la pantalla principal", async function(assert) {
  await visit("/");

  assert.dom("#pilas-logo").exists();
  assert.equal(currentURL(), "/");

  await esperar(TIEMPO_DE_CARGA);
  await click("#abrir-editor");
  assert.equal(currentURL(), "/editor");

  await esperar(PAUSA);

  await click("#ejecutar");
  await esperar(PAUSA);

  await click("#detener");
  await esperar(PAUSA);

  await click("#ejecutar");
  await esperar(PAUSA);

  await click("#pausar");
  await esperar(PAUSA);

  await click("#detener");
  await esperar(PAUSA);
});
