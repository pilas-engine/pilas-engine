import { moduleFor, test } from "ember-qunit";

moduleFor("route:editor", "Unit | Route | editor", {
  needs: ["service:actores"]
});

test("it exists", function(assert) {
  let route = this.subject();
  assert.ok(route);
});
