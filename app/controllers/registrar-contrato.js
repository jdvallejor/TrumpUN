import Controller from '@ember/controller';

export default Controller.extend({
    
    actions:{
        generarContrato(){
            const fechaContrato = new Date().toLocaleString();

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

                this.store.query('cliente', {
                    orderBy: 'documento', 
                    equalTo: this.get('arrendador')
                }).then((arrendadores) => {
                    return arrendadores.get('firstObject');
                }).then((arrendador) => {
                    if(arrendador === undefined){
                        alert('El ID del arrendador no existe');
                    }
                    else{
                        
                        this.store.query('cliente', { 
                            orderBy: 'documento', 
                            equalTo: this.get('arrendatario')
                        }).then((arrendatarios) => {
                            return arrendatarios.get('firstObject');
                        }).then((arrendatario) => {
                            if(arrendatario === undefined){
                                alert('El ID del arrendatario no existe');
                            }
                            else{

                                this.store.query('inmueble', { 
                                    orderBy: 'identificador', 
                                    equalTo: this.get('inmueble')
                                }).then((inmuebles) => {
                                    return inmuebles.get('firstObject');
                                }).then((inmueble) => {
                                    if(inmueble === undefined){
                                        alert('El ID del inmueble no existe');
                                    }
                                    else if(inmueble.get('estado') === 'ocupado'){
                                        alert('El inmueble no esta disponible');
                                    }
                                    else{

                                        let contrato = this.get('store').createRecord('contrato', {
                                            fecha: fechaContrato,
                                            valor: this.get('valor'),
                                            arrendador: arrendador,
                                            arrendatario: arrendatario,
                                            inmueble: inmueble,
                                        });
                                        contrato.save();

                                        inmueble.set('estado', 'ocupado');
                                        inmueble.set('contratos', [contrato]);
                                        inmueble.save();

                                        arrendatario.set('contratos', [contrato]);
                                        arrendatario.set('inmueblesArrienda', [inmueble]);
                                        arrendatario.save();
                                        
                                        arrendador.set('contratos', [contrato]);
                                        arrendador.set('inmueblesOfrece', [inmueble]);
                                        arrendador.save();

                                        alert('Contrato creado correctamente');
                                    }

                                });

                            }
                        });

                    }
                });

                

               

            }

            
        },
        cancelar(){
            this.transitionToRoute('menu-funcionario');
        }
    },

});
