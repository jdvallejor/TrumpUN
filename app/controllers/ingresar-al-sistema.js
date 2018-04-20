import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    ingresar: function (correo, password) {
      // Chequeo de campos vacios
      if (correo === "" || password === ""){
        alert("Faltan datos por ingresar")
      } else {
        // Consulta de usuario existente
      }
    }
  }
});
