import Service from '@ember/service';

export default Service.extend({

  usuario: null,
  updateActiveUser(usuario){
    this.set('usuario', usuario);
    // persist the user's browser so it can be retrieved on reload
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },
  getActiveUser(){
    let usuario = this.get('usuario');
    if (usuario) {
      return usuario;
    } else {
      // try to get the user from localStorage
      let foundUser = JSON.parse(localStorage.getItem('usuario'));
      if (foundUser) {
        this.set('usuario', foundUser);
        return foundUser;
      } else {
        return null;
      }
    }
  },
  getRol() {
    let rol = 'null';
    const usuario = this.get('usuario');
    if (usuario != null) {
      const rolN = usuario.rol;
      if (rolN === 0) {
        rol = 'cliente';
      } else if (rolN === 1) {
        rol = 'funcionario';
      } else if (rolN === 2) {
        rol = 'jefe'
      }
      return rol;
    }
    return null;
  },
  getPage() {
    let rol = 'null';
    const usuario = this.get('usuario');
    if (usuario != null) {
      const rolN = usuario.rol;
      if (rolN === 0) {
        rol = 'menu-cliente';
      } else if (rolN === 1) {
        rol = 'menu-funcionario';
      } else if (rolN === 2) {
        rol = 'menu-jefe'
      }
      return rol;
    }
    return 'bienvenida';
  },
  reset() {
    this.set('usuario', null);
  }

});
