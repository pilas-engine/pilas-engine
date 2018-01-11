import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-panel-de-escenas", "Integration | Component | pilas panel de escenas", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-panel-de-escenas}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "sin escenas"
  );
});
