import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  firebaseApp: service(),
  usuarioActual: service('usuario-actual'),
  usuarioExiste: false,
  faltanDatos: false,
  correoInvalido: false,
  ok: false,
  actions:{
    registrar: function(){
      let controller = this;

      if (controller.get('nombre') === '' || controller.get('correo') === '' || controller.get('password') === '' || controller.get('documento') === '' || controller.get('celular') === ''){
        controller.set('faltanDatos', true)
      } else {
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
                controller.set('ok', true);
                controller.get('usuarioActual').updateActiveUser(user);
                controller.get('target').replaceWith('menu-cliente')

              })
            }).catch(function(error){
              alert(error)
            })
          }).catch(function(error){
            if (error.code === 'auth/email-already-in-use'){
              controller.set('usuarioExiste', true)
            } else if (error.code === 'auth/invalid-email'){
              controller.set('correoInvalido', true)
            }
        })
      }

    }
  }
});
