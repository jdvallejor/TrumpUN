import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | consultar-pago', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:consultar-pago');
    assert.ok(route);
  });
});
