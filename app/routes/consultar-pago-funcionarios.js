import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service(),
  usuario: null,
  listaFuncionarios: [],
  listaContratos: [],
  beforeModel(){
    if (this.get('session').content.isAuthenticated){
      // try to get the user from localStorage
      let foundUser = JSON.parse(localStorage.getItem('usuario'));
      if (foundUser) {
        this.set('usuario', foundUser);
        let rolN = foundUser.rol;
        if (rolN === 0) {
          this.transitionTo('menu-cliente');
        } else if (rolN === 1) {
          this.transitionTo('menu-funcionario')
        }
      } else {
        this.replaceWith('bienvenida')
      }
    } else {
      this.replaceWith('bienvenida')
    }
  },


  model() {

    let controller = this;
    let filterDate = new Date();
    this.get('store').findAll('funcionario').then((funcionarios) => {
      funcionarios.forEach((func) => {
//
        let salario = func.get('salario');
        let uid = func.get('id');

        let listaContratos = controller.get('store').findAll('contrato').then(contratos => {
          let contratosFiltrados = contratos.toArray().filter(contrato => {
            let date = new Date(contrato.get('fecha'));
            return contrato.get('funcionario').get('id') === uid && date.getMonth() === filterDate.getMonth() && date.getFullYear() === filterDate.getFullYear();
          });
          return contratosFiltrados;
        });
        let contador = 0;
        controller.set('listaContratos', listaContratos);
        listaContratos.then(contratos =>{
          let suma = 0;
          contratos.forEach(contrato => {
            suma = suma + contrato.get('valor') * 0.01;
            contador = contador + 1
          });
          salario = salario + suma;
          return contratos
        }).then((contratos)=>{
          let hayCon = (contador > 0);
          let object = {
            nombre: func.get('nombre'),
            salario: salario,
            contratos: contratos,
            hayContratos: hayCon
          };
          controller.get('listaFuncionarios').addObject(object);
          controller.set('listaContratos', []);
        })
      })
    });
    return this.get('listaFuncionarios')
  }

});
