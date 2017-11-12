import { moduleForModel, test } from 'ember-qunit';

moduleForModel('proyecto', 'Unit | Model | proyecto', {
  // Specify the other units that are required for this test.
  needs: ['model:escena']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
