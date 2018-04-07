import { test } from "qunit";
import moduleForAcceptance from "pilas-engine/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | puede ingresar en la seccion pruebas");

test("visiting /puede-ingresar-en-la-seccion-pruebas", function(assert) {
  visit("/pruebas");

  andThen(function() {
    assert.equal(currentURL(), "/pruebas");
  });
});
