import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  firebaseApp: service(),
  usuarioActual: service('usuario-actual'),
  actions: {
    ingresar: function () {
      let controller = this
      // Chequeo de campos vacios
      if (this.get('correo') === "" || this.get('password') === "") {
        alert("Faltan datos por ingresar")
      } else {
        // Consulta de usuario existente
        this.get('session').open('firebase', {
          provider: 'password',
          email: this.get('correo'),
          password: this.get('password')
        }).then(function (data) {
          // Realizar consulta para el rol
          let uid = data.uid;

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
            alert('Ese tal usuario no existe')
          } else if (error.code === 'auth/wrong-password'){
            alert('La contraseña es incorrecta')
          }
        })
      }
    }
  }
});
