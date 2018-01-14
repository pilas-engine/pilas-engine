import { test } from "qunit";
import moduleForAcceptance from "pilas-engine/tests/helpers/module-for-acceptance";
import Ember from "ember";

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

  function cambiar_input(valor) {
    Ember.$("input#posicion")
      .val(valor)
      .trigger("input");
    return esperar(0.01);
  }

  for (let i = 140; i >= 0; i -= 5) {
    await cambiar_input(i);
  }

  await esperar(PAUSA / 2);

  for (let i = 0; i <= 140; i += 5) {
    await cambiar_input(i);
  }

  await esperar(PAUSA / 2);

  await pulsar("Detener");
  await esperar(PAUSA);

  await pulsar("Volver");
  assert.equal(currentURL(), "/");
});
