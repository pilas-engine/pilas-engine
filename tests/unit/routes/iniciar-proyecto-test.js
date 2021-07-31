import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | iniciar-proyecto', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:iniciar-proyecto');
    assert.ok(route);
  });
});
