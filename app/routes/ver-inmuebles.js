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
                if (rolN === 1) {
                    this.transitionTo('menu-funcionario')
                }
                else if (rolN === 2) {
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
        return this.store.findRecord('cliente', '-' + this.get('session').content.uid);
        /*this.store.query('cliente', {
            orderBy: 'id',
            equalTo: '-' + this.get('session').content.uid
        })
        .then((clientes)=>{
            return clientes.get('firstObject');
        });*/
        //return this.store.findRecord('cliente', '-LD4WTYJv8qdjjtSL-mi');//'-LD4WTYHyNu9dXDaClP4');
    }
});
