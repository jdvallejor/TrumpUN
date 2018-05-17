import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service(),
  usuarioActual: service('usuario-actual'),
  model() {
    return this.get('usuarioActual').usuario;
  },
  beforeModel:
    function () {
      this.get('usuarioActual').getActiveUser();
      return this.get('session').fetch().catch(function () {
      })
    }
  ,
  actions: {
    salir: function () {
      this.get('session').close();
      localStorage.clear();
      this.get('usuarioActual').reset();
      this.transitionTo('bienvenida');
    }
  }
})
;
