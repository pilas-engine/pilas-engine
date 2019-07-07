import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | proyecto', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:proyecto');
    assert.ok(route);
  });
});
