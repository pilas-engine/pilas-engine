import obtenerPlantillaDeEscena from "pilas-engine/utils/obtener-plantilla-de-escena";
import { module, test } from "qunit";

module("Unit | Utility | obtener plantilla de escena");

// Replace this with your real tests.
test("it works", function(assert) {
  let result = obtenerPlantillaDeEscena();
  assert.ok(result.indexOf("class") > -1);
  assert.ok(result.indexOf("extends Escena") > -1);
});
