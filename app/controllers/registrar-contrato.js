import Controller from '@ember/controller';
import { typeOf } from '@ember/utils';

export default Controller.extend({
    
    actions:{
        generarContrato(){
            const fecha = new Date().toLocaleString();
            
            /*let datos = {
                valor: this.get('valor'),                
                arrendador: this.get('arrendador'),
                arrendatario: this.get('arrendatario'),
                inmueble: this.get('inmueble'),
            }*/

            if (this.get('valor') === undefined || this.get('valor') === ""){
                alert("Debe asignar el valor de Valor alquiler");
            } 

            if (!(/(\d)+/.test(this.get('valor')))){
                alert("Tipo de dato incorrecto para el campo Valor alquiler");
            }
            

            /*this.get('store').createRecord('cliente', {
                nombre: 'foo',
                documento: '12345',
                celular: '112233',
                contratos: [],
                inmueblesArrienda: [],
                inmueblesOfrece: [],
            }).save();
            this.get('store').createRecord('cliente', {
                nombre: 'bar',
                documento: '6789',
                celular: '223344',
                contratos: [],
                inmueblesArrienda: [],
                inmueblesOfrece: [],
            }).save();
            /*this.get('store').createRecord('cliente', {
                nombre: 'foo',
                documento: '12345',
                celular: '112233',
                contratos: [],
                inmueblesArrienda: [],
                inmueblesOfrece: [],
            }).save();
            this.get('store').createRecord('cliente', {
                nombre: 'bar',
                documento: '6789',
                celular: '223344',
                contratos: [],
                inmueblesArrienda: [],
                inmueblesOfrece: [],
            }).save();
            this.get('store').createRecord('inmueble', {
                direccion: "",
                estrato: "",
                area_total: "",
                nro_pisos: "",
                nro_balcones: "",
                nro_banos: "",
                estado: "",                
                contratos: []
            }).save();


            */

        },
        cancelar(){
            this.transitionToRoute('menu-funcionario');
        }
    },

});
