import { test } from "qunit";
import moduleForAcceptance from "pilas-engine/tests/helpers/module-for-acceptance";
import Ember from "ember";

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


  assert.equal(Ember.$("[data-test='nombre-de-escena']").text(), "Escena1Escena2");

  await click("#boton-eliminar");
  await pulsar("Si");
  assert.equal(Ember.$("[data-test='nombre-de-escena']").text(), "Escena2");
  await esperar(PAUSA);
});
