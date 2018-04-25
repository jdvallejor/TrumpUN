import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  selYear: 2015,
  selMes: 3,
  meses: Array(12).fill(1).map((e, i) => i + 1),
  years: Array(40).fill(2000).map((e, i) => e + i),
  salarioBase: null,
  listaLength: Ember.computed('listaContratos.length', function () {
    return this.get('listaContratos').length > 0;
  }),
  listaContratos: [],
  sumaTotal: null,
  actions: {
    selectMes(mes) {
      this.set('selMes', mes);
    },
    selectYear(year) {
      this.set('selYear', year);
    },
    consultar() {
      if ((this.get('selMes') != undefined && this.get('selMes') != 0) && (this.get('selYear') != undefined && this.get('selYear') != 0)) {
        const uid = this.get('session').content.uid;
        let funcionario = this.get('store').findRecord('cliente', uid);
        let that = this;
        let filterDate = new Date(this.get('selYear'), this.get('selMes') - 1, 15);

        funcionario.then(func => {

          that.set('salarioBase', func.get('salario'));

          let lista = this.get('store').query('contrato', {
            filter: {
              funcionario: uid
            }
          }).then(contratos => {
            let contratosFiltrados = contratos.toArray().filter(x => {
              let date = new Date(x.get('fecha'));
              if (date.getMonth() == filterDate.getMonth() && date.getFullYear() == filterDate.getFullYear()) {
                return true;
              }
              return false;
            });
            that.set('listaContratos', contratosFiltrados);
            return contratosFiltrados;
          });

          lista.then(contratos => {
            let suma1 = that.get('salarioBase');

            if (contratos.length > 0) {
              contratos.forEach(contrato => {
                suma1 = suma1 + contrato.get('valor') * 0.01;
              });
            }
            that.set('sumaTotal', suma1);

            if (contratos.length === 0) {
              alert('No posee contratos creados en el mes seleccionado');
            }
            return suma1;
          });
        });


      } else {
        alert('Faltan datos por ingresar. Debe seleccionar mes y año');
      }
    },
    cancelar() {
      this.transitionToRoute('menu-funcionario');
    }
  }
});
