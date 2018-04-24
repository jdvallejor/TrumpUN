import Service from '@ember/service';

export default Service.extend({

  usuario: null,
  agregar(user) {
    this.set('usuario', user)
  },
  getUsuario() {
    return this.get('usuario');
  },
  getRol() {
    let rol = 'null';
    const user = this.get('usuario');
    if (user != null) {
      const rolN = user.rol;
      if (rolN == 0) {
        rol = 'cliente';
      } else if (rolN == 1) {
        rol = 'funcionario';
      } else if (rolN == 2) {
        rol = 'jefe'
      }
      return rol;
    }
    return null;
  }

});
