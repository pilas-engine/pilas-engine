import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas-selector-de-modo-zoom", function(
  hooks
) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-selector-de-modo-zoom modoZoom=1}}`);
    assert.ok(this.element);
  });
});
