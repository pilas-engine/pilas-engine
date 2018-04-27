import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("helper:round", function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test("it renders", async function(assert) {
    this.set("inputValue", "15.444");
    await render(hbs`{{round inputValue}}`);
    assert.equal(
      find('*').textContent
        .trim(),
      "15.44"
    );
  });
});
