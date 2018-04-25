import Controller from '@ember/controller';

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

            if (
                this.get('valor')           === undefined || this.get('valor')          === "" ||
                this.get('arrendador')      === undefined || this.get('arrendador')     === "" ||
                this.get('arrendatario')    === undefined || this.get('arrendatario')   === "" ||
                this.get('inmueble')        === undefined || this.get('inmueble')       === ""
            ){
                alert("Campos incompletos");
            }
            else if (!(/^\d+$/.test(this.get('valor')))){
                alert("Tipo de dato incorrecto para el campo Valor alquiler");
                this.set('valor', '');
            }
            else if (!(/^\d+$/.test(this.get('arrendador')))){
                alert("Tipo de dato incorrecto para el campo ID del arrendador");
                this.set('arrendador', '');
            }
            else if (!(/^\d+$/.test(this.get('arrendatario')))){
                alert("Tipo de dato incorrecto para el campo ID del arrendatario");
                this.set('arrendatario', '');
            }
            else if (!(/^[A-Za-z0-9]+$/.test(this.get('inmueble')))){
                alert("Tipo de dato incorrecto para el campo ID del inmueble");
                this.set('inmueble', '');
            }
            else{


            }


        },
        cancelar(){
            this.transitionToRoute('menu-funcionario');
        }
    },

});
