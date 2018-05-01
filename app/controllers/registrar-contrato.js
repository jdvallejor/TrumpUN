import Controller from '@ember/controller';

export default Controller.extend({
  arrendador: null,
  arrendatario: null,
  inmueble: null,
  listaInmuebles: [],

  actions: {
    buscarInmueble(inmueble){
      this.set('inmueble', inmueble);
    },

    actualizarArrendador(arrendador){
      this.set('arrendador', arrendador);
      if(arrendador.get('inmueblesOfrece').get('length') > 0){
        this.set('listaInmuebles', arrendador.get('inmueblesOfrece'));
      }
      else{
        this.set('listaInmuebles', []);
        this.set('inmueble', null);
      }
      
    },

    actualizarArrendatario(arrendatario){
      this.set('arrendatario', arrendatario);
    },

    generarContrato() {
      const fechaContrato = new Date();

      if (
        this.get('valor') === undefined || this.get('valor') === "" ||
        this.get('arrendador') === null || this.get('arrendador') === "" ||
        this.get('arrendatario') === null || this.get('arrendatario') === "" ||
        this.get('inmueble') === null || this.get('inmueble') === ""
      ) {
        alert("Campos incompletos");
      }
      else if (!(/^\d+$/.test(this.get('valor')))) {
        alert("Tipo de dato incorrecto para el campo Valor alquiler");
        this.set('valor', '');
      }
      else if (this.get('inmueble').get('estado') === 'ocupado') {
          alert('El inmueble no esta disponible');
      }
      else{
        let contrato = this.get('store').createRecord('contrato', {
          fecha: fechaContrato,
          valor: this.get('valor'),
          arrendador: this.get('arrendador'),
          arrendatario: this.get('arrendatario'),
          inmueble: this.get('inmueble'),
        });
        contrato.save();

        this.get('store').findRecord('usuarios', this.get('session').content.uid).then((user)=>{
          contrato.set('funcionario', user);
          contrato.save();
        });

        this.get('inmueble').set('estado', 'ocupado');
        this.get('inmueble').set('contratos', [contrato]);    //this.get('inmueble').get('contratos').push(contrato);
        this.get('inmueble').save();

        this.get('arrendatario').set('contratos', [contrato]);
        this.get('arrendatario').set('inmueblesArrienda', [this.get('inmueble')]);
        this.get('arrendatario').save();

        this.get('arrendador').set('contratos', [contrato]);
        this.get('arrendador').set('inmueblesOfrece', [this.get('inmueble')]);
        this.get('arrendador').save();

        alert('Contrato creado correctamente');

      }

    },

    cancelar() {
      this.transitionToRoute('menu-funcionario');
    }
  },

});
