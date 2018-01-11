import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-inspector", "Integration | Component | pilas inspector", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-inspector}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "ActorSeleccionado:"
  );
});
