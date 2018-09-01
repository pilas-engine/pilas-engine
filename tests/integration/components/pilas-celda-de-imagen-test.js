import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pilas-celda-de-imagen', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{pilas-celda-de-imagen}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#pilas-celda-de-imagen}}
        template block text
      {{/pilas-celda-de-imagen}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
