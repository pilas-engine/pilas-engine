import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas lista de ejemplos", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-lista-de-ejemplos}}`);
    assert.ok(this.$());
  });
});
