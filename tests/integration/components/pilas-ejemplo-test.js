import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-ejemplo", "Integration | Component | pilas ejemplo", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-ejemplo}}`);
  assert.ok(this.$());
});
