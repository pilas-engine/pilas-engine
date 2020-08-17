import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, find } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";
import { setupIntl } from 'ember-intl/test-support';

module("Integration | Component | pilas version", function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, "es");

  test("it renders", async function(assert) {
    await render(hbs`{{pilas-version}}`);
    assert.ok(
      find('*').textContent
        .indexOf("versión")
    );
  });
});
