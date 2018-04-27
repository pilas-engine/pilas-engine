import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas panel de escenas", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-panel-de-escenas}}`);
    assert.equal(
      find('*').textContent
        .trim(),
      "sin escenas"
    );
  });
});
