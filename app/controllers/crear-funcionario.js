import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ok: false,
  firebaseApp: service(),
  usuarioActual: service('usuario-actual'),
  actions:{
    registrar: function(){
      let controller = this;
      controller.get('firebaseApp').auth()
        .createUserWithEmailAndPassword(this.get('correo'), this.get('password'))
        .then(function(userData){

          controller.get('firebaseApp').database().ref('usuarios').child(userData.uid).set({
            nombre: controller.get('nombre'),
            email: controller.get('correo'),
            rol: 1
          }).then(function () {

            controller.get('firebaseApp').database().ref('funcionarios').child(userData.uid).set({
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
          alert(error)
        })
    }
  }
});
