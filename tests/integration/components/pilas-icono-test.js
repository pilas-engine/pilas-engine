import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pilas icono", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{pilas-icono}}`);

    assert.dom("*").hasText("");

    // Template block usage:
    await render(hbs`
      {{#pilas-icono}}
        template block text
      {{/pilas-icono}}
    `);

    assert.dom("*").hasText("template block text");
  });
});
