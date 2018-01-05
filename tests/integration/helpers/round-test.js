import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("round", "helper:round", {
  integration: true
});

// Replace this with your real tests.
test("it renders", function(assert) {
  this.set("inputValue", "15.444");
  this.render(hbs`{{round inputValue}}`);
  assert.equal(
    this.$()
      .text()
      .trim(),
    "15"
  );
});
