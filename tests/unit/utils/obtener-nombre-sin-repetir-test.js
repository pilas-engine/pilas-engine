import obtener_nombre_sin_repetir from "pilas-engine/utils/obtener-nombre-sin-repetir";
import { module, test } from "qunit";

module("Unit | Utility | obtener nombre sin repetir", function() {
  test("it works", function(assert) {
    let result = obtener_nombre_sin_repetir(["Actor"], "Demo");
    assert.equal(result, "Demo");

    result = obtener_nombre_sin_repetir(["Actor"], "Actor");
    assert.equal(result, "Actor1");
  });
});
