import obtener_plantilla_de_escena from "pilas-engine/utils/obtener-plantilla-de-escena";
import { module, test } from "qunit";

module("Unit | Utility | obtener plantilla de escena");

// Replace this with your real tests.
test("it works", function(assert) {
  let result = obtener_plantilla_de_escena();
  assert.ok(result.indexOf("class") > -1);
  assert.ok(result.indexOf("extends Escena") > -1);
});
