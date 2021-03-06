import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service(),
  usuario: null,
  beforeModel() {
    if (this.get('session').content.isAuthenticated) {
      // try to get the user from localStorage
      let foundUser = JSON.parse(localStorage.getItem('usuario'));
      if (foundUser) {
        this.set('usuario', foundUser);
        let rolN = foundUser.rol;
        if (rolN === 1) {
          this.transitionTo('menu-funcionario');
        } else if (rolN === 2) {
          this.transitionTo('menu-jefe')
        }
      } else {
        this.replaceWith('bienvenida')
      }
    } else {
      this.replaceWith('bienvenida')
    }
  },
  model() {
    let data = {
      torres: this.store.findAll('torre'),
      unidades: this.store.findAll('unidad')
    };
    return data;
  }
});
