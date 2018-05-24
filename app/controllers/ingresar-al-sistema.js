import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

import Component from '@ember/component';
import { get } from '@ember/object';

export default Controller.extend({
  firebaseApp: service(),
  flashMessages: service(),
  usuarioActual: service('usuario-actual'),
  actions: {
    ingresar: function () {
      let controller = this
      // Chequeo de campos vacios
      if (this.get('correo') === "" || this.get('password') === "") {
        //alert("Faltan datos por ingresar")
        
        get(this, 'flashMessages').danger('Faltan datos por ingresar',{
          timeout: 5000,
          priority: 100,
          sticky: false,
          showProgress: true
        });

      } else {
        // Consulta de usuario existente
        this.get('session').open('firebase', {
          provider: 'password',
          email: this.get('correo'),
          password: this.get('password')
        }).then(function (data) {
          // Realizar consulta para el rol
          let uid = '-' + data.uid;

          controller.get('firebaseApp').database().ref('usuarios').child(uid).once('value').then(function (snapshot) {
            controller.get('usuarioActual').updateActiveUser(snapshot.val());
            if (snapshot.val().rol === 0) {
              controller.get('target').replaceWith('menu-cliente')
            } else if (snapshot.val().rol === 1) {
              controller.get('target').replaceWith('menu-funcionario')
            } else if (snapshot.val().rol === 2) {
              controller.get('target').replaceWith('menu-jefe')
            }

          })


        }).catch(function (error) {
          if (error.code === 'auth/user-not-found'){
            alert('El usuario no existe')
          } else if (error.code === 'auth/wrong-password'){
            alert('La contraseña es incorrecta')
          }
        })
      }
    }
  }
});
