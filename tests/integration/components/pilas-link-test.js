import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pilas-link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{pilas-link}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#pilas-link}}
        template block text
      {{/pilas-link}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
