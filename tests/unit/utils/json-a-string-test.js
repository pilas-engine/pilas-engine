import jsonAString from "pilas-engine/utils/json-a-string";
import { module, test } from "qunit";

module("Unit | Utility | json a string");

// Replace this with your real tests.
test("it works", function(assert) {
  let result = jsonAString({ demo: 123 });
  assert.ok(result);
  assert.equal(result, "eyJkZW1vIjoxMjN9");
});
