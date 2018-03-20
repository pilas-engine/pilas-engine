import aplicar_nombre from "pilas-engine/utils/aplicar-nombre";
import { module, test } from "qunit";

module("Unit | Utility | aplicar nombre");

test("it works", function(assert) {
  let result = aplicar_nombre("Demo", `class UnaClase extends Actor ...`);
  assert.equal(result, "class Demo extends Actor ...");
});
