import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service(),
  usuario: null,
  beforeModel(){
    if (this.get('session').content.isAuthenticated){
      // try to get the user from localStorage
      let foundUser = JSON.parse(localStorage.getItem('usuario'));
      if (foundUser) {
        this.set('usuario', foundUser);
        let rolN = foundUser.rol;
        if (rolN === 0) {
          this.transitionTo('menu-cliente');
        } else if (rolN === 2) {
          this.transitionTo('menu-jefe')
        }
      } else {
        this.replaceWith('ingresar-al-sistema')
      }
    } else {
      this.replaceWith('ingresar-al-sistema')
    }
  },
  model(){
    let data = {
        clientes: this.store.findAll('cliente'),
        inmuebles: this.store.findAll('inmueble'),
    };
    return data;
  }
});
