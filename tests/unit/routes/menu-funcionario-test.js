import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | menu-funcionario', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:menu-funcionario');
    assert.ok(route);
  });
});
