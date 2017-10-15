import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-arduino", "Integration | Component | pilas arduino", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-arduino}}`);
  assert.ok(this.$().text());
});
