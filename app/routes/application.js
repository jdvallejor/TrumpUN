import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  usuarioActual: service('usuario-actual'),
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {})
  },
  actions:{
    salir: function() {
      this.get('session').close();
      this.replaceWith('bienvenida')
      this.get('usuarioActual').usuario = []
    }
  }
});
