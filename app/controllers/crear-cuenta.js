import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  firebaseApp: service(),
  usuarioActual: service('usuario-actual'),
  actions:{
    registrar: function(){
      let controller = this
      controller.get('firebaseApp').auth()
        .createUserWithEmailAndPassword(this.get('correo'), this.get('password'))
        .then(function(response){
          controller.get('session').open('firebase', {
            provider: 'password',
            email: response.email,
            password: controller.get('password')
          }).then(function(userData){
            controller.get('firebaseApp').database().ref('usuarios').child(userData.uid).set({
              nombre: controller.get('nombre'),
              documento: controller.get('documento'),
              celular: controller.get('celular'),
              rol: 0
            }).then(function () {
              let user = {
                nombre: controller.get('nombre'),
                documento: controller.get('documento'),
                celular: controller.get('celular'),
                rol: 0
              }
              controller.get('usuarioActual').agregar(user)
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
