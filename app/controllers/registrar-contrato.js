import Controller from '@ember/controller';
import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  arrendador: null,
  arrendatario: null,
  inmueble: null,
  listaInmuebles: [],

  flashMessages: inject(),

  actions: {
    buscarInmueble(inmueble){
      this.set('inmueble', inmueble);
    },

    actualizarArrendador(arrendador){
      this.set('arrendador', arrendador);
      if(arrendador.get('inmueblesOfrece').get('length') > 0){
        this.set('inmueble', null);
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
        //alert("Campos incompletos");
        get(this, 'flashMessages').clearMessages();
        get(this, 'flashMessages').danger('Campos incompletos',{
          //timeout: 3000,
          priority: 100,
          sticky: true,
          showProgress: true
        });
      }
      else if (!(/^\d+$/.test(this.get('valor')))) {
        //alert("Tipo de dato incorrecto para el campo Valor alquiler");
        get(this, 'flashMessages').clearMessages();
        get(this, 'flashMessages').danger('Tipo de dato incorrecto para el campo Valor alquiler',{
          //timeout: 3000,
          priority: 100,
          sticky: true,
          showProgress: true
        });
        this.set('valor', '');
      }
      else if (this.get('inmueble').get('estado') === 'ocupado') {
          //alert('El inmueble no esta disponible');
        get(this, 'flashMessages').clearMessages();
        get(this, 'flashMessages').danger('El inmueble no esta disponible',{
          //timeout: 3000,
          priority: 100,
          sticky: true,
          showProgress: true
        });
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

        this.get('store').findRecord('funcionario', '-' + this.get('session').content.uid).then((user)=>{
          contrato.set('funcionario', user);
          contrato.save();
          //user.set('contratos', [contrato]);
          user.get('contratos').pushObject(contrato);
          user.save();
        });

        //this.get('inmueble').set('contratos', [contrato]);
        this.get('inmueble').set('estado', 'ocupado');
        this.get('inmueble').get('contratos').pushObject(contrato);
        this.get('inmueble').save();

        //this.get('arrendatario').set('contratos', [contrato]);
        //this.get('arrendatario').set('inmueblesArrienda', [this.get('inmueble')]);
        this.get('arrendatario').get('contratos').pushObject(contrato);
        this.get('arrendatario').get('inmueblesArrienda').pushObject(this.get('inmueble'));
        this.get('arrendatario').save();

        //this.get('arrendador').set('contratos', [contrato]);
        //this.get('arrendador').set('inmueblesOfrece', [this.get('inmueble')]);
        this.get('arrendador').get('contratos').pushObject(contrato);
        this.get('arrendador').get('inmueblesOfrece').pushObject(this.get('inmueble'));
        this.get('arrendador').save();

        //alert('Contrato creado correctamente');
        get(this, 'flashMessages').clearMessages();
        get(this, 'flashMessages').success('Contrato creado correctamente',{
          timeout: 4000,
          priority: 100,
          sticky: false,
          showProgress: true
        });
        this.limpiar();
      }

    },

    cancelar() {
      this.transitionToRoute('menu-funcionario');
    }
  },

  limpiar(){
    this.set('inmueble', null);
    this.set('listaInmuebles', []);
    this.set('arrendatario', null);
    this.set('arrendador', null);
    this.set('valor', 0);
  },

});
