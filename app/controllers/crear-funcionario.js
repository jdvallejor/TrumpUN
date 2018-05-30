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
          .then(function(userData){

            controller.get('firebaseApp').database().ref('usuarios').child('-'+ userData.uid).set({
              nombre: controller.get('nombre'),
              email: controller.get('correo'),
              rol: 1
            }).then(function () {

              controller.get('firebaseApp').database().ref('funcionarios').child('-'+ userData.uid).set({
                nombre: controller.get('nombre'),
                documento: controller.get('documento'),
                celular: controller.get('celular'),
                salario: controller.get('salario')
              }).then(()=>{
                controller.set('ok', true);
                controller.set('correo', '');
                controller.set('password', '');
                controller.set('nombre', '');
                controller.set('documento', '');
                controller.set('celular', '');
                controller.set('salario', '');
              }).catch((error)=>{
                alert(error)
              })
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
