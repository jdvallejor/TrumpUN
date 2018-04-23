import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),
  firebaseApp: service(),
  usuarioActual: service('usuario-actual'),
  model(){
    return this.get('usuarioActual').usuario;
  }
});
