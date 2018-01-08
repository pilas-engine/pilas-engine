import { moduleFor, test } from "ember-qunit";

moduleFor("controller:acercade", "Unit | Controller | acercade", {
  needs: ["service:electron"]
});

test("it exists", function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
