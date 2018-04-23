import Service from '@ember/service';

export default Service.extend({

  usuario:[],
  agregar(user){
    this.get('usuario').pushObject(user)
  }

});
