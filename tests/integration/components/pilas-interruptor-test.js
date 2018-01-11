import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-interruptor", "Integration | Component | pilas interruptor", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-interruptor variable=true texto='demo'}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "demo"
  );
});
