import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("pilas-editor", "Integration | Component | pilas editor", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{pilas-ide}}`);
  assert.ok(this.$().text(), "Se dibuja bien, al menos al principio");
});
