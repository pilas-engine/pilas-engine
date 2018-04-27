import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas logo", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{pilas-logo}}`);

    assert.equal(find('*').textContent.trim(), "");

    // Template block usage:
    await render(hbs`
      {{#pilas-logo}}
        template block text
      {{/pilas-logo}}
    `);

    assert.equal(find('*').textContent.trim(), "template block text");
  });
});
