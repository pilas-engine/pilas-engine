import obtenerNombreSinRepetir from "pilas-engine/utils/obtener-nombre-sin-repetir";
import { module, test } from "qunit";

module("Unit | Utility | obtener nombre sin repetir");

test("it works", function(assert) {
  let result = obtenerNombreSinRepetir(["Actor"], "Demo");
  assert.equal(result, "Demo");

  result = obtenerNombreSinRepetir(["Actor"], "Actor");
  assert.equal(result, "Actor1");
});
