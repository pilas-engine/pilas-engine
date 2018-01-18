import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-interprete", "Integration | Component | pilas interprete", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-interprete}}`);
  assert.ok(this.$().text());
});
