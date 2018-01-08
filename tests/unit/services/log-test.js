import { moduleFor, test } from "ember-qunit";

moduleFor("service:log", "Unit | Service | log", {
  needs: ["service:bus"]
});

test("it exists", function(assert) {
  let service = this.subject();
  assert.ok(service);
});
