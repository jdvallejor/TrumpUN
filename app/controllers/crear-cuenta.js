import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  firebaseApp: service(),
  usuarioActual: service('usuario-actual'),
  actions:{
    registrar: function(){
      let controller = this;
      controller.get('firebaseApp').auth()
        .createUserWithEmailAndPassword(this.get('correo'), this.get('password'))
        .then(function(response){
          controller.get('session').open('firebase', {
            provider: 'password',
            email: response.email,
            password: controller.get('password')
          }).then(function(userData){

            controller.get('firebaseApp').database().ref('usuarios').child('-'+ userData.uid).set({
              nombre: controller.get('nombre'),
              email: controller.get('correo'),
              rol: 0
            }).then(function () {

              controller.get('firebaseApp').database().ref('clientes').child('-'+ userData.uid).set({
                nombre: controller.get('nombre'),
                documento: controller.get('documento'),
                celular: controller.get('celular')
              });

              let user = {
                nombre: controller.get('nombre'),
                email: controller.get('nombre'),
                rol: 0
              };

              controller.get('usuarioActual').updateActiveUser(user);
              controller.get('target').replaceWith('menu-cliente')

            })
          }).catch(function(error){
            alert(error)
          })
        }).catch(function(error){
          alert(error)
      })
    }
  }
});
