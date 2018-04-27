import formatear from "pilas-engine/utils/formatear";
import { module, test } from "qunit";

module("Unit | Utility | formatear", function() {
  let codigoFormateadoCorrectamente = `//demo
function demo() {
    if (a === 2) {
        console.log('demo');
    }
}`;

  // Replace this with your real tests.
  test("it works", function(assert) {
    let result = formatear("                 \n\n//demo\n       function demo() {if(a===2){console.log('demo');}       }");
    assert.equal(result, codigoFormateadoCorrectamente);
  });
});
