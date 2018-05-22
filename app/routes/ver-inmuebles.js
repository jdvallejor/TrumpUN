import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
    session: service(),
    usuario: null,
    /*beforeModel(){
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
                this.replaceWith('bienvenida')
            }
        } else {
            this.replaceWith('bienvenida')
        }
    },*/
    model(){
        /*
        return this.store.findRecord('cliente', this.get('session').content.uid);
        */
        return this.store.findRecord('cliente', '-LD4WTYHyNu9dXDaClP4');
    }
});
