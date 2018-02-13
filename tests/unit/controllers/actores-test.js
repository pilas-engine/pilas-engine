import { moduleFor, test } from "ember-qunit";

moduleFor("controller:actores", "Unit | Controller | actores", {
  needs: ["service:actores"]
});

test("it exists", function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
