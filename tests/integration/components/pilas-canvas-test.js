import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-canvas", "Integration | Component | pilas canvas", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-canvas}}`);
  assert.ok(this.$().text());
});
