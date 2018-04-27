import stringAJson from "pilas-engine/utils/string-a-json";
import { module, test } from "qunit";

module("Unit | Utility | string a json", function() {
  // Replace this with your real tests.
  test("it works", function(assert) {
    let result = stringAJson("eyJkZW1vIjoxMjN9");
    assert.ok(result);
    assert.equal(result.demo, 123);
  });
});
