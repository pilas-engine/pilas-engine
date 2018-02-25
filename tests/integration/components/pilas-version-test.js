import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-version", "Integration | Component | pilas version", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-version}}`);
  assert.ok(
    this.$()
      .text()
      .indexOf("versión")
  );
});
